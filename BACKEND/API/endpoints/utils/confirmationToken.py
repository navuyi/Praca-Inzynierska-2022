import itsdangerous.exc
from itsdangerous import URLSafeTimedSerializer
from flask import current_app

SALT = "activate_account"

def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
    return serializer.dumps(email, salt=SALT)


def read_email(token, expiration):
    serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
    email = serializer.loads(
        token,
        salt=SALT,
        max_age=expiration
    )
    return email


def confirm_token(token, expiration):
    try:
        email = read_email(token, expiration)
    except itsdangerous.exc.SignatureExpired:
        email = read_email(token, expiration+2000)
        return False, "Token stracił ważność. Zarejestruj się ponownie.", email
    except itsdangerous.exc.BadTimeSignature:
        email = read_email(token, expiration+2000)
        return False, "Token stracił ważność. Zarejestruj się ponownie.", email
    except itsdangerous.exc.BadSignature:
        return False, "Token jest nieprawidłowy", email


    return True, email, email

