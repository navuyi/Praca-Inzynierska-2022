from flask import Blueprint
from flask import request
from API.handlers import APIException

import json

bp = Blueprint("tour", __name__, url_prefix="/tour")



@bp.route("/tour", methods=["GET"])
def get_tour():
    pass

