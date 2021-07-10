from flask import Blueprint, jsonify, request
from .db_connection import open_conn, close_conn
from werkzeug.security import check_password_hash

# Define blueprint
authentication = Blueprint("authentication", __name__)



@authentication.route("/authenticate", methods=["POST"])
def authenticate():
    data = request.json
    email = data['email']
    password = data['password']

    [conn, cur] = open_conn()

    # Fetch user password hash from database
    hash_statement = f""" SELECT password, is_confirmed, id FROM users WHERE email = "{email}" """
    cur.execute(hash_statement)
    result = cur.fetchone() # fetch only one row, there should be no more rows than one - unique email
    ### note that if there are no matches and (fetchone() is used) in databse then result will be None not empty array 

    # Return if there is no user with such email address
    if(result is None):
        return {"msg": "Account not found"}, 401
    elif(len(result) == 0):
        return {"msg": "Account not found"}, 401

    print(result)
    password_hash = result["password"]
    is_confirmed = result["is_confirmed"]
    
    is_password_correct = check_password_hash(password_hash, password)
    # Close db connection
    close_conn(conn, cur)



    # Return negative if password was wrong
    if(is_password_correct == False):
        return {"msg": "Wrong password"}, 403
    # Return negative if password is correct but account has not been confirmed yet
    elif(is_password_correct == True and is_confirmed == 0):
        return {"msg": "Account has not been confirmed. Check your email"}, 403
    # Return positive if password is correct and account is confirmed
    elif(is_password_correct == True and is_confirmed == 1):
        # TO DO #
        # JW Tokens or Cookie will be returned 
        return {"msg": "Authentication successful"}, 200

    
    

    
    