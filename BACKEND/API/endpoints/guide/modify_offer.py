from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from werkzeug.security import generate_password_hash, check_password_hash
from urllib.parse import urlencode
from urllib.request import urlopen
import json

bp = Blueprint("modify_offer", __name__, url_prefix="/guide")


@bp.route('/offer', methods=['PUT'])
@jwt_required()
def modify_offer():
    tour_id = request.json["tour_id"]
    general_data = request.json["general_data"]

    ### Handle general data
    if int(general_data["price"]) < 0:
        raise APIException(msg="Cena musi być wartością dodatnią", code=422)
    if int(general_data["person_limit"]) < 0:
        raise APIException(msg="Limit osób musi być liczbą dodatnią", code=422)
    #TODO Check dates

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


    return jsonify(message="OK"), 200


