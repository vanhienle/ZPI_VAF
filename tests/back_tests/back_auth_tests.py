import unittest
from unittest.mock import patch, MagicMock
import auth
import app
import json


class TestAuthEndpoints(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def tearDown(self):
        pass

    def test_login(self):
        mock_request_data = {'email': 'admin3@gmail.com', 'password': '12345678@'}

        with patch('your_flask_app.auth.verify') as mock_verify:
            mock_verify.return_value = [1, 'hashed_password', 'name']

            response = self.app.post('/users/login', json=mock_request_data)

            self.assertEqual(response.status_code, 200)

    def test_signup_success(self):
        mock_request_data = {'email': 'testtesttesttest@test.com', 'password': 'Qwerty123456!', 'name': 'Test Test Test'}

        with patch('your_flask_app.auth.access.signup') as mock_signup:
            mock_signup.return_value = [1, 'hashed_password', 'Test User']

            response = self.app.post('/users/signup', json=mock_request_data)

            self.assertEqual(response.status_code, 200)

    def test_is_logged_with_valid_token(self):
        mock_token = 'valid_token'

        with patch('your_flask_app.auth.check_token') as mock_check_token:
            mock_check_token.return_value = 1

            response = self.app.post('/users/is_logged', headers={'token': mock_token})

            self.assertEqual(response.status_code, 200)

    def test_logout_with_invalid_token(self):
        mock_invalid_token = 'invalid_token'

        with patch('your_flask_app.auth.check_token') as mock_check_token:
            mock_check_token.return_value = None  # Mock invalid token check

            response = self.app.post('/users/logout', headers={'token': mock_invalid_token})

            self.assertEqual(response.status_code, 401)


if __name__ == '__main__':
    unittest.main()
