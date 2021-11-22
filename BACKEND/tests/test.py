import json
import pytest
from app import create_app

def bytesToString(item):
    return str(item, 'utf-8')

def bytesToObject(item):
    return json.loads(str(item, 'utf-8'))


'''
@pytest.fixture
def client():
    app = create_app("test_config.py")
    yield app.test_client()

'''


@pytest.fixture
def client():
    app = create_app("test_config.py")
    with app.app_context():
        with app.test_client() as client:
            yield client


# Each test function should start with "test_"
def test_default(client):
    response = client.get("/")
    print(response.data)
    print(response.json["msg"])
    assert response.json["msg"] == "Hello World"

#TODO CONTINUE HERE WRITE TESTS FOR ENDPOINTS WHERE THERE IS USER INPUT

def test_login(client):
    response = client.get("/tour/places", query_string={
        "place": "Tarnowskie"
    })
    print(response)


