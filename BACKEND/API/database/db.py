from flask import g, current_app
import mysql.connector
from mysql.connector import errorcode

def db_get():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host = current_app.config['DATABASE_HOST'],
            database = current_app.config['DATABASE_NAME'],
            user = current_app.config['DATABASE_USER'],
            password = current_app.config['DATABASE_PASSWORD'],
            charset = current_app.config['CHARSET'],
            collation = current_app.config['COLLATION'],
            autocommit = current_app.config['AUTOCOMMIT_ENABLED']
        )
    return g.db

def cursor():
    if 'cursor' not in g:
        g.cursor = db_get().cursor(dictionary=True)
    return g.cursor

def begin_transaction():
    db_get().start_transaction()

def commit():
    db_get().commit()

def rollback():
    db_get().rollback()

def lastrowid():
    return cursor().lastrowid

def db_close(e=None):
    cur = g.pop('cursor', None)
    if cur is not None:
        cur.close()

    db = g.pop('db', None)
    if db is not None:
        db.close()

def db_init_app(app):
    app.teardown_appcontext(db_close) # Tells Flask to call that function when cleaning up after returning the response

def db_before_request():
    db_get()
    cursor()
    return None
