from flask import Blueprint
from flask import request
from flask import jsonify
from app.database.db import db_get, cursor, begin_transaction, commit, rollback, lastrowid


bp = Blueprint("places", __name__, url_prefix="/tour")

@bp.route("/places", methods=["GET"])

def get_places():
    args = request.args
    place = args["place"]
    if not place:
        return {"msg": "no input"}, 400

    limit = 10
    # Open databse connection
    statement = """SELECT id, place FROM tour_places WHERE place LIKE %(place)s ORDER BY place LIMIT %(limit)s;"""
    insert = {
        "place": "%"+place+"%",
        "limit": limit
    }
    cursor().execute(statement, insert)
    result = cursor().fetchall()
    commit()
    print(result)

    
    return jsonify(result), 200