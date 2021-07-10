from flask import Blueprint, jsonify, request
from .db_connection import open_conn, close_conn
from datetime import datetime

import math

# Define blueprint
messages = Blueprint("messages", __name__)


@messages.route('/send_message', methods=['POST'])
def send_message():
    data = request.json

    if "tour_id" in data:
        tour_id = data["tour_id"]
        try:
           int(tour_id)
        except:
            tour_id = None
    else:
        tour_id = None
        
    topic = data["topic"]
    content = data["content"]
    sender_id = data["sender_id"]
    receiver_id = data["receiver_id"]
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    #Open database connection
    [conn, cur] = open_conn()
    statement = f"INSERT INTO messages (topic, content, sender_id, receiver_id, time, tour_id) VALUES (%s, %s, %s, %s, %s, %s);"
    insert = (topic, content, sender_id, receiver_id, time, tour_id)
    cur.execute(statement, insert)
    conn.commit()

    # Close database connection
    close_conn(conn, cur)

    
    return {"msg": "Message sent"}, 204


@messages.route('/delete_message')
def delete_message():
    return 0




@messages.route('/get_messages', methods=["POST"])
def get_messages():
    data = request.json

    return 0