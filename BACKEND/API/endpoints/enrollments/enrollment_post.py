import json

from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor, lastrowid
import requests

bp = Blueprint("new_enrollment", __name__, url_prefix="/enrollments")


@bp.route("/enrollment", methods=["POST"])
@jwt_required(optional=True)
def create_new_enrollment():
    body = request.json
    user_id = get_jwt_identity()

    # Check if user is already signed to that tour
    if user_id:
        cursor().execute(f"SELECT id FROM enrollments WHERE tour_id=%s AND user_id=%s", (body["tour_id"], user_id))
        res = cursor().fetchall()
        if res:
            raise APIException(msg="Ta wycieczka została już przez Ciebie wykupiona", code=400)


    # Check if tour enrollment process is active
    cursor().execute(f"SELECT * FROM tours WHERE id=%s AND NOW() < enrollment_deadline", (body["tour_id"], ))
    res = cursor().fetchall()
    if not res:
        raise APIException(msg="Okres zapisów tej wycieczki zakończył się", code=400)
    tour_data = res[0]

    # Check if tour has available number of places
    cursor().execute(f"SELECT sum(tickets) FROM enrollments WHERE tour_id=%s", (body["tour_id"], ))
    current_tickets = cursor().fetchone()["sum(tickets)"]
    if current_tickets is None:
        current_tickets = 0
    person_limit = tour_data["person_limit"]
    if current_tickets >= person_limit:  # <-- checking if there are any available tickets
        raise APIException(msg="Ilość miejsc w ofercie została wyczerpana", code=400)

    # Check if user's amount of tickets will exceed the person limit
    if current_tickets+len(body["participants"]) > person_limit:
        raise  APIException(msg=f"W ofercie pozostało tylko {person_limit-current_tickets} miejsc", code=400)



    # Create new enrollment
    columns = f"f_name, l_name, phone_number, email, user_id, tour_id, city, postcode, street, house_number, apartment_number, comment, amount_payable"
    insert = {
        "f_name": body["f_name"],
        "l_name": body["l_name"],
        "phone_number": body["phone_number"],
        "email": body["email"],
        "user_id": user_id if user_id else None,
        "tour_id": body["tour_id"],
        "city": body["city"],
        "postcode": body["postcode"],
        "street": body["street"],
        "house_number": body["house_number"],
        "apartment_number": body["apartment_number"],
        "comment": body["comment"],
        "amount_payable": body["amount_payable"]
    }
    cursor().execute(f"INSERT INTO enrollments ({columns}) VALUES (%(f_name)s, %(l_name)s, %(phone_number)s, %(email)s, %(user_id)s, %(tour_id)s, %(city)s, %(postcode)s, %(street)s, %(house_number)s, %(apartment_number)s, %(comment)s, %(amount_payable)s)", insert)
    enrollment_id = lastrowid()

    # Add participants to enrollment_participants table
    for full_name in body["participants"]:
        cursor().execute(f"INSERT INTO enrollment_participants (enrollment_id, full_name) VALUES (%s, %s)", (enrollment_id, full_name))



    ### Make request to bitpay API ###
    url = "https://test.bitpay.com/invoices"
    token = current_app.config["BITPAY_SECRET_KEY"]
    body = {
        "token": token,
        "price": 10,        # TODO change it to body["amount_payable"], low value for now, for testing
        "currency": "PLN",
        "itemDesc": "Zakup wycieczki", #TODO It can be modified to tour's title
        "notificationURL": "https://figlus.pl/api/payment/bitpay",
        "redirectURL": "https://figlus.pl/payment/success",
        "closeURL": "https://figlus.pl/payment/revoked",
        "posData": json.dumps({
            "enrollment_id": enrollment_id,
            "amount_payable": body["amount_payable"]
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

    response = jsonify(msg=f"Zapis przebiegł pomyslnie + {current_tickets} ", payload=payload)
    return response, 200