import math
from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor, lastrowid
from datetime import datetime

bp = Blueprint("get_user_payments_history", __name__, url_prefix="/user")

@bp.route("/payments/history", methods=["GET"])
@jwt_required()
def get_user_payments_history():
    user_id = get_jwt_identity()
    page = int(request.args["page"])
    sort = request.args["sort"]

    LIMIT = 5
    OFFSET = (page-1)*LIMIT

    if sort == "oldest":
        ORDER = "created"
    elif sort == "most_recent":
        ORDER = "created DESC"

    statement = f"SELECT SQL_CALC_FOUND_ROWS pm.id as payment_id, pm.enrollment_id, pm.amount_paid, pm.created, tr.header as tour_header, tr.id as tour_id FROM payments pm, enrollments en, tours tr WHERE " \
                f"en.id = pm.enrollment_id AND tr.id=en.tour_id " \
                f"AND en.user_id=%(user_id)s  ORDER BY {ORDER} LIMIT {LIMIT} OFFSET {OFFSET} "
    insert = {
        "user_id": user_id
    }
    cursor().execute(statement, insert)
    payments = cursor().fetchall()

    cursor().execute(f"SELECT FOUND_ROWS() as total_rows")
    total_rows = cursor().fetchone()["total_rows"]
    total_pages = math.ceil(total_rows/LIMIT)

    for payment in payments:
        payment["created"] = datetime.strftime(payment["created"], "%d.%m.%Y")

    response = jsonify(payments=payments, total_pages=total_pages)
    return response, 200


