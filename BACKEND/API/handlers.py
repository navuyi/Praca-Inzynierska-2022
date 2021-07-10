# Example execution below
# raise APIException(msg="Not found", code=405, payload="some payload")

class APIException(Exception):
    def __init__(self, msg="Something went wrong", code=400, payload=None):
        super().__init__()
        self.message = msg
        self.status_code = code
        self.payload = payload

    def drop_err(self):
        msg = {
            "message": self.message,
            "payload": self.payload or None
        }
        return [msg, self.status_code]
