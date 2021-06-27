from flask import Blueprint, jsonify, request
from .db_connection import open_conn, close_conn

get_places = Blueprint("get_places", __name__)

@get_places.route("/get_places_by_input", methods=["POST"])
def get_places_by_input():
    place_input = request.json.get("place_input")
    limit = 10

    # Open databse connection
    [conn, cur] = open_conn()
    statement = f'SELECT id, place FROM tour_places WHERE place LIKE "{place_input}%" ORDER BY place LIMIT {limit};'
    cur.execute(statement)
    result = cur.fetchall()

    print(result)
    close_conn(conn, cur)
    return jsonify(result), 200