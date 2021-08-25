from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor, lastrowid


bp = Blueprint("get_enrollments", __name__, url_prefix="/enrollments")


@bp.route("/enrollment", methods=["GET"])
@jwt_required()
def get_enrollments():
    tour_id = request.args["tour_id"]

    cursor().execute(f"SELECT id, f_name, l_name, email, phone_number, tickets, user_id FROM enrollments WHERE tour_id=%s ", (tour_id, ))
    enrollments = cursor().fetchall()



    for enrollment in enrollments:
        # Get enrollment participants
        cursor().execute(f"SELECT full_name FROM enrollment_participants WHERE enrollment_id=%s", (enrollment["id"], ))
        participants = cursor().fetchall()
        enrollment["participants"] = []
        for prt in participants:
            enrollment["participants"].append(prt["full_name"])





    response = jsonify(enrollments)
    return response, 200