from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.handlers import APIException
from app.database.db import cursor, lastrowid

bp = Blueprint("unicast_new", __name__, url_prefix="/messages")

@bp.route("/unicast/new", methods=["POST"])
@jwt_required()
def new_message():
    try:
        tour_id = request.json["tour_id"]
        sender_id = get_jwt_identity()      # <-- from JWT, frontend value can by manipulated by user
        receiver_id = request.json["receiver_id"]
        topic = request.json["topic"]
        content = request.json["content"]
    except Exception as e:
        print(e)
        raise APIException(msg="Brak danych", code=422)

    # Create new message thread
    insert = {
        "sender_id": sender_id,
        "receiver_id": receiver_id,
        "tour_id": tour_id,
        "topic": topic
    }
    cursor().execute(f"INSERT INTO message_threads (sender_id, receiver_id, tour_id{f',topic' if topic else ''}) VALUES "
                     f"(%(sender_id)s, %(receiver_id)s, %(tour_id)s {f',%(topic)s' if topic else ''})", insert)  # Take note of commas placement! ! ! !
    thread_id = lastrowid()

    # Create first message in new thread
    insert = {
        "thread_id": thread_id,
        "sender_id": get_jwt_identity(),
        "receiver_id": receiver_id,
        "content": content
    }
    cursor().execute(f"INSERT INTO messages (thread_id, sender_id, receiver_id, content) VALUES (%(thread_id)s, %(sender_id)s, %(receiver_id)s, %(content)s)", insert)


    response = jsonify(message="Message sent")
    return response, 201
