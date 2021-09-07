from itsdangerous import URLSafeTimedSerializer
from flask import current_app

SALT = "activate_account"

def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
    return serializer.dumps(email, salt=SALT)


def confirm_token(token, expiration=1800):
    serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
    try:
        email = serializer.loads(
            token,
            salt=SALT,
            max_age=expiration
        )
    except:
        return False
    return email