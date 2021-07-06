import re
from flask import Blueprint, jsonify, request
from .db_connection import open_conn, close_conn
from datetime import datetime
from werkzeug.utils import secure_filename


import os
import json
import uuid

create_tour = Blueprint("create_tour", __name__)

TOUR_IMAGES_DIRECTORY = "/home/rfiglus/BACKEND/API/src/static/tour_images"
AVAILABLE_EXTENSIONS = ['.jpg', '.png', '.gif', '.tif', '.tiff', '.jpeg', '.bmp']

@create_tour.route("/new_tour", methods=["POST"])
def new_tour():
    # Main image is required!!!
    if "main_image" not in request.files:
        return {"msg": "Main image not provided"}, 400
    
    try:
        data = json.loads(request.form["tour_data"])
        electives = json.loads(request.form["electives"])
        if(electives["priceList"]):
            price_list = json.loads(request.form["priceList"])
            print(price_list)
        if(electives["imageGallery"]):
            pass
        if(electives["importantInfo"]):
            important_info = json.loads(request.form["importantInfo"])
    except Exception as e:
        print(e)
        return {"msg": "Could not load the data"}, 400

    try:
        header = data["header"]
        description = data["description"]
        guide_id = data["guide_id"]
        price = data["price"]
        person_limit = data["person_limit"]
        start_date = data["start_date"]
        end_date = data["end_date"]
        tour_plan = data["tour_plan"]               # Array of IDs
        tour_places = data["tour_places"]           # Array of IDs
    except Exception as e:
        print(e)
        return {"msg": "Not all data was provided"}, 400
    

    try:
        [conn, cur] = open_conn()

        # Insert proper positions into tours table
        columns = """header, description, guide_id, price, person_limit, start_date, end_date, 
        has_price_list, has_image_gallery, has_important_info"""
        statement = f"INSERT INTO tours ({columns}) VALUES (%s, %s, %s, %s , %s, %s, %s, %s, %s, %s)"
        insert = (header, description, guide_id, price, person_limit, start_date, end_date, 
        electives["priceList"], electives["imageGallery"], electives["importantInfo"])
        cur.execute(statement, insert)
        conn.commit()

        # Get this tour id which was assigned by the database operations
        tour_id = cur.lastrowid

        # Save uploaded images and insert paths to database
        for key in request.files:
            if(key != "main_image" and electives["imageGallery"] == False):
                break
            file = request.files[key]
            name = secure_filename(file.filename)
            file_prefix = os.path.splitext(name)[0] + str(":") + str(uuid.uuid4()) # File prefix and appended random sequence
            file_ext = os.path.splitext(name)[1]
            if file_ext not in AVAILABLE_EXTENSIONS:
                return {"msg": "Invalid file"}, 422
            file_path = os.path.join(TOUR_IMAGES_DIRECTORY, str(file_prefix + file_ext))

            # Save the image and add path to database
            try:
                statement = "INSERT INTO tour_images (tour_id, path, is_main) VALUES (%s, %s, %s)"
                if(key == "main_image"):
                    is_main = True
                else:
                    is_main = False
                insert = (tour_id, file_path, is_main)
                cur.execute(statement, insert)
                conn.commit()
                file.save(file_path)
            except Exception as e:
                print(e)
                return {"msg": "Failed handling image"}, 500

        # Insert in(ex)cluded positions into tour_price_list table
        if(electives["priceList"]):
            for item in price_list:
                statement = "INSERT INTO tour_price_list (tour_id, description, is_included) values (%s, %s, %s)"
                insert = (tour_id, item["text"], item["variant"])
                cur.execute(statement, insert)
                conn.commit()

        # Insert tour plan points into tour_plan_points table
        for index, point in enumerate(tour_plan):
            statement = "INSERT INTO tour_plan_points (tour_id, number, description) VALUES (%s, %s, %s)"
            insert = (tour_id, index+1, point)
            cur.execute(statement, insert)
            conn.commit()
        
        # Insert tour places into tour_has_places table
        for place_id in tour_places:
            statement = "INSERT INTO tour_has_places (place_id, tour_id) VALUES (%s, %s)"
            insert = (place_id, tour_id)
            cur.execute(statement, insert)
            conn.commit()
    except Exception as e:
        print(e)
        return {"msg": "Something went wrong"}, 422
       
    


    return {"msg": "OK"}, 201