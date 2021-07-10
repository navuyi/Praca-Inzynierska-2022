from flask import Blueprint

bp = Blueprint("tour_places", __name__, url_prefix="/tour")

@bp.route("/tour_places", methods=["GET"])
def get_tour_places():
    pass