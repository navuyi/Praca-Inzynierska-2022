from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.handlers import APIException
from app.database.db import cursor, lastrowid

bp = Blueprint("thread_restore", __name__, url_prefix="/messages")

@bp.route("/thread/restore", methods=["PATCH"])
@jwt_required()
def restore_thread():
    if "thread_id" not in request.json:
        raise APIException(msg="No thread ID provided", code=422)

    thread_id = request.json["thread_id"]
    my_id = get_jwt_identity()

    cursor().execute(f"SELECT sender_id, receiver_id FROM message_threads WHERE id=%s", (thread_id, ))
    res = cursor().fetchone()
    sender_id = int(res["sender_id"])
    receiver_id = int(res["receiver_id"])

    if int(my_id) == sender_id:
        cursor().execute(f"UPDATE message_threads SET sender_deleted=0 WHERE id=%s", (thread_id, ))
    elif int(my_id) == receiver_id:
        cursor().execute(f"UPDATE message_threads SET receiver_deleted=0 WHERE id=%s", (thread_id, ))

    return jsonify(msg="Deleted thread restored"), 200

