from flask import Blueprint, request, current_app, jsonify

from API_.handlers import APIException
from API_.database.db import cursor, lastrowid

bp = Blueprint("message", __name__, url_prefix="/messages")

@bp.route("/", methods=["GET", "DELETE"])
def messages(request):
    if request.method == "POST":
        pass
    if request.method == "GET":
        pass
    if request.method == "DELETE":
        pass

