from flask import Blueprint
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint("token_refresh", __name__, url_prefix="/token")


@bp.route("/refresh", methods=["GET"])
@jwt_required(refresh=True)
def refresh_token():
    identity = get_jwt_identity() # <-- should be user ID
    access_token = create_access_token(identity=identity)

    return jsonify(access_token=access_token)
