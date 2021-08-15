from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.handlers import APIException
from app.database.db import cursor, lastrowid

bp = Blueprint("general_threads", __name__, url_prefix="/messages")

@bp.route("/general/threads", methods=["GET"])
@jwt_required()
def get_general_threads():
    if not "thread_type" in request.args:
        raise APIException(msg="Thread type is not provided", code=422)
    thread_type = request.args["thread_type"]
    if thread_type == "active":
        is_deleted = 0
    elif thread_type == "deleted":
        is_deleted = 1
    # Define my ID
    my_id = get_jwt_identity()
    # Define if is guide
    cursor().execute(f"SELECT is_guide FROM users WHERE id=%s", (my_id, ))
    is_guide = cursor().fetchone()["is_guide"]

    cursor().execute(f"SELECT id, tour_id, creation_date, topic, sender_deleted, sender_id, receiver_deleted, receiver_id FROM message_threads WHERE sender_id = %s OR receiver_id = %s", (my_id, my_id))
    threads = cursor().fetchall()

    # Get applicable threads
    response_threads = []
    for index, thread in enumerate(threads):
        sender_id = int(thread["sender_id"])
        receiver_id = int(thread["receiver_id"])

        # Check if thread was deleted
        print(f"{my_id}  {sender_id} {thread['sender_deleted']} {is_deleted}")
        print(f"{my_id}  {sender_id} {thread['receiver_deleted']} {is_deleted}")
        if int(my_id) == sender_id and thread["sender_deleted"] != is_deleted:
            continue  # skip this thread
        elif int(my_id) == receiver_id and thread["receiver_deleted"] != is_deleted:
            continue # skip this thread

        # In case of being guide allow only conversations with another guide and only if we started the conversation
        # The other guide will see this thread under his offer's messages
        if(is_guide == 1):
            # Check if both sides of conversation are guides
            cursor().execute(f"SELECT is_guide FROM users WHERE id=%s OR id=%s", (sender_id, receiver_id))
            arr = cursor().fetchall()
            if int(arr[0]["is_guide"]) == 1 and int(arr[1]["is_guide"]) == 1 and sender_id == int(my_id):
                response_threads.append(thread)
        else:
            response_threads.append(thread)

    response = []
    for thread in response_threads:

        thr = {}

        # Define interlocutor
        sender_id = int(thread["sender_id"])
        receiver_id = int(thread["receiver_id"])

        if int(my_id) == sender_id:
            interlocutor_id = receiver_id
        elif int(my_id) == receiver_id:
            interlocutor_id = sender_id

        # Get interlocutor data
        cursor().execute(f"SELECT id, f_name, l_name, email FROM users WHERE id=%s", (interlocutor_id, ))
        data = cursor().fetchone()
        thr["interlocutor_id"] = data["id"]
        thr["interlocutor_fname"] = data["f_name"]
        thr["interlocutor_lname"] = data["l_name"]
        thr["interlocutor_email"] = data["email"]

        # Select needed information
        thr["thread_id"] = thread["id"]
        thr["tour_id"] = thread["tour_id"]
        thr["creation_time"] = thread["creation_date"].strftime("%H:%M")
        thr["creation_date"] = thread["creation_date"].strftime("%d/%m/%Y")
        thr["topic"] = thread["topic"]

        # Get tour information
        cursor().execute(f"SELECT header FROM tours WHERE id=%s", (thread["tour_id"], ))
        header = cursor().fetchone()["header"]
        thr["tour_header"] = header

        response.append(thr)

    return jsonify(response), 201
