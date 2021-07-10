from flask import Blueprint


bp = Blueprint("authentication", __name__, url_prefix="/authentication")



@bp.route('/register', methods=['POST', 'GET'])
def register():
    pass

@bp.route("/login", methods=['POST'])
def login():
    pass

@bp.route("/logout", methods=['POST'])
def logout():
    pass
