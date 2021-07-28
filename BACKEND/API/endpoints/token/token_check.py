from flask import Blueprint
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint("token_check", __name__, url_prefix="/token")


@bp.route("/check", methods=["POST"])
@jwt_required()
def check_token():
    if ("access_token" not in request.json) and ("refresh_token" not in request.json):
        return {"msg", "Missing tokens"}, 401







    return {"msg": "OK"}, 200