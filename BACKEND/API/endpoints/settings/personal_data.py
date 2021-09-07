from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from werkzeug.security import generate_password_hash, check_password_hash
from urllib.parse import urlencode
from urllib.request import urlopen
import json

bp = Blueprint("personal_dataasdsad", __name__, url_prefix="/settings")


@bp.route('/personal_data', methods=['GET', 'PUT'])
@jwt_required()
def handle_personal_data():
    if request.method == "GET":
        user_id = get_jwt_identity()

        cursor().execute(f"SELECT f_name, l_name, email, phone_number FROM users WHERE id=%s", (user_id, ))
        personal_data = cursor().fetchone()

        return jsonify(personal_data), 200




    if request.method == "PUT":
        user_id = get_jwt_identity()

        insert = request.json
        insert["user_id"] = user_id
        cursor().execute(f"UPDATE users SET f_name=%(f_name)s, l_name=%(l_name)s, email=%(email)s, phone_number=%(phone_number)s WHERE id=%(user_id)s", insert)

        return jsonify(message="Informacje zostały zaktualizowane pomyślnie"), 200


