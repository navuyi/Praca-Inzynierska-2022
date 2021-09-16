from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor, lastrowid
import requests
import json

bp = Blueprint("handle_payment", __name__, url_prefix="/payment")


@bp.route("/bitpay", methods=["POST"])
def bitpay():
    data = request.json["data"]

    if data["status"] == "confirmed":
        posData = data["posData"]
        invoiceId = data["id"]
        url = data["url"]

        # Make confirmation request
        response = requests.get("https://test.bitpay.com/invoices/"+str(invoiceId))
        res = response.json()
        data = res["data"]
        print(data)


        # Checking if payment is confirmed
        if data["status"] == "confirmed" or data["status"] == "complete":
            price = data["price"]
            posData = json.loads(data["posData"])
            enrollment_id = posData["enrollment_id"]
            cursor().execute(f"UPDATE enrollments SET amount_paid=%s WHERE id=%s", (price, enrollment_id))

            return {}, 200
    else:
        # Nothing to handle if not confirmed
        return jsonify("Was not confirmed"), 200