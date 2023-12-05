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
    # Replace with your login test scenario
    data = {
        "email": "test@example.com",
        "password": "testpassword"
    }
    response = client.post('/users/login', json=data)
    assert response.status_code == 200
    assert 'token' in response.json


def test_signup_route(client):
    # Replace with your signup test scenario
    data = {
        "email": "test@example.com",
        "password": "testpassword",
        "name": "Test User"
    }
    response = client.post('/users/signup', json=data)
    assert response.status_code == 200
    assert 'token' in response.json


def test_change_password_route(client):
    # Replace with your change password test scenario
    data = {
        "password": "testpassword",
        "newpassword": "newtestpassword"
    }
    headers = {'token': 'valid_token_here'}
    response = client.put('/users/change_password', json=data, headers=headers)
    assert response.status_code == 200
    assert response.json == 'true'


def test_change_account_route(client):
    # Replace with your change account test scenario
    data = {
        "email": "newemail@example.com",
        "name": "New Name",
        "password": "currentpassword"
    }
    headers = {'token': 'valid_token_here'}
    response = client.put('/users/change_account', json=data, headers=headers)
    assert response.status_code == 200
    assert response.json == 'true'


def test_is_logged_route(client):
    # Test for checking authorization of a token
    headers = {'token': 'valid_token_here'}
    response = client.post('/users/is_logged', headers=headers)
    assert response.status_code == 200  # Change the expected status code based on your logic


def test_logout_route(client):
    # Test for user logout
    headers = {'token': 'valid_token_here'}
    response = client.post('/users/logout', headers=headers)
    assert response.status_code == 200  # Change the expected status code based on your logic


def test_get_user_data_route(client):
    # Test for getting user data with a token
    headers = {'token': 'valid_token_here'}
    response = client.post('/users/get_user_data', headers=headers)
    assert response.status_code == 200  # Change the expected status code based on your logic
