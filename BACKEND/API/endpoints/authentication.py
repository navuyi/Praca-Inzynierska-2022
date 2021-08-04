from flask import Blueprint
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint("authentication", __name__, url_prefix="/authentication")



@bp.route('/register', methods=['POST'])
def register():
    credentials = request.json

    # Check if user already exists
    cursor().execute(f"SELECT id FROM users WHERE email =%s", (credentials["email"], ))
    res = cursor().fetchall()
    if res:
        raise APIException(msg="Podane konto już istnieje", code=409)

    # Check if submitted passwords are the same
    valid = True if credentials["password"] == credentials["password_repeat"] else False
    if valid == False:
        raise APIException(msg="Hasła muszą być takie same", code=422)

    # Check if phone number is valid
    pn = credentials["phone_number"]
    if (str(pn).isnumeric()) == False or len(pn) != 9:
        raise APIException(msg="Numer telefonu jest nieprawidłowy", code=422)

    # Generate password hash
    pw_hash = generate_password_hash(credentials["password"])

    # Create new account
    try:
        cursor().execute(f"INSERT INTO users (f_name, l_name, password, email, phone_number) VALUES "
                     f"(%(f_name)s, %(l_name)s, %(password)s, %(email)s, %(phone_number)s)",
                     {
                         "f_name": credentials["f_name"],
                         "l_name": credentials["l_name"],
                         "password": pw_hash,
                         "email": credentials["email"],
                         "phone_number": credentials["phone_number"]
                     })
    except Exception as e:
        print(e)
        raise APIException(msg="Wystąpił błąd, spróbuj ponownie", code=500, payload=jsonify(err=e))

    return jsonify(message="Konto zostało pomyślnie utworzone"), 201

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
    is_guide = user_data["is_guide"]
    user_id = user_data["id"]


    return jsonify(access_token=access_token, refresh_token=refresh_token, is_guide=is_guide, user_id=user_id), 200



@bp.route("/logout", methods=['POST'])
def logout():
    pass


