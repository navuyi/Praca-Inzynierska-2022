from flask import Blueprint

bp = Blueprint("tour_tags", __name__, url_prefix="/tour")

@bp.route("/tour_tags", methods=["GET"])
def get_tour_tags():
    pass