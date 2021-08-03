from flask import Blueprint
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint("closed_tours", __name__, url_prefix="/guide")


@bp.route("/tours/closed", methods=["GET"])
@jwt_required()
def get_active_tours():


    return {"msg": "OK"}, 200