from flask import Blueprint

bp = Blueprint("new_tour", __name__, url_prefix="/tour")

@bp.route("/new_tour", methods=["POST"])
def create_new_tour():
    pass