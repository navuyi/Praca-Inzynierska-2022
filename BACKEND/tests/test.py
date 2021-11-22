import json

try:
    from app import create_app
    from app.database import db
    import unittest

    app = create_app("test_config.py")
    print("Hello world")




    class SignupTest(unittest.TestCase):
        def setUp(self):
            self.app = app.test_client()
            self.db = db.get_db()

        def test_successful_signup(self):
            payload = json.dumps({
                "email": "andrewg@gmail.com",
                "password": "cisco123"
            })

            response = self.app.post("/api/authentication/login", headers={"Content-Type": "application/json"}, data=payload)

            self.assertEqual(str, type(response.json['id']))
            self.assertEqual(200, response.status_code)


        def tearDown(self):
            # Delete Database collections after the test is complete
            for collection in self.db.list_collection_names():
                self.db.drop_collection(collection)

except Exception as e:
    print(e)


