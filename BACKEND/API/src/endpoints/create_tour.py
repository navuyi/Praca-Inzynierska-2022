from flask import Blueprint, jsonify, request
from .db_connection import open_conn, close_conn
from datetime import datetime
from werkzeug.utils import secure_filename

import os
import json
import uuid

create_tour = Blueprint("create_tour", __name__)

TOUR_IMAGES_DIRECTORY = "/home/rfiglus/BACKEND/API/src/static/tour_images"

@create_tour.route("/new_tour", methods=["POST"])
def new_tour():
    if "main_image" not in request.files:
        return {"msg": "No image provided"}, 400
    
    main_image = request.files["main_image"]
    data = json.loads(request.form["tour_data"])
    
    try:
        header = data["header"]
        description = data["description"]
        guide_id = data["guide_id"]
        print(guide_id)
        price = data["price"]
        person_limit = data["person_limit"]
        start_date = data["start_date"]
        end_date = data["end_date"]
        tour_plan = data["tour_plan"]               # Array of IDs
        tour_places = data["tour_places"]           # Array of IDs
    except Exception as e:
        print(e)
        return {"msg": "Not all data was provided"}, 400
    
    # Create image name with random sequence 
    main_image_filename = secure_filename(main_image.filename)
    name = os.path.splitext(main_image_filename)[0] + str(":") + str(uuid.uuid4())
    ext = os.path.splitext(main_image_filename)[1]
    main_image_path = os.path.join(TOUR_IMAGES_DIRECTORY, str(name+ext))

    # Save the image in under the genertated path
    try:
        print(main_image_path)
        main_image.save(main_image_path)
    except Exception as e:
        print(e)

    try:
        [conn, cur] = open_conn()

        # Insert proper positions into tours table
        columns = "header, description, guide_id, price, person_limit, start_date, end_date, main_image_path"
        statement = f"INSERT INTO tours ({columns}) VALUES (%s, %s, %s, %s , %s, %s, %s, %s)"
        insert = (header, description, guide_id, price, person_limit, start_date, end_date, main_image_path)
        cur.execute(statement, insert)
        conn.commit()


        # Get this tour id which was assigned by the database operations
        tour_id = cur.lastrowid

        # Insert tour plan points into tour_plan_points table
        for index, point in enumerate(tour_plan):
            print(point + " " + str(index))
            statement = f"INSERT INTO tour_plan_points (tour_id, number, description) VALUES (%s, %s, %s)"
            insert = (tour_id, index+1, point)
            cur.execute(statement, insert)
            conn.commit()
        
        # Insert tour places into tour_has_places table
        #TODO in roder to do that get rid of doubles in tour_places table
        # tour_has_places table indicates which tour has which places many-to-many relation
        
    except Exception as e:
        print(e)
        pass
    
    


    

    


   
    return {"msg": "OK"}, 201