from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.handlers import APIException
from app.database.db import cursor, lastrowid

bp = Blueprint("unicast_response", __name__, url_prefix="/messages")

@bp.route("/unicast/response", methods=["POST"])
@jwt_required()
def message_response():
    try:
        thread_id = request.json["thread_id"]
        content = request.json["content"]
        receiver_id = request.json["receiver_id"]
    except Exception as e:
        print(e)
        raise APIException(msg="Brak danych", code=422)

    # Add response message to given thread
    insert = {
        "thread_id": thread_id,
        "sender_id": get_jwt_identity(),
        "receiver_id": receiver_id,
        "content": content,
    }
    cursor().execute(f"INSERT INTO messages (thread_id, sender_id, receiver_id, content) VALUES (%(thread_id)s, %(sender_id)s, %(receiver_id)s, %(content)s)", insert)

    # Check if thread was marked as deleted by any of the sides
    cursor().execute(f"SELECT sender_deleted, receiver_deleted FROM message_threads WHERE id=%s", (thread_id, ))
    res = cursor().fetchone()
    if res["sender_deleted"] == 1 or res["receiver_deleted"] == 1:
        cursor().execute(f"UPDATE message_threads SET sender_deleted=0, receiver_deleted=0 WHERE id=%s", (thread_id, ))


    response = jsonify(message="OK")
    return response, 201
