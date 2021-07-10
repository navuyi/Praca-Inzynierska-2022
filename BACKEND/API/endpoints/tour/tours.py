from flask import Blueprint
from API.handlers import APIException

bp = Blueprint("tours", __name__, url_prefix="/tour")



@bp.route("/tours", methods=["GET"])
def get_tours():
    pass


