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
    except Exception as e:
        print(e)
        raise APIException(msg="Brak danych", code=422)

    # Add response message to given thread
    insert = {
        "thread_id": thread_id,
        "sender_id": get_jwt_identity(),
        "content": content,
    }
    cursor().execute(f"INSERT INTO messages (thread_id, sender_id, content) VALUES (%(thread_id)s, %(sender_id)s, %(content)s)", insert)



    response = jsonify(message="OK")
    return response, 201
