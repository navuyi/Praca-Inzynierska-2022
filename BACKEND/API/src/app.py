from flask import Flask
from flask import jsonify, request
from flask import Blueprint
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint

from os import environ


# Load blueprints
from endpoints.test import test
from endpoints.authentication import authentication
from endpoints.registration import registration
from endpoints.messages import messages
from endpoints.get_places import get_places
from endpoints.create_tour import create_tour

# Initialize flask app
app = Flask(__name__)
config = {
    "ORIGINS":[
        "http://167.99.143.194",
        "http://localhost:3000"
    ]
}
cors = CORS(app, resources={r"/*": {"origins": config["ORIGINS"]}}, supports_credentials=True)
# Above configuration allows making requests from React SPA from development and production entities
# localhost and website hosted on remote (Apache server), allows credentials

# Register blueprints
app.register_blueprint(test)
app.register_blueprint(authentication)
app.register_blueprint(registration)
app.register_blueprint(messages)
app.register_blueprint(get_places)
app.register_blueprint(create_tour)



### Swagger Setup ###
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "YourTour REST API"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)








