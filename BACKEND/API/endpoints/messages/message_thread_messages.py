from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.handlers import APIException
from app.database.db import cursor, lastrowid

bp = Blueprint("thread_messages", __name__, url_prefix="/messages")

@bp.route("/thread/messages", methods=["GET"])
@jwt_required()
def get_thread_messages():
    if "offset" not in request.args or "thread_id" not in request.args:
        raise APIException(msg="Not enough data", code=422)

    my_id = get_jwt_identity()

    thread_id = request.args["thread_id"]
    msg_limit = current_app.config["MESSAGES_LIMIT"] + int(request.args["offset"])
    statement = f"SELECT * FROM (SELECT * FROM messages WHERE thread_id=%s ORDER BY creation_date DESC LIMIT {msg_limit}) as sub_query ORDER BY creation_date"
    cursor().execute(statement, (thread_id, ))
    messages = cursor().fetchall()
    number_of_messages = len(messages)

    # Find total number of messages
    cursor().execute(f"SELECT count(*) FROM messages WHERE thread_id=%s", (thread_id, ))
    total_messages_in_thread = cursor().fetchone()["count(*)"]

    # Define my side of conversation
    #cursor().execute(f"SELECT sender_id, receiver_id FROM message_threads WHERE id=%s", (thread_id, ))
    #sides = cursor().fetchone()
    #thread_sender = sides["sender_id"]
    #thread_receiver = sides["receiver_id"]

    conversation = []
    for message in messages:
        # No checking for message deleted by sender/receiver for now

        msg = {
            "id": message["id"],
            "content": message["content"],
            "creation_date": message['creation_date'].strftime("%d.%m.%Y"),
            "creation_time": message['creation_date'].strftime("%H:%M"),
            "was_read": message["was_read"],
        }

        # Define interlocutor ID
        sender_id = int(message["sender_id"])
        receiver_id = int(message["receiver_id"])

        if int(my_id) == sender_id:
            msg["side"] = "right"
        elif int(my_id) == receiver_id:
            msg["side"] = "left"

        conversation.append(msg)

    end_of_thread = True if total_messages_in_thread == number_of_messages else False
    response = jsonify(messages=conversation, end_of_thread=end_of_thread)
    return response, 201
