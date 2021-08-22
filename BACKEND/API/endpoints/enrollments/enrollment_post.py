from flask import Blueprint, current_app
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity, jwt_required
from flask import request, jsonify
from app.handlers import APIException
from app.database.db import cursor


bp = Blueprint("new_enrollment", __name__, url_prefix="/enrollments")


@bp.route("/enrollment", methods=["POST"])
@jwt_required(optional=True)
def create_new_enrollment():
    body = request.json
    user_id = get_jwt_identity()

    ### TODO TEST THE CHECKERS BELOW AFTER CONNECTING IT TO FRONTEND ###
    # Check if tour enrollment process is active
    cursor().execute(f"SELECT * FROM tours WHERE id=%s AND NOW() < enrollment_deadline", (body["tour_id"], ))
    res = cursor().fetchall()
    if not res:
        raise APIException(msg="Okres zapisów tej wycieczki zakończył się", code=400)
    tour_data = res[0]

    # Check if tour has available number of places
    cursor().execute(f"SELECT sum(tickets) FROM enrollments WHERE tour_id=%s", (body["tour_id"], ))
    current_tickets = cursor().fetchone()["sum(tickets)"]
    person_limit = tour_data["person_limit"]
    if current_tickets and current_tickets >= person_limit: # <-- checking if there are any available tickets
        raise APIException(msg="Ilość miejsc w ofercie została wyczerpana", code=400)

    # Check if user's amount of tickets will exceed the person limit
    if current_tickets and current_tickets+body["tickets"] > person_limit:
        raise  APIException(msg=f"W ofercie pozostało tylko {person_limit-cursor} miejsc", code=400)



    # Create new enrollment
    columns = f"f_name, l_name, phone_number, email, tickets, user_id, tour_id, city, postcode, street, house_number, apartment_number, comment"
    insert = {
        "f_name": body["f_name"],
        "l_name": body["l_name"],
        "phone_number": body["phone_number"],
        "email": body["email"],
        "tickets": body["tickets"],
        "user_id": user_id if user_id else None,
        "tour_id": body["tour_id"],
        "city": body["city"],
        "postcode": body["postcode"],
        "street": body["street"],
        "house_number": body["house_number"],
        "apartment_number": body["apartment_number"],
        "comment": body["comment"]
    }
    cursor().execute(f"INSERT INTO enrollments ({columns}) VALUES (%(f_name)s, %(l_name)s, %(phone_number)s, %(email)s, %(tickets)s, %(user_id)s, %(tour_id)s, %(city)s, %(postcode)s, %(street)s, %(house_number)s, %(apartment_number)s, %(comment)s )", insert)



    response = jsonify(msg="OK")
    return response, 200