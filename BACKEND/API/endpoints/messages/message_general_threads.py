from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.handlers import APIException
from app.database.db import cursor, lastrowid

bp = Blueprint("general_threads", __name__, url_prefix="/messages")

@bp.route("/general/threads", methods=["GET"])
@jwt_required()
def get_general_threads():

    # Define my ID
    my_id = get_jwt_identity()
    # Define if is guide
    cursor().execute(f"SELECT is_guide FROM users WHERE id=%s", (my_id, ))
    is_guide = cursor().fetchone()["is_guide"]

    cursor().execute(f"SELECT * FROM message_threads WHERE sender_id = %s OR receiver_id = %s", (my_id, my_id))
    threads = cursor().fetchall()

    response_threads = []
    for index, thread in enumerate(threads):
        # Define interlocutor ID and role - either sender or receiver
        sender_id = int(thread["sender_id"])
        receiver_id = int(thread["receiver_id"])
        print(index)
        if(is_guide == 1):
            # Check if both sides of conversation are guides
            cursor().execute(f"SELECT is_guide FROM users WHERE id=%s OR id=%s", (sender_id, receiver_id))
            arr = cursor().fetchall()
            if int(arr[0]["is_guide"]) == 1 and int(arr[1]["is_guide"]) == 1:
                response_threads.append(thread)
        else:
            response_threads.append(thread)


    return jsonify(response_threads), 201
