from flask import Blueprint
from flask import request
from API.handlers import APIException
from API.endpoints.utils.defineSQLParams import sqlParams

import json

bp = Blueprint("tours", __name__, url_prefix="/tour")



@bp.route("/tours", methods=["GET"])
def get_tours():
   args = request.args

   filter_price = args.getlist("tour_price[]")
   filter_places = args.getlist("tour_places[]")
   filter_date = args.getlist("tour_date[]")

   ### Define sql_params ###
   sql_params= {}

   # Tour price is always provided
   sql_params["price_lower"] = filter_price[0]
   sql_params["price_upper"] = filter_price[1]

   sqlParams()


   return {"msg": "OK"}, 200


