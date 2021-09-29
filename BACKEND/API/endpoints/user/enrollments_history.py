import math

from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor, lastrowid
from datetime import datetime

bp = Blueprint("get_user_enrollments_history", __name__, url_prefix="/user")

@bp.route("/enrollments/history", methods=["GET"])
@jwt_required()
def get_user_enrollments_history():
    user_id = get_jwt_identity()
    page = request.args["page"]
    sort = request.args["sort"]

    if sort == "oldest":
        ORDER = "end_date"
    elif sort == "most_recent":
        ORDER = "end_date DESC"

    LIMIT = 5
    OFFSET = (int(page)-1)*LIMIT
    cursor().execute(f"SELECT SQL_CALC_FOUND_ROWS enrollments.id, tour_id, enrollments.creation_date, amount_payable, "
                     f"start_date as tour_start_date, end_date as tour_end_date, tours.header as tour_header, tours.description as tour_description, users.f_name as guide_f_name, users.l_name as guide_l_name  "
                     f"FROM enrollments, tours, users "
                     f"WHERE enrollments.user_id={user_id} AND tours.id=enrollments.tour_id AND users.is_guide=1 AND users.id=tours.guide_id AND NOW() > end_date ORDER BY {ORDER} LIMIT {LIMIT} OFFSET {OFFSET}")
    enrollments = cursor().fetchall()

    cursor().execute(f"SELECT FOUND_ROWS()")
    total_rows = cursor().fetchone()["FOUND_ROWS()"]
    total_pages = math.ceil(int(total_rows)/LIMIT)

    for enrollment in enrollments:
        enrollment_id = enrollment["id"]
        # Get enrollment participants
        cursor().execute(f"SELECT full_name FROM enrollment_participants WHERE enrollment_id={enrollment_id}")
        enrollment["participants"] = cursor().fetchall()

        # Reformat dates
        enrollment["tour_start_date"] = enrollment["tour_start_date"].strftime("%d.%m.%Y")
        enrollment["tour_end_date"] = enrollment["tour_end_date"].strftime("%d.%m.%Y")

        # Get tour image
        cursor().execute("SELECT filename FROM tour_images WHERE tour_id=%s AND is_main=1", (enrollment["tour_id"], ))
        res = cursor().fetchone()
        enrollment["image_url"] = current_app.config["TOUR_IMAGES_DOWNLOAD_DIRECTORY"] + "/" + res["filename"]

        # Get tour places
        cursor().execute(f"SELECT place FROM tour_places, tour_has_places WHERE tour_places.id = tour_has_places.place_id AND tour_has_places.tour_id=%s", (enrollment["tour_id"], ))
        enrollment["places"] = cursor().fetchall()

    response = jsonify(enrollments=enrollments, total_pages=total_pages, total_rows=total_rows)
    return response, 200


