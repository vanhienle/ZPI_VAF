import pytest
from iaff_back import auth


@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(auth)
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_ab_route(client):
    response = client.get('/ab')
    assert response.status_code == 200
    assert response.json == {"key": "data"}


def test_login_route(client):
    data = {
        "email": "admin3@gmail.com",
        "password": "12345678@"
    }
    response = client.post('/users/login', json=data)
    assert response.status_code == 200
    assert 'token' in response.json


def test_signup_route(client):
    data = {
        "email": "test@example.com",
        "password": "testpassword",
        "name": "Test User"
    }
    response = client.post('/users/signup', json=data)
    assert response.status_code == 200
    assert 'token' in response.json


def test_change_password_route(client):
    data = {
        "password": "testpassword",
        "newpassword": "newtestpassword"
    }
    headers = {'token': 'valid_token_here'}
    response = client.put('/users/change_password', json=data, headers=headers)
    assert response.status_code == 200
    assert response.json == 'true'


def test_is_logged_route(client):
    headers = {'token': 'valid_token_here'}
    response = client.post('/users/is_logged', headers=headers)
    assert response.status_code == 200


def test_logout_route(client):
    headers = {'token': 'valid_token_here'}
    response = client.post('/users/logout', headers=headers)
    assert response.status_code == 200


def test_get_user_data_route(client):
    headers = {'token': 'valid_token_here'}
    response = client.post('/users/get_user_data', headers=headers)
    assert response.status_code == 200
