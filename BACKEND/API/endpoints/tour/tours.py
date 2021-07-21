from flask import Blueprint
from flask import request
from API.handlers import APIException
from API.endpoints.utils.defineSQLParams import sqlParams

from API.database.db import cursor

import json

bp = Blueprint("tours", __name__, url_prefix="/tour")


@bp.route("/tours", methods=["GET"])
def get_tours():
    args = request.args

    filter_price = args.getlist("tour_price[]")
    filter_places = args.getlist("tour_places[]")
    filter_date = args.getlist("tour_date[]")

    ### Define sql_params ###
    sql_params = sqlParams(price=filter_price, date=filter_date, places=filter_places)
    applicable_tours = []  # <-- array for tour IDs that match filtering

    ### Filtering statement <-- get tours IDs with defined places
    if "tour_places" in sql_params:
        for place_id in sql_params["tour_places"]:
            print(place_id)
            statement = f"SELECT tour_id FROM tour_has_places WHERE place_id = %s"
            cursor().execute(statement, (place_id,))
            res = cursor().fetchall()  # <-- Get all tours where places matches given places returns array of objects: {"tour_id": XY}
            if res:
                for item in res:
                    tour_id = item["tour_id"]
                    if tour_id not in applicable_tours:  # <-- Prevent duplicates
                        applicable_tours.append(tour_id)
    ######
    ### More filtering will be done here <-- price and date filtering
    ######

    ### Get filter applicable tours data ###
    if not applicable_tours:
        print("Not found")
        return {"msg": "Nie znaleziono ofert o podanych parametrach"}, 404
    #TODO - get the data of apllicable tours and send it back to frontend


    return {"msg": "OK"}, 200
