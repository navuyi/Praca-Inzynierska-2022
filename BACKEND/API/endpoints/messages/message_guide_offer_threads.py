import math

from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.handlers import APIException
from app.database.db import cursor, lastrowid

bp = Blueprint("message_guide_offer_threads", __name__, url_prefix="/messages")

@bp.route("/guide/offer/threads", methods=["GET"])
@jwt_required()
def get_guide_offer_threads():
    if "tour_id" not in request.args:
        raise APIException(msg="tour_id is required", code=422)

    tour_id = request.args["tour_id"]
    guide_id = get_jwt_identity()

    # Check if user is guide
    cursor().execute(f"SELECT is_guide FROM users WHERE id=%s", (guide_id, ))
    is_guide = cursor().fetchone()["is_guide"]
    if not is_guide:
        raise APIException(msg="Unauthorized", code=401)

    limit = 5
    offset = (int(request.args["page"])-1) * limit

    # Handle sorting
    if request.args["sort"] == "most_recent":
        order = "ORDER BY creation_date DESC"
    elif request.args["sort"] == "oldest":
        order = "ORDER BY creation_date"

    # Get tour message threads
    cursor().execute(f"SELECT SQL_CALC_FOUND_ROWS * FROM message_threads WHERE tour_id = %s {order} LIMIT {limit} OFFSET %s", (tour_id, offset))
    threads = cursor().fetchall()

    cursor().execute("SELECT FOUND_ROWS()")
    total_rows = cursor().fetchone()["FOUND_ROWS()"]
    pages_total = math.ceil(total_rows/limit)

    response = {
        "pages_total": pages_total,
        "threads": []
    }

    for thread in threads:
        if not thread["hidden"]:    # <-- Do not show hidden threads

            # Thread general data
            data = {
                "thread_id": thread["id"],
                "topic": thread["topic"],
                "creation_date": thread["creation_date"].strftime("%d/%m/%Y"),    # <-- format date
                "creation_time": thread['creation_date'].strftime("%H:%M")
            }

            # Define interlocutor ID
            sender_id = int(thread["sender_id"])
            receiver_id = int(thread["receiver_id"])

            if int(guide_id) == int(sender_id):
                interlocutor_id = receiver_id
            elif int(guide_id) == int(receiver_id):
                interlocutor_id = sender_id

            # Get interlocutor data
            cursor().execute(f"SELECT f_name, l_name, email FROM users WHERE id=%s", (interlocutor_id, ))
            interlocutor_data = cursor().fetchall()[0]

            data["interlocutor_id"] = interlocutor_id
            data["email"] = interlocutor_data["email"]
            data["f_name"] = interlocutor_data["f_name"]
            data["l_name"] = interlocutor_data["l_name"]

            response["threads"].append(data)


    return jsonify(response), 201
