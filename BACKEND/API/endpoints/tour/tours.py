from flask import Blueprint, jsonify
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

    # Filtration - price, date, places
    if ('price_upper' in sql_params) and ('price_lower' in sql_params):
        by_price = True
        price_lower = sql_params["price_lower"]
        price_upper = sql_params["price_upper"]
    else:
        by_price = False
    if ('date_lower' in sql_params)  and ('date_upper' in sql_params):
        by_date = True
        date_lower = sql_params['date_lower']
        date_upper = sql_params['date_upper']
    else:
        by_date = False
    if 'tour_places' in sql_params:
        by_place = True
    else:
        by_place = False

    statement = f'''SELECT id FROM tours {f'WHERE price BETWEEN {price_lower} AND {price_upper}' if by_price else 'WHERE'}
                        {f'AND' if (by_price and by_date) else ""} {f'start_date > "{date_lower}" AND end_date < "{date_upper}"' if by_date else ""}'''

    cursor().execute(statement)
    price_date_tours = []
    res = cursor().fetchall()
    for item in res:
        price_date_tours.append(item["id"])

    # Filter by tours
    if "tour_places" in sql_params:
        place_tours = []
        for place_id in sql_params["tour_places"]:
            print(place_id)
            statement = f"SELECT tour_id FROM tour_has_places WHERE place_id = %s"
            cursor().execute(statement, (place_id,))
            res = cursor().fetchall()  # <-- Get all tours where places matches given places returns array of objects: {"tour_id": XY}
            if res:
                for item in res:
                    tour_id = item["tour_id"]
                    if tour_id not in applicable_tours:  # <-- Prevent duplicates
                        place_tours.append(tour_id)

    if "tour_places" in sql_params:
        applicable_tours = set(price_date_tours).intersection(place_tours)
    else:
        applicable_tours = price_date_tours

    print(applicable_tours)

    ### Get applicable tours data ###
    if not applicable_tours: # <-- Return with code 404 if no matches were found
        print("Not found")
        return {"msg": "Nie znaleziono ofert o podanych parametrach"}, 404
    return_data = []
    for tour_id in applicable_tours:
        tour = {}
        # Get general information about the tour
        cursor().execute(f"SELECT * FROM tours WHERE id = %s", (tour_id, ))
        general_data = cursor().fetchall()[0]
        general_data["start_date"] = general_data["start_date"].strftime("%d/%m/%Y") # <-- format date
        general_data["end_date"] = general_data["end_date"].strftime("%d/%m/%Y")    # <-- format date

        # Get guide data
        guide_id = general_data["guide_id"]
        cursor().execute(f"SELECT * FROM users WHERE id = %s", (guide_id, ))
        guide_data = cursor().fetchall()[0]

        #TODO Get URL to the main image


        tour["general_data"] = general_data
        tour["guide_data"] = guide_data



        return_data.append(tour)

    return jsonify(return_data), 200
