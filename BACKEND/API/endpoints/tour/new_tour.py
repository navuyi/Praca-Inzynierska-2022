from flask import Blueprint, request, current_app, jsonify
from datetime import datetime

from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.handlers import APIException
from app.database.db import cursor, lastrowid

import os
import json
import uuid

bp = Blueprint("new_tour", __name__, url_prefix="/tour")

@bp.route("/new_tour", methods=["POST"])
@jwt_required()
def create_new_tour():
    # Check if request come from account with guide privileges
    user_id = get_jwt_identity()
    cursor().execute(f"SELECT is_guide FROM users WHERE id = %s", (user_id, ))
    is_guide = cursor().fetchone()["is_guide"]
    if is_guide != 1:
        raise APIException(msg="Brak uprawnień", code=401)

    ### Get the general data ###
    files = request.files
    tour_data = json.loads(request.form["tour_data"])
    electives = json.loads(request.form["electives"])

    if(not files or not tour_data or not electives):
        raise APIException(msg="Brakuje danych", code=422)

    ### Get the elective data ###
    if(electives["priceList"]):
        price_list = json.loads(request.form["priceList"])
        if not price_list:
            raise APIException(msg="Brakuje informacji o cenniku", code=422)
    if(electives["importantInfo"]):
        important_info = json.loads(request.form["importantInfo"])
        if not important_info:
            raise APIException(msg="Brakuje danych z sekcji Ważne Informacje", code=422)

    ### Check number of files limit ###
    numOfFiles = 0
    for key in request.files:
        if(key!= "main_image"):
            numOfFiles += 1
    file_limit = current_app.config["TOUR_IMAGES_LIMIT"]
    if numOfFiles > file_limit:
        raise APIException(msg="Załączono zbyt dużo plików. Limit wynosi: "+str(file_limit), code=422)

    ### Check if single file is not too large ###
    for key in request.files:
        file = request.files[key]
        blob = file.read()
        size = len(blob)
        if size > current_app.config["MAX_IMAGE_SIZE"] and key != "main_image":
            raise APIException(msg=f"Plik o nazwie '{file.filename}' jest zbyt duży", code=422)

    ### Check date correctness ###
    start_date = datetime.strptime(tour_data["start_date"], "%Y-%m-%d")
    end_date = datetime.strptime(tour_data["end_date"], "%Y-%m-%d")
    enrollment_deadline = datetime.strptime(tour_data["enrollment_deadline_date"], "%Y-%m-%d")
    if end_date < start_date:
        raise APIException(msg="Data zakończenia wycieczki nie może być wcześniejsza niż data jej rozpoczęcia", code=422)
    if enrollment_deadline > end_date:
        raise APIException(msg="Data zakończenia zapisów nie może być późniejsza niż data końca wycieczki", code=422)



    ### Create new tour in tours table ###
    try:
        print(f"{tour_data['enrollment_deadline_date']} {tour_data['enrollment_deadline_time']}:00")
        columns = """header, description, guide_id, price, person_limit, start_date, end_date, enrollment_deadline"""
        statement = f"""INSERT INTO tours ({columns}) VALUES (%(header)s, %(description)s, %(guide_id)s, %(price)s, %(person_limit)s, %(start_date)s, %(end_date)s, %(enrollment_deadline)s)"""
        insert = {
            "header": tour_data["header"],
            "description": tour_data["description"],
            "guide_id": user_id,            # <-- Get user id from JWT not frontend localstorage
            "price": tour_data["price"],
            "person_limit": tour_data["person_limit"],
            "start_date": tour_data["start_date"],
            "end_date": tour_data["end_date"],
            "enrollment_deadline": f"{tour_data['enrollment_deadline_date']} {tour_data['enrollment_deadline_time']}"
        }
        cursor().execute(statement, insert)
        TOUR_ID = lastrowid()
    except Exception as e:
        print(e)
        raise APIException(msg="Coś poszło nie tak", code=500)
        
    ### Save uploaded images and insert paths to database ###
    for key in request.files:
        if(key != "main_image" and electives["imageGallery"] == False):
            break
        file = request.files[key]
        name = secure_filename(file.filename)
        file_prefix = os.path.splitext(name)[0] + str(":") + str(uuid.uuid4()) # File prefix and appended random sequence
        file_ext = os.path.splitext(name)[1]
        if file_ext not in current_app.config["AVAILABLE_EXTENSIONS"]:
            raise APIException(msg="Dany format pliku nie jest obsługiwany", code=422)
        file_path = os.path.join(current_app.config["TOUR_IMAGES_UPLOAD_DIRECTORY"], str(file_prefix + file_ext))

        # Save the image and add path to database
        try:
            statement = "INSERT INTO tour_images (tour_id, path, is_main, filename) VALUES (%(tour_id)s, %(path)s, %(is_main)s, %(filename)s)"
            if(key == "main_image"):
                is_main = True
            else:
                is_main = False
            insert = {
                "tour_id": TOUR_ID,
                "path": file_path,
                "is_main": is_main,
                "filename": str(file_prefix + file_ext)
            }
            cursor().execute(statement, insert)
            file.save(file_path)
        except Exception as e:
            print(e)
            raise APIException(msg="File upload failed", code=500)
    
    ### Insert in(ex)cluded positions into tour_price_list table ###
    if(electives["priceList"]):
        for item in price_list:
            statement = "INSERT INTO tour_price_list (tour_id, description, is_included) values (%(tour_id)s, %(description)s, %(is_included)s)"
            insert = {
                "tour_id": TOUR_ID,
                "description": item["text"],
                "is_included": item["variant"]
            }
            cursor().execute(statement, insert)

    ### Insert important informations into tour_important_info ###
    if(electives["importantInfo"]):
        for info in important_info:
            statement = "INSERT INTO tour_important_info (tour_id, description) values (%s, %s)"
            insert = (TOUR_ID, info)
            cursor().execute(statement, insert)

    ### Insert tour plan points into tour_plan_points table ###
    for index, point in enumerate(tour_data["tour_plan"]):
        statement = "INSERT INTO tour_plan_points (tour_id, number, description) VALUES (%s, %s, %s)"
        insert = (TOUR_ID, index+1, point)
        cursor().execute(statement, insert)

    # Insert tour places into tour_has_places table
    for place_id in tour_data["tour_places"]:
        statement = "INSERT INTO tour_has_places (place_id, tour_id) VALUES (%s, %s)"
        insert = (place_id, TOUR_ID)
        cursor().execute(statement, insert)



    return jsonify({"message": "Pomyślnie utworzono nową ofertę wycieczki"}), 201
    
   