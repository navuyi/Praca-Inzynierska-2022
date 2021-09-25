from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor, lastrowid
import json
import requests

bp = Blueprint("fill_payment", __name__, url_prefix="/payment")


@bp.route("/fill", methods=["POST"])
@jwt_required()
def fill_payment():
    user_id = get_jwt_identity()
    tour_id = request.json["tour_id"]
    enrollment_id = request.json["enrollment_id"]

    # Get amount to be paid
    cursor().execute(f"SELECT amount_paid, amount_payable FROM enrollments WHERE id=%s", (enrollment_id, ))
    data = cursor().fetchone()
    amount_paid = int(data["amount_paid"])
    amount_payable = int(data["amount_payable"])

    amount_to_fill = amount_payable - amount_paid

    ### Make request to bitpay API ###
    url = "https://test.bitpay.com/invoices"
    token = current_app.config["BITPAY_SECRET_KEY"]
    body = {
        "token": token,
        "price": amount_to_fill,
        "currency": "PLN",
        "itemDesc": "Uzupełnienie płatności wycieczki", #TODO It can be modified to tour's title
        "notificationURL": "https://figlus.pl/api/payment/bitpay",
        "redirectURL": "https://figlus.pl/payment/success",
        "closeURL": "https://figlus.pl/payment/revoked",
        "posData": json.dumps({
            "enrollment_id": enrollment_id,
            "amount_payable": amount_to_fill
        }),
        "transactionSpeed": "high",
        "fullNotifications": False
    }
    headers = {
        "Content-Type": "application/json",
        "X-Accept-Version": "2.0.0"
    }

    response = requests.post(url, body, headers)
    res = response.json()

    payload = {
        "url": res["data"]["url"]
    }

    response = jsonify(url=res["data"]["url"])
    return response, 200


