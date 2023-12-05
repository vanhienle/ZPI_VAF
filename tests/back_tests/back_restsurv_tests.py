from unittest.mock import patch
from iaff_back import surv  # Import your survey Blueprint


def test_filled_survey():
    # Mock expected return data from the database
    expected_result = ('UserID123', 25, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 'Type1')

    # Mocking the check_token function
    with patch('your_module.check_token') as mock_check_token:
        mock_check_token.return_value = 'UserID123'  # Assuming a valid user ID is returned

        # Mocking the getSurvey method in the Survey class
        with patch('your_module.Survey.getSurvey') as mock_get_survey:
            mock_get_survey.return_value = expected_result

            # Test the filled_survey endpoint
            response = surv.test_client().post('/survey/is_filled_survey', headers={'token': 'mocked_token'})

            # Assertions
            assert response.status_code == 200
            assert response.json == "true"
            mock_check_token.assert_called_once()  # Check if check_token is called
            mock_get_survey.assert_called_once()  # Check if getSurvey is called


def test_get_user_survey():
    # Mock expected return data from the database
    expected_result = ('UserID123', 25, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 'Type1')

    # Mocking the check_token function
    with patch('your_module.check_token') as mock_check_token:
        mock_check_token.return_value = 'UserID123'  # Assuming a valid user ID is returned

        # Mocking the get_survey function
        with patch('your_module.get_survey') as mock_get_survey:
            mock_get_survey.return_value = expected_result

            # Test the get_user_survey endpoint
            response = surv.test_client().post('/survey/get_survey', headers={'token': 'mocked_token'})

            # Assertions
            assert response.status_code == 200
            assert response.json == {
                "age": 25, "kids": 1, "baby": 0, "teen": 1, "adult": 0,
                "accom": 1, "insure": 0, "study": 0, "job": 1, "live": 1,
                "refugee": 0, "documenttype": "Type1", "other": 0
            }
            mock_check_token.assert_called_once()  # Check if check_token is called
            mock_get_survey.assert_called_once()  # Check if get_survey is called


def test_add_survey():
    # Mock expected return data from the database
    expected_result = True  # Assuming survey added successfully

    # Mocking the check_token function
    with patch('your_module.check_token') as mock_check_token:
        mock_check_token.return_value = 'UserID123'  # Assuming a valid user ID is returned

        # Mocking the request data
        request_data = {
            'age': 25, 'kids': 1, 'baby': 0, 'teen': 1, 'adult': 0,
            'accom': 1, 'insure': 0, 'study': 0, 'job': 1, 'live': 1,
            'refugee': 0, 'documenttype': 'Type1', 'other': 0
        }

        # Test the add_survey endpoint
        response = surv.test_client().post('/survey/add_survey', headers={'token': 'mocked_token'}, json=request_data)

        # Assertions
        assert response.status_code == 200
        assert response.json == "true"
        mock_check_token.assert_called_once()  # Check if check_token is called


def test_update_survey():
    # Mock expected return data from the database
    expected_result = True  # Assuming survey updated successfully

    # Mocking the check_token function
    with patch('your_module.check_token') as mock_check_token:
        mock_check_token.return_value = 'UserID123'  # Assuming a valid user ID is returned

        # Mocking the request data
        request_data = {
            'age': 25, 'kids': 1, 'baby': 0, 'teen': 1, 'adult': 0,
            'accom': 1, 'insure': 0, 'study': 0, 'job': 1, 'live': 1,
            'refugee': 0, 'documenttype': 'Type1', 'other': 0
        }

        # Test the update_survey endpoint
        response = surv.test_client().put('/survey/update_survey', headers={'token': 'mocked_token'}, json=request_data)

        # Assertions
        assert response.status_code == 200
        assert response.json == "true"
        mock_check_token.assert_called_once()
