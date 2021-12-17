import os.path
from datetime import datetime
from flask import Blueprint, jsonify
from flask import request, current_app
from app.handlers import APIException
from app.endpoints.utils.defineSQLParams import sqlParams
from app.endpoints.utils.dhmFromSeconds import dhm_from_seconds
from app.database.db import cursor


bp = Blueprint("tours_recent", __name__, url_prefix="/tour")

@bp.route("/tours/recent", methods=["GET"])
def get_recent_tours():
    # Check for number of tours to return in query parameters
    if "amount" in request.args:
        amount = int(request.args["amount"])
    else:
        amount = 3

    statement = f"SELECT tours.id as tour_id, header, description, filename FROM tours left join tour_images on tours.id=tour_images.tour_id AND is_main=1 ORDER BY tours.creation_date  LIMIT %s"
    insert = (amount, )
    cursor().execute(statement, insert)
    recents = cursor().fetchall()

    for recent in recents:
        recent["url"] = current_app.config["TOUR_IMAGES_DOWNLOAD_DIRECTORY"] + recent["filename"]

    response = jsonify(recents)
    return response, 200
