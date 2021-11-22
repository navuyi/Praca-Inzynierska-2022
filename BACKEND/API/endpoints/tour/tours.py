import os.path
from datetime import datetime
from flask import Blueprint, jsonify
from flask import request, current_app
from app.handlers import APIException
from app.endpoints.utils.defineSQLParams import sqlParams
from app.endpoints.utils.dhmFromSeconds import dhm_from_seconds
from app.database.db import cursor


bp = Blueprint("tours", __name__, url_prefix="/tour")


@bp.route("/tours", methods=["GET"])
def get_tours():
    args = request.args

    filter_price = args.getlist("tour_price[]")
    filter_places = args.getlist("tour_places[]")
    filter_date = args.getlist("tour_date[]")

    results_per_page = int(args.get("results_per_page"))
    sort_by = args.get("sort_by")
    page = int(args.get("page"))

    if sort_by == "most_recent":
        ORDER = "creation_date DESC"
    elif sort_by == "oldest":
        ORDER = "creation_date"
    elif sort_by == "price":
        ORDER = "price"
    elif sort_by == "price_desc":
        ORDER = "price DESC"

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

    statement = f'''SELECT id FROM tours {f'WHERE NOW()<enrollment_deadline AND price BETWEEN {price_lower} AND {price_upper}' if by_price else 'WHERE'}
                        {f'AND' if (by_price and by_date) else ""} {f'start_date >= "{date_lower}" AND end_date <= "{date_upper}"' if by_date else ""} ORDER BY {ORDER}'''

    cursor().execute(statement)
    price_date_tours = []
    res = cursor().fetchall()
    for item in res:
        price_date_tours.append(item["id"])

    # Filter by places
    if "tour_places" in sql_params:
        place_tours = []
        for place_id in sql_params["tour_places"]:
            statement = f"SELECT tour_id FROM tour_has_places WHERE place_id = %s"
            cursor().execute(statement, (place_id,))
            res = cursor().fetchall()  # <-- Get all tours where places matches given places returns array of objects: {"tour_id": XY}
            if res:
                for item in res:
                    tour_id = item["tour_id"]
                    if tour_id not in place_tours:  # <-- Prevent duplicates
                        place_tours.append(tour_id)
        applicable_tours = set(price_date_tours).intersection(place_tours)
    else:
        applicable_tours = price_date_tours

    ### After filtration ###
    applicable_tours = list(applicable_tours)
    tours_found = len(applicable_tours) # <-- total  number of found results - matching filter parameters
    lower_limit = (page-1)*results_per_page
    upper_limit = lower_limit + results_per_page
    applicable_tours = applicable_tours[lower_limit : upper_limit] # <-- Implement pagination

    ### Get applicable tours data ###
    if not applicable_tours: # <-- Return with code 404 if no matches were found
        print("Not found")
        return {"msg": "Nie znaleziono ofert o podanych parametrach"}, 404
    tours_data = []
    for tour_id in applicable_tours:
        tour = {}
        # Get general information about the tour
        cursor().execute(f"SELECT * FROM tours WHERE id = %s", (tour_id, ))
        general_data = cursor().fetchall()[0]

        date_format = "%d.%m.%Y"
        time_format = "%H:%M"

        general_data["start_date"] = general_data["start_date"].strftime(date_format) # <-- format date
        general_data["end_date"] = general_data["end_date"].strftime(date_format)    # <-- format date

        [days_left, hours_left, minutes_left] = dhm_from_seconds(general_data["enrollment_deadline"])
        general_data["days_left"] = days_left
        general_data["time_left"] = f"{hours_left}:{f'0{minutes_left}' if minutes_left<10 else minutes_left}"


        # Get guide data
        guide_id = general_data["guide_id"]
        cursor().execute(f"SELECT email, f_name, l_name, phone_number, id FROM users WHERE id = %s", (guide_id, ))
        guide_data = cursor().fetchall()[0]

        # Get main image url
        cursor().execute(f"SELECT filename FROM tour_images WHERE tour_id = %(tour_id)s AND is_main = %(is_main)s", {
            "tour_id": tour_id,
            "is_main": True
        })
        filename = cursor().fetchone()["filename"]
        image_url = os.path.join(current_app.config["TOUR_IMAGES_DOWNLOAD_DIRECTORY"], filename)

        tour["general_data"] = general_data
        tour["guide_data"] = guide_data
        tour["image_url"] = image_url

        # Get enrollment data
        cursor().execute(f"SELECT COALESCE(sum(tickets), 0) FROM enrollments WHERE tour_id=%s", (tour_id, ))
        tickets = cursor().fetchone()["COALESCE(sum(tickets), 0)"]
        tour["tickets"] = tickets

        tours_data.append(tour)


    response = jsonify(tours_data=tours_data, tours_found=tours_found)

    return response, 200
