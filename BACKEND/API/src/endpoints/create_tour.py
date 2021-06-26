from flask import Blueprint, jsonify, request
from .db_connection import open_conn, close_conn

import json

create_tour = Blueprint("create_tour", __name__)


@create_tour.route("/new_tour", methods=["POST"])
def new_tour():
    main_image = request.files["main_image"]
    data = json.loads(request.form["tour_data"])
    
    header = data["header"]
    description = data["description"]
    guide_id = data["guide_id"]
    price = data["price"]
    person_limit = data["person_limit"]
    start_date = data["start_date"]
    end_date = data["end_date"]
    tour_plan = data["tour_plan"]               # Array of IDs
    tour_places = data["tour_places"]           # Array of IDs

    

    print(main_image)
    print(header)
    print(description)
    print(guide_id)
    print(price)
    print(person_limit)
    print(start_date)
    print(end_date)
    print(tour_plan)
    print(tour_places)


    print("done")
    return {"msg": "OK"}, 201