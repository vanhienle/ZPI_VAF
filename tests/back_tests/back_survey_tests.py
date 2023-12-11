from iaff_back import Survey  # Import your Survey class


def test_get_survey():
    # Mock expected return data from the database
    expected_result = ('UserID1', 30, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 'docType')

    # Mocking the Survey class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.fetchone.return_value = expected_result

            # Create an instance of the Survey class
            survey_instance = Survey()

            # Test the getSurvey method
            result = survey_instance.getSurvey('UserID1')

            # Assertions
            assert result == expected_result
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()  # Check if execute method is called
            mock_cursor_instance.fetchone.assert_called_once()  # Check if fetchone method is called


def test_add_survey():
    # Mock expected return data from the database
    expected_result = ('UserID2', 25, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 'docType')

    # Mocking the Survey class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.fetchone.return_value = expected_result

            # Create an instance of the Survey class
            survey_instance = Survey()

            # Test the addSurvey method
            result = survey_instance.addSurvey('UserID2', 25, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 'docType')

            # Assertions
            assert result == expected_result
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()  # Check if execute method is called
            mock_cursor_instance.fetchone.assert_called_once()  # Check if fetchone method is called


def test_update_survey():
    # Mock expected return data from the database
    expected_result = True

    # Mocking the Survey class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.execute.return_value = expected_result

            # Create an instance of the Survey class
            survey_instance = Survey()

            # Test the updateSurvey method
            result = survey_instance.updateSurvey('UserID3', 30, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 'docType')

            # Assertions
            assert result == expected_result
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()
