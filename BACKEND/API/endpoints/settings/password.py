from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from werkzeug.security import generate_password_hash, check_password_hash
from urllib.parse import urlencode
from urllib.request import urlopen
import json

bp = Blueprint("change_password", __name__, url_prefix="/settings")


@bp.route('/password', methods=['PATCH'])
@jwt_required()
def change_password():
    # Check if required data is present
    if "current_password" not in request.json or "new_password" not in request.json or "new_password_repeat" not in request.json:
        raise APIException(msg="Brakuje danych", code=422)

    # Check if password and repeated password are the same
    if request.json["new_password"] != request.json["new_password_repeat"]:
        raise APIException(msg="Nowe hasła muszą być takie same", code=422)

    # Check if user's password is correct
    user_id = get_jwt_identity()
    cursor().execute(f"SELECT password FROM users WHERE id=%s", (user_id, ))
    password_hash = cursor().fetchone()["password"]
    if not check_password_hash(password_hash, request.json["current_password"]):
        raise APIException(msg="Hasło jest nieprawidłowe", code=401)


    # Change user's password
    insert = {
        "password": generate_password_hash(request.json["new_password"]),
        "user_id": user_id
    }
    cursor().execute(f"UPDATE users SET password=%(password)s WHERE id=%(user_id)s", insert)

    return jsonify(message="Hasło zmienione pomyślnie"), 200


