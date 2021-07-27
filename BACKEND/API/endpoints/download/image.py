from flask import Blueprint, request, current_app, jsonify
from flask import send_from_directory
from app.handlers import APIException
from app.database.db import cursor, lastrowid

bp = Blueprint("main_image", __name__, url_prefix="/download")

@bp.route("/image", methods=["GET"])
def return_image():
    args = request.args
    file = args["file"]
    print(current_app.config["TOUR_IMAGES_DIRECTORY"])

    return send_from_directory(current_app.config["TOUR_IMAGES_DIRECTORY"], file, as_attachment=False)


