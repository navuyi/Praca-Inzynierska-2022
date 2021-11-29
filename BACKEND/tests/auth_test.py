import json
import warnings
import random
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=PendingDeprecationWarning)

###
#   Run tests using following command: pytest test.py -s
###


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





# Each test function should start with "test_"
def test_default(client):
    response = client.get("/")
    print(response.data)
    print(response.json["msg"])
    assert response.json["msg"] == "Hello World"

#TODO CONTINUE HERE WRITE TESTS FOR ENDPOINTS WHERE THERE IS USER INPUT

def test_login(client):
    url = "/authentication/login"
    data = dict(
        email="andrewg@gmail.com",
        password="cisco123"
    )
    response = client.post(url, json=data)
    data = response.json
    print(response)

    assert data["access_token"]
    assert data["refresh_token"]
    assert response.status_code == 200



def test_token_refresh(client):
    data = dict(
        email="andrewg@gmail.com",
        password="cisco123"
    )
    # First login to obtain valid access token and refresh token
    response = client.post("/authentication/login", json=data)
    data = response.json

    assert data["refresh_token"]


    headers = dict(
        Authorization=f"Bearer {data['refresh_token']}"
    )

    response = client.get("/authentication/token/refresh", headers=headers)
    data = response.json
    print(response.json)

    assert data["access_token"]
    assert response.status_code == 200


def test_bad_email_login(client):
    url = "/authentication/login"
    data = dict(
        email="thisemaildoesnotexist",
        password="cisco123"
    )
    response = client.post(url, json=data)

    assert response.status_code == 401


def test_bad_email_password(client):
    url = "/authentication/login"
    data = dict(
        email="andrewg@gmail.com",
        password="this passowrd is 100% wrong"
    )
    response = client.post(url, json=data)

    assert response.status_code == 401

#TODO USE THIS FOR REGISTRATION TESTING
'''
I AM USING RECAPTCHA V2
For reCAPTCHA v2, use the following test keys. You will always get No CAPTCHA and all verification requests will pass.

Site key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
Secret key: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe

'''

def test_registration_success(client):
    url = "/authentication/register"
    random_letters = ['a','b','d','v','w','c','b','z','y','w','q']
    data = dict(
        f_name="FName",
        l_name="LName",
        email=f"namename_${random.choice(random_letters)}{random.choice(random_letters)}{random.choice(random_letters)}{random.choice(random_letters)}@gmail.com",
        password="cisco123",
        phone_number="123123123",
        password_repeat="cisco123",
        token="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    )
    response = client.post(url, json=data)
    assert response.status_code == 201


def test_registration_user_already_exists(client):
    url = "/authentication/register"
    data = dict(
        f_name="FName",
        l_name="LName",
        email="andrewg@gmail.com",
        password="cisco123",
        phone_number="123123123",
        password_repeat="cisco123",
        token="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    )
    response = client.post(url, json=data)
    assert response.status_code == 409
