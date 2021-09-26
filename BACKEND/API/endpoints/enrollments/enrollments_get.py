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
    guide_id = get_jwt_identity()

    cursor().execute(f"SELECT id, f_name, l_name, email, phone_number, tickets, user_id, creation_date, amount_paid, amount_payable FROM enrollments WHERE tour_id=%s", (tour_id, ))
    enrollments = cursor().fetchall()



    for enrollment in enrollments:
        # Get enrollment participants
        cursor().execute(f"SELECT full_name FROM enrollment_participants WHERE enrollment_id=%s", (enrollment["id"], ))
        participants = cursor().fetchall()
        enrollment["participants"] = []
        for prt in participants:
            enrollment["participants"].append(prt["full_name"])

        # Get conversation
        if enrollment['user_id'] is not None:
            statement = f"SELECT id, topic FROM message_threads WHERE ( tour_id=%s AND sender_id=%s AND receiver_id=%s) OR (tour_id=%s AND sender_id=%s AND receiver_id=%s)"
            cursor().execute(statement, (tour_id, guide_id, enrollment["user_id"], tour_id, enrollment["user_id"], guide_id))
            res = cursor().fetchall()
            enrollment["message_threads"] = res

        # Format date
        enrollment["creation_date"] = enrollment["creation_date"].strftime("%d.%m.%Y")

        # Enrollment payment status
        if enrollment["amount_paid"] == 0:
            enrollment["payment_status"] = "Oczekuje na wpłatę"
        elif enrollment["amount_paid"] > 0 and enrollment["amount_paid"] < enrollment["amount_payable"]:
            enrollment["payment_status"] = "Częściowa zapłata"
        elif enrollment["amount_paid"] == enrollment["amount_payable"]:
            enrollment["payment_status"] = "Zapłacono"

    response = jsonify(enrollments)
    return response, 200