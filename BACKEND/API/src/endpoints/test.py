from flask import Blueprint, jsonify, request
from .db_connection import open_conn, close_conn

# Define blueprint
test = Blueprint("test", __name__)



@test.route("/hello")
def hello():
    return{"hello": "world"}


@test.route("/test")
def test_function():
    [conn, cur] = open_conn()
    cur.execute("SELECT * FROM tour_places LIMIT 10;")
    data = cur.fetchall()

    close_conn(conn, cur)
    print(data)
    return jsonify(data), 200