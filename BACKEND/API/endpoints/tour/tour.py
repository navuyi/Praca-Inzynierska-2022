from flask import Blueprint
from flask import request
from API.handlers import APIException
from API.database.db import cursor

bp = Blueprint("tour", __name__, url_prefix="/tour")



@bp.route("/tour", methods=["GET"])
def get_tour():
    # Get tour ID
    tour_id = request.args["id"]

    # Get general tour data
    cursor().execute(f"SELECT * FROM tours WHERE id = %s", (tour_id, ))
    general_data = cursor().fetchall()[0]

    # Get guide data <-- users table

    # Get Electives if exist



    return {"msg": "K"}, 200

