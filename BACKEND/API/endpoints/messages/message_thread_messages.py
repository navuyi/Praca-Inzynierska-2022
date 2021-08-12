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

    offset = request.args["offset"]
    thread_id = request.args["thread_id"]
    msg_limit = current_app.config["MESSAGES_LIMIT"]

    cursor().execute(f"SELECT * FROM messages WHERE thread_id=%s ORDER BY id DESC LIMIT {msg_limit} OFFSET {offset}", (thread_id, ))
    messages = cursor().fetchall()

    # Define my side of conversation
    #cursor().execute(f"SELECT sender_id, receiver_id FROM message_threads WHERE id=%s", (thread_id, ))
    #sides = cursor().fetchone()
    #thread_sender = sides["sender_id"]
    #thread_receiver = sides["receiver_id"]

    converstaion = []
    for message in messages:
        # No checking for message deleted by sender/receiver for now
        msg = {
            "id": message["id"],
            "content": message["content"],
            "creation_date": message['creation_date'].strftime("%d/%m/%Y"),
            "creation_time": message['creation_date'].strftime("%H:%m"),
            "was_read": message["was_read"],
        }

        # Define interlocutor ID
        sender_id = int(message["sender_id"])
        receiver_id = int(message["receiver_id"])

        if int(my_id) == sender_id:
            msg["side"] = "right"
        elif int(my_id) == receiver_id:
            msg["side"] = "left"

        converstaion.append(msg)

    response = jsonify(converstaion)
    return jsonify(converstaion), 201
