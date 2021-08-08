import datetime
import os
from flask import Flask, jsonify, g, request
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required
from flask_jwt_extended import JWTManager
from app.handlers import APIException
from uuid import uuid4

import werkzeug

def create_app(test_config=None):               # test_config - independent from the instance configuration
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_mapping(
        SECRET_KEY = uuid4()
    )
    # Load configuration file
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Importing test config if it was provided to create_app()
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError as e:
        print(e)

    ### Flask JWT configuration ###
    app.config["JWT_SECRET_KEY"] = str("skenhgu37291nsufbs!@#%$sd1@3jfi2$2") # <-- NEEDS TO BE STRING, earlier it was uuid4() - was causing tokens invalid after service restart
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(minutes=30)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = datetime.timedelta(days=30)
    jwt = JWTManager(app)

    ### Error handler ###
    @app.errorhandler(APIException)
    def invalid_api_usage(e):
        [msg, code] = e.drop_err()
        return jsonify(msg), code

    @app.errorhandler(werkzeug.exceptions.RequestEntityTooLarge)
    def handle_entity_too_large(e):
        return {"message": "Załączony plik jest za duży"}, 413

    ### CORS setup ###
    cors = CORS(app, resources={r"/*": {"origins": app.config["ORIGINS"]}}, supports_credentials=True)

    '''
    ### Swagger Setup ###
    SWAGGER_URL = '/swagger'
    API_URL = '/static/swagger.yaml'
    SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            'app_name': "YourTour REST API"
        }
    )
    app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
    '''


    # Import database methods
    from . database.db import db_init_app, db_before_request

    # Initialize database db_connection
    db_init_app(app)

    @app.route('/', methods=['GET'])
    @jwt_required()
    def index_get():
        return jsonify({"msg": "Hello World"}), 200
    from app.endpoints.authentication import bp as bp_authentication
    from app.endpoints.tour.new_tour import bp as bp_new_tour

    # Import blueprints
    from app.endpoints.tour.tags import bp as bp_tags
    from app.endpoints.tour.tour_places import bp as bp_tour_places
    from app.endpoints.tour.places import bp as bp_places
    from app.endpoints.tour.tour_tags import bp as bp_tour_tags
    from app.endpoints.tour.tours import bp as bp_tour_tours
    from app.endpoints.tour.tour import bp as bp_tour_tour
    from app.endpoints.download.image import bp as bp_image_dl

    from app.endpoints.authentication import bp as bp_auth
    from app.endpoints.token.token_check import bp as bp_token_check
    from app.endpoints.token.token_refresh import bp as bp_token_refresh

    from app.endpoints.guide.active_tours import bp as bp_active_tours
    from app.endpoints.guide.closed_tours import bp as bp_closed_tours

    from app.endpoints.messages.message_unicast_new import bp as bp_unicast_new


    # Register blueprints
    app.register_blueprint(bp_authentication)
    app.register_blueprint(bp_new_tour)
    app.register_blueprint(bp_places)
    app.register_blueprint(bp_tags)
    app.register_blueprint(bp_tour_places)
    app.register_blueprint(bp_tour_tags)
    app.register_blueprint(bp_tour_tours)
    app.register_blueprint(bp_image_dl)
    app.register_blueprint(bp_tour_tour)

    app.register_blueprint(bp_auth)
    app.register_blueprint(bp_token_refresh)
    app.register_blueprint(bp_token_check)

    app.register_blueprint(bp_active_tours)
    app.register_blueprint(bp_closed_tours)

    app.register_blueprint(bp_unicast_new)


    return app