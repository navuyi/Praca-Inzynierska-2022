from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from datetime import datetime
import subprocess
from werkzeug.security import generate_password_hash, check_password_hash
from urllib.parse import urlencode
from urllib.request import urlopen
from werkzeug.utils import secure_filename
import json
import os
import uuid

bp = Blueprint("modify_offer", __name__, url_prefix="/guide")


@bp.route('/offer', methods=['PUT'])
@jwt_required()
def modify_offer():
    tour_id = json.loads(request.form["tour_id"])
    general_data = json.loads(request.form["general_data"])
    guide_id = get_jwt_identity()
    ### Check if tour_id belongs to this guide
    cursor().execute(f"SELECT id FROM tours WHERE guide_id=%s", (guide_id, ))
    guide_tours = cursor().fetchall()
    if guide_id not in guide_tours:
        raise APIException(msg="Brak uprawnień", code=401)

    ### Handle general data
    if int(general_data["price"]) < 0:
        raise APIException(msg="Cena musi być wartością dodatnią", code=422)
    if int(general_data["person_limit"]) < 0:
        raise APIException(msg="Limit osób musi być liczbą dodatnią", code=422)
    # Checking date
    start_date = datetime.strptime(general_data["start_date"], "%Y-%m-%d")
    end_date = datetime.strptime(general_data["end_date"], "%Y-%m-%d")
    enrollment_deadline = datetime.strptime(general_data["enrollment_deadline_date"], "%Y-%m-%d")
    if end_date < start_date:
        raise APIException(msg="Data zakończenia wycieczki nie może być wcześniejsza niż data jej rozpoczęcia", code=422)
    if enrollment_deadline > end_date:
        raise APIException(msg="Data zakończenia zapisów nie może być późniejsza niż data końca wycieczki", code=422)

    insert = {
        "header": general_data["header"],
        "description": general_data["description"],
        "person_limit": general_data["person_limit"],
        "price": general_data["price"],
        "start_date": general_data["start_date"],
        "end_date": general_data["end_date"],
        "enrollment_deadline": f"{general_data['enrollment_deadline_date']} {general_data['enrollment_deadline_time']}",
        "tour_id": tour_id
    }

    cursor().execute(f"UPDATE tours SET description=%(description)s, header=%(header)s, person_limit=%(person_limit)s, price=%(price)s, "
                     f"start_date=%(start_date)s, end_date=%(end_date)s, enrollment_deadline=%(enrollment_deadline)s WHERE id=%(tour_id)s", insert)

    ### Handle tour plan
    tour_plan = json.loads(request.form["tour_plan"])
    cursor().execute(f"DELETE FROM tour_plan_points WHERE tour_id=%s", (tour_id, )) # <-- First deleting old values
    for plan in tour_plan:  # <-- Adding new values
        cursor().execute(f"INSERT INTO tour_plan_points (tour_id, number, description) VALUES (%s, %s, %s)", (tour_id, plan["number"], plan["description"]))

    ### Handle electives
    electives = json.loads(request.form["electives"])

    # Handle price list
    cursor().execute(f"DELETE FROM tour_price_list WHERE tour_id=%s", (tour_id, ))
    if electives["price_list"]:     # <-- insert new values only if price list was included in electives
        for price in json.loads(request.form["price_list"]):
            cursor().execute(f"INSERT INTO tour_price_list (tour_id, is_included, description) VALUES (%s, %s, %s)", (tour_id, price["is_included"], price["description"]))

    # Handle important info
    cursor().execute(f"DELETE FROM tour_important_info WHERE tour_id=%s", (tour_id, ))
    if electives["important_info"]:     # <-- insert new values only if important info was included in electives
        for elem in json.loads(request.form["important_info"]):
            cursor().execute(f"INSERT INTO tour_important_info (tour_id, description) VALUES (%s, %s)", (tour_id, elem["description"]))

    # Handle images delete
    if not electives["image_gallery"]:      # <-- delete all images if image gallery was not included in electives
        cursor().execute(f"DELETE FROM tour_images WHERE tour_id=%s", (tour_id, ))
    else:
        # Handle deletion of specified images
        for id in json.loads(request.form["images_to_delete"]):
            # Get path to file so it can be deleted from server disk
            cursor().execute(f"SELECT path FROM tour_images WHERE id=%s", (id, ))
            path = cursor().fetchone()["path"]
            command = ["rm", path]
            subprocess.run(command)     # <-- deleting file from disk
            cursor().execute(f"DELETE FROM tour_images WHERE id=%s", (id, ))    # <-- deleting specified image from database

    # Handle images add
    if "images" in request.files:
        images = request.files.getlist("images")
        for file in images:
            name = secure_filename(file.filename)
            file_prefix = os.path.splitext(name)[0] + str(":") + str(uuid.uuid4())  # File prefix and appended random sequence
            file_ext = os.path.splitext(name)[1]

            if file_ext not in current_app.config["AVAILABLE_EXTENSIONS"]:
                raise APIException(msg="Dany format pliku nie jest obsługiwany", code=422)
            file_path = os.path.join(current_app.config["TOUR_IMAGES_UPLOAD_DIRECTORY"], str(file_prefix + file_ext))
            # Save the image and add path to database
            try:
                statement = "INSERT INTO tour_images (tour_id, path, is_main, filename) VALUES (%(tour_id)s, %(path)s, %(is_main)s, %(filename)s)"
                insert = {
                    "tour_id": tour_id,
                    "path": file_path,
                    "is_main": False,
                    "filename": str(file_prefix + file_ext)
                }
                cursor().execute(statement, insert)
                file.save(file_path)
            except Exception as e:
                print(e)
                raise APIException(msg="File upload failed", code=500)

    return jsonify(message="Zmiany zostały wprowadzone pomyślnie"), 200


