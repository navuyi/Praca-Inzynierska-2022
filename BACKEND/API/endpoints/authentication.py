from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from werkzeug.security import generate_password_hash, check_password_hash
from urllib.parse import urlencode
from urllib.request import urlopen
import json
from app.endpoints.utils.email import send_email
from app.endpoints.utils.confirmationToken import generate_confirmation_token
from app.endpoints.utils.confirmationToken import confirm_token

bp = Blueprint("authentication", __name__, url_prefix="/authentication")



@bp.route('/register', methods=['POST'])
def register():
    credentials = request.json

    if(current_app.config["RECAPTCHA_ENABLED"]):        # <-- Check config for reCAPTCHA settings
        # Verify reCAPTCHA token
        url = "https://www.google.com/recaptcha/api/siteverify"
        payload = urlencode({
            "secret": current_app.config["RECAPTCHA_SECRET_KEY"],
            "response": credentials["token"]
        })
        data = urlopen(url, payload.encode('utf-8')).read()
        result = json.loads(data)
        '''
            {
            "success": true|false,
            "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
            "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
            "error-codes": [...]        // optional
            }
        '''
        if result["success"] == False:
            raise APIException(msg="Błąd reCAPTCHA. Proszę odświeżyć stronę.", code=422)
        else:
            pass

    # Check if user already exists
    cursor().execute(f"SELECT id FROM users WHERE email =%s", (credentials["email"], ))
    res = cursor().fetchall()
    if res:
        raise APIException(msg="Konto z podanym adresem email już istnieje", code=409)

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

    # Send email message
    token = generate_confirmation_token(credentials["email"])

    globalhost = f"167.99.143.194/register/confirm/{token}"     # <-- This link for production
    localhost = f"localhost:3000/register/confirm/{token}"       # <-- This link for development

    html = f'<h3> Witamy w serwisie YourTour </h3>' \
           f'<a href={localhost}> Link aktywacyjny  </a>'
    subject = "Akywacja konta w YourTour"
    send_email(credentials["email"], subject, html)

    return jsonify(message="Konto zostało pomyślnie utworzone. Sprawdź skrzynkę pocztową w celu aktywacji konta."), 201





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

    # Check if email was confirmed
    if user_data["is_confirmed"] == 0:
        raise APIException(msg="Konto istnieje ale nie zostało potwierdzone. Sprawdź skrzynkę pocztową.", code=403)

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



@bp.route("/confirm", methods=["POST"])
def confirm_email():
    if "token" not in request.args:
        raise APIException(msg="Brak tokenu potwierdzającego", code=422) # Not sure about that code
    token = request.args["token"]
    success, res = confirm_token(token, expiration=current_app.config["TOKEN_EXPIRATION"])
    if not success:
        raise APIException(msg=res, code=401)  # Not sure about that status code

    # Token was confirmed
    email=res
    cursor().execute(f"SELECT is_confirmed FROM users WHERE email=%s", (email, ))
    res = cursor().fetchone()
    if res is None:
        raise APIException(msg="Konto nie istnieje", code=400)
    is_confirmed = res["is_confirmed"]
    if is_confirmed == 1:
        raise APIException(msg="Konto zostało już aktywowane", code=403)  # Not sure about that status code

    cursor().execute(f"UPDATE users SET is_confirmed=1 WHERE email=%s", (email, ))
    return jsonify(msg="Konto zostało pomyślnie aktywowane", code=200)

@bp.route("/logout", methods=['POST'])
def logout():
    pass


