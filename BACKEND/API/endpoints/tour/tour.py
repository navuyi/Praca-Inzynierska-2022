from flask import Blueprint
from flask import request, current_app
from app.handlers import APIException
from app.database.db import cursor
import os

bp = Blueprint("tour", __name__, url_prefix="/tour")



@bp.route("/tour", methods=["GET"])
def get_tour():
    tour_data = {}

    ## Get tour ID
    tour_id = request.args["tour_id"]

    ## Get general tour data
    cursor().execute(f"SELECT id, guide_id, header, description, start_date, end_date, price, person_limit FROM tours WHERE id = %s", (tour_id, ))
    general_data = cursor().fetchone()

    if not general_data: # <-- offer with given tour_id does not exist
        raise APIException(msg="Oferta nie istnieje", code=404)

    general_data["start_date"] = general_data["start_date"].strftime("%d/%m/%Y") # <-- format date
    general_data["end_date"] = general_data["end_date"].strftime("%d/%m/%Y")    # <-- format date
    tour_data["general_data"] = general_data


    ## Get guide data <-- users table
    guide_id = general_data["guide_id"]
    cursor().execute(f"SELECT id, f_name, l_name, email, phone_number FROM users WHERE id = %s AND is_guide = 1", (guide_id, ))
    guide_data = cursor().fetchone()
    tour_data["guide_data"] = guide_data

    ## Get tour plan <-- it is mandatory after all <-- order by number
    cursor().execute(f"SELECT description, number FROM tour_plan_points WHERE tour_id = %s ORDER BY NUMBER", (tour_id, ))
    tour_plan = cursor().fetchall()
    if tour_plan:
        tour_data["tour_plan"] = tour_plan

    ## Get Electives if exist
    electives = {
        "price_list": False,
        "important_info": False,
        "image_gallery": False
    }

    # Get tour price list if exists
    cursor().execute(f"SELECT description, is_included FROM tour_price_list WHERE tour_id = %s", (tour_id, ))
    price_list = cursor().fetchall()
    if price_list:
        electives["price_list"] = True
        tour_data["price_list"] = price_list

    # Get important info if exists
    cursor().execute(f"SELECT description FROM tour_important_info WHERE tour_id = %s", (tour_id, ))
    important_info = cursor().fetchall()
    if important_info:
        electives["important_info"] = True
        tour_data["important_info"] = important_info

    # Get main image URL
    cursor().execute(f"SELECT filename FROM tour_images WHERE tour_id = %(tour_id)s AND is_main = %(is_main)s", {
        "tour_id": tour_id,
        "is_main": True
    })
    filename = cursor().fetchone()["filename"]
    image_url = os.path.join(current_app.config["TOUR_IMAGES_DOWNLOAD_DIRECTORY"], filename)
    tour_data["image_url"] = image_url

    # Get gallery images URLs if exist
    cursor().execute(f"SELECT filename FROM tour_images WHERE tour_id = %(tour_id)s AND is_main = %(is_main)s", {
        "tour_id": tour_id,
        "is_main": False
    })
    files = cursor().fetchall()
    if files:
        tour_data["image_gallery"] = []
        for file in files:
            filename = file["filename"]
            tour_data["image_gallery"].append(os.path.join(current_app.config["TOUR_IMAGES_DOWNLOAD_DIRECTORY"], filename))




    tour_data["electives"] = electives


    return tour_data, 200

