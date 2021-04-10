from flask import Flask
from flask import jsonify, request
from flask import Blueprint

from flask_swagger_ui import get_swaggerui_blueprint

from os import environ


# Load blueprints
from endpoints.test import test
from endpoints.authentication import authentication
from endpoints.registration import registration

# Initialize flask app
app = Flask(__name__)



# Register blueprints
app.register_blueprint(test)
app.register_blueprint(authentication)
app.register_blueprint(registration)



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








