from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.handlers import APIException
from app.database.db import cursor, lastrowid

bp = Blueprint("unicast_response", __name__, url_prefix="/messages")

@bp.route("/unicast/response", methods=["POST"])
@jwt_required()
def message_response():

    response = jsonify(message="OK")
    return response, 201
