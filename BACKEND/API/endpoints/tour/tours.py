from flask import Blueprint
from flask import request
from API.handlers import APIException

import json

bp = Blueprint("tours", __name__, url_prefix="/tour")



@bp.route("/tours", methods=["GET"])
def get_tours():







   return {"msg": "OK"}, 200


