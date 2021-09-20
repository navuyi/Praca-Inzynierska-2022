from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor, lastrowid


bp = Blueprint("get_user_enrollments", __name__, url_prefix="/user")

@bp.route("/enrollments", methods=["GET"])
@jwt_required()
def get_user_enrollments():
    user_id = get_jwt_identity()

    ### Get user enrollments ###
    cursor().execute("SELECT tours.id as tour_id ,enrollments.amount_payable, enrollments.amount_paid, tours.header, tours.start_date, tours.end_date, users.f_name as guide_f_name, users.l_name as guide_l_name from tours, enrollments, users, enrollment_participants WHERE "
                     "enrollment_participants.enrollment_id = enrollments.id AND users.is_guide=1 AND users.id = tours.guide_id AND enrollments.tour_id = tours.id AND enrollments.user_id = %s", (user_id, ))

    enrollments = cursor().fetchall()
    for enrollment in enrollments:
        # Define payment status and remaining amount to be paid
        if enrollment["amount_paid"] == 0:
            enrollment["payment_status"] = "awaiting"        # No payment was done
            enrollment["amount_remaining"] = enrollment["amount_payable"]
        elif 0 < enrollment["amount_paid"] < enrollment["amount_payable"]:
            enrollment["payment_status"] = "partial"           # Partial payment was done
            enrollment["amount_remaining"] = int(enrollment["amount_payable"]) - int(enrollment["amount_paid"])
        elif enrollment["amount_paid"] == enrollment["amount_payable"]:
            enrollment["payment_status"] = "complete"       # Full amount was paid
            enrollment["amount_remaining"] = 0

        # Reconfigure dates
        enrollment["start_date"] = enrollment["start_date"].strftime("%d.%m.%Y")
        enrollment["end_date"] = enrollment["end_date"].strftime("%d.%m.%Y")



    response = jsonify(enrollments)
    return response, 200


