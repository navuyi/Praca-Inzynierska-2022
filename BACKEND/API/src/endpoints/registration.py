from flask import Blueprint, jsonify, request
from .db_connection import open_conn, close_conn
from werkzeug.security import generate_password_hash, check_password_hash


registration = Blueprint("registration", __name__)


@registration.route("/register", methods=["POST"])

def register_user():
    # Get registration data from request
    f_name = request.json.get("f_name")
    l_name = request.json.get("l_name")
    email = request.json.get("email")
    password = request.json.get("password")
    phone_number = request.json.get("phone_number")

    # Open db db_connection
    [conn, cur] = open_conn()

    # Check is user already exists
    check_statement = f" SELECT id FROM users WHERE email = %s "
    check_input = (email,)
    cur.execute(check_statement, check_input)
    result = cur.fetchall()
    
    if(len(result)>0):
        return {"msg": "User already exists"}, 409

    # Hash new user password
    password_hash = generate_password_hash(password, method="pbkdf2:sha256", salt_length=16)
    
    # Insert  new user into database
    statement = f" INSERT INTO users (f_name, l_name, email, password, phone_number) VALUES (%s, %s, %s, %s ,%s);"
    insert = (f_name, l_name, email, password_hash, phone_number)

    
    cur.execute(statement, insert)
    conn.commit()

    close_conn(conn, cur)

    return {"msg": "Account created"}, 201