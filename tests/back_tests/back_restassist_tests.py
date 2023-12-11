from unittest.mock import Mock, patch
import pytest
from iaff_back import RestAssistant  # Replace 'your_module' with the module where your Blueprint is defined


@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(assist)
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_get_answer(client):
    with patch('requests.post') as mock_post:
        mock_post.return_value.json.return_value = {'answer': 'This is a test answer.'}
        headers = {'token': 'valid_token_here'}  # Replace with a valid token for testing
        data = b'This is a test question.'  # Replace with test data
        response = client.post('/assistant/get_response', headers=headers, data=data)
        assert response.status_code == 200
        assert response.json == {'answer': 'This is a test answer.'}


def test_translate(client):
    with patch('requests.post') as mock_post:
        mock_post.return_value.json.return_value = {'translation': 'Translated text.'}
        headers = {'token': 'valid_token_here'}  # Replace with a valid token for testing
        data = b'Test text to translate.'  # Replace with test data
        response = client.post('/assistant/translate', headers=headers, data=data)
        assert response.status_code == 200
        assert response.json == {'translation': 'Translated text.'}


