


def sqlParams(price=None, places=None, date=None):
    sql_params = {}
    # Price is always present
    sql_params["price_lower"] = price[0]
    sql_params["price_upper"] = price[1]

    # Handle places   <-- places will be handled in different manner than price and date
    if len(places) > 0:
        sql_params["tour_places"] = places

    # Handle date
    if date[0]: # <-- not empty string
       sql_params["date_lower"] = date[0]
    if date[1]:
        sql_params["date_upper"] = date[1]

    return sql_params