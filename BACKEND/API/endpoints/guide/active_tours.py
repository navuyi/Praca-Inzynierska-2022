from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from app.endpoints.utils.dhmFromSeconds import dhm_from_seconds
import os
from datetime import datetime

from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint("active_tours", __name__, url_prefix="/guide")


@bp.route("/tours/active", methods=["GET"])
@jwt_required()
def get_active_tours():
    guide_id = get_jwt_identity()
    cursor().execute(f"SELECT is_guide FROM users WHERE id = %s", (guide_id, ))
    is_guide = cursor().fetchone()["is_guide"]
    if is_guide != 1:
        raise APIException(msg="Brak uprawnień", code=401)

    if "sort" in request.args:
        sort = request.args["sort"]
        if sort == "most_recent":
            ORDER = "ORDER BY creation_date DESC"
        elif sort == "oldest":
            ORDER = "ORDER BY creation_date"


    # Get guide's active tours
    cursor().execute(f"SELECT id, header, person_limit, start_date, end_date, creation_date, price, enrollment_deadline FROM tours WHERE NOW()<end_date AND guide_id = %s {ORDER if sort else ''}", (guide_id, ))
    tours = cursor().fetchall()  # <-- array of tours matched to given guide id

    tours_data = []
    for tour in tours:
        # Get tour main image
        cursor().execute(f"SELECT filename FROM tour_images WHERE tour_id = %s AND is_main = %s", (tour["id"], 1))
        filename = cursor().fetchone()["filename"]

        # Change tour start/end date format
        tour["start_date"] = tour["start_date"].strftime("%d/%m/%Y")
        tour["end_date"] = tour["end_date"].strftime("%d/%m/%Y")
        tour["creation_date"] = tour["creation_date"].strftime("%d/%m/%Y, %H:%M")
        tour["image_url"] = os.path.join(current_app.config["TOUR_IMAGES_DOWNLOAD_DIRECTORY"], filename)

        # Define time left to end of enrollments
        [days_left, hours_left, minutes_left] = dhm_from_seconds(tour["enrollment_deadline"])
        tour["days_left"] = days_left
        tour["time_left"] = f"{hours_left}:{f'0{minutes_left}' if minutes_left<10 else minutes_left}"


        tours_data.append(tour)




    response = jsonify(tours_data=tours_data)
    return response, 200