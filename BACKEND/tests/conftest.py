import pytest
from app import create_app
import warnings
import test



@pytest.fixture
def client():
    app = create_app("test_config.py")
    with app.app_context():
        with app.test_client() as client:
            yield client