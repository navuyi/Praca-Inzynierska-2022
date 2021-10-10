from flask import Blueprint
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from werkzeug.security import generate_password_hash, check_password_hash
import math

bp = Blueprint("closed_tours", __name__, url_prefix="/guide")


@bp.route("/tours/closed", methods=["GET"])
@jwt_required()
def get_active_tours():
    # Check if the user is a guide
    user_id = get_jwt_identity()
    cursor().execute(f"SELECT is_guide FROM users WHERE id=%s", (user_id, ))
    result = cursor().fetchone()["is_guide"]
    if int(result) == 0:
        raise APIException(msg="Not allowed", code=403)

    # Handle sort and page
    page =int(request.args["page"])


    LIMIT = 5 #TODO Change to larger number later
    OFFSET = (page-1) * LIMIT

    if "sort" in request.args:
        sort = request.args["sort"]
        if sort == "most_recent":
            ORDER = "ORDER BY creation_date DESC"
        elif sort == "oldest":
            ORDER = "ORDER BY creation_date"


    statement = f"SELECT SQL_CALC_FOUND_ROWS id, header, description, start_date, end_date, enrollment_deadline, person_limit, price FROM tours WHERE guide_id=%(guide_id)s {ORDER} LIMIT {LIMIT} OFFSET {OFFSET}"
    insert = {
        "guide_id": user_id
    }
    cursor().execute(statement, insert)
    offers = cursor().fetchall()

    cursor().execute("SELECT FOUND_ROWS()")
    found_rows = cursor().fetchone()["FOUND_ROWS()"]
    pages = math.ceil(found_rows/LIMIT)

    for offer in offers:
        #offer["creation_date"] = offer["creation_date"].strftime("%d.%m.%Y") if offer["creation_date"] is not None else None
        offer["start_date"] = offer["start_date"].strftime("%d.%m.%Y")
        offer["end_date"] = offer["end_date"].strftime("%d.%m.%Y")
        offer["enrollment_deadline"] = offer["enrollment_deadline"].strftime("%d.%m.%Y")

        #TODO Or try fetching the data in separate query
        tour_id = offer["id"]
        statement = f"SELECT sum(COALESCE(tickets, 0)) as tickets FROM enrollments WHERE tour_id=%(tour_id)s"
        insert = {
            "tour_id": tour_id
        }
        cursor().execute(statement, insert)
        data = cursor().fetchone()
        offer["tickets"] = data["tickets"] if data["tickets"] is not None else 0

    response = jsonify(offers=offers, total_pages=pages)
    return response, 200