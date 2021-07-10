from flask import Blueprint, request, current_app
from datetime import datetime
from werkzeug.utils import secure_filename
from API.handlers import APIException
import os
import json
import uuid

bp = Blueprint("new_tour", __name__, url_prefix="/tour")

@bp.route("/new_tour", methods=["POST"])
def create_new_tour():
  pass
    
    
   