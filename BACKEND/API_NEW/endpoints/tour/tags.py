from flask import Blueprint

bp = Blueprint("tags", __name__, url_prefix="/tour")

@bp.route("/tags", methods=["GET"])
def get_tags():
    pass