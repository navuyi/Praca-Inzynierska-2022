from mysql import connector
from os import environ

def open_conn():
    conn = connector.connect(user='api_operator', password=environ["FLASK_DB_PASSWORD"],
                              host='localhost',
                              database='yourtour')
    cur = conn.cursor(buffered=True, dictionary=True)
    return [conn, cur]

def close_conn(conn, cur):
    conn.close()
    cur.close()
