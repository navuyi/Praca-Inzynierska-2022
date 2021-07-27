from flask import Blueprint
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint("authentication", __name__, url_prefix="/authentication")



@bp.route('/register', methods=['POST', 'GET'])
def register():
    pass

@bp.route("/login", methods=['POST'])
def login():
    if "email" not in request.json or "password" not in request.json:
        raise APIException(msg="Brakuje danych", code=422)
    # Email & password provided in request body
    email = request.json["email"]
    password = request.json["password"]

    # Check if user exists
    cursor().execute("SELECT * FROM users WHERE email = %(email)s", {"email": email})
    user_data = cursor().fetchone()
    if not user_data:
        raise APIException(msg="Podany użytkownik nie istnieje", code=404)

    # Check if passwords are the same
    db_password_hash = user_data["password"]
    verified = check_password_hash(db_password_hash, password)
    if not verified:
        raise APIException(msg="Hasło jest nieprawidłowe", code=401)



    # Return JWT
    user_id = str(user_data["id"])
    access_token = create_access_token(identity=str(user_id))
    refresh_token = create_refresh_token(identity=str(user_id))



    return jsonify(access_token=access_token, refresh_token=refresh_token), 200



@bp.route("/logout", methods=['POST'])
def logout():
    pass
