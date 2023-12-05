from iaff_back import Access  # Import your Access class


def test_get_user():
    # Mock expected return data from the database
    expected_result = ('UserID1', 'user@example.com', 'password123', 'John Doe')

    # Mocking the Access class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.fetchone.return_value = expected_result

            # Create an instance of the Access class
            access_instance = Access()

            # Test the getUser method
            result = access_instance.getUser('user@example.com', 'password123')

            # Assertions
            assert result == expected_result
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()  # Check if execute method is called
            mock_cursor_instance.fetchone.assert_called_once()  # Check if fetchone method is called


def test_get_user_from_id():
    # Mock expected return data from the database
    expected_result = ('UserID2', 'user@example.com', 'password123', 'John Doe')

    # Mocking the Access class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.fetchone.return_value = expected_result

            # Create an instance of the Access class
            access_instance = Access()

            # Test the getUserFromID method
            result = access_instance.getUserFromID('UserID2')

            # Assertions
            assert result == expected_result
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()  # Check if execute method is called
            mock_cursor_instance.fetchone.assert_called_once()


def test_get_user_name():
    # Mock expected return data from the database
    expected_result = ('John Doe',)

    # Mocking the Access class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.fetchone.return_value = expected_result

            # Create an instance of the Access class
            access_instance = Access()

            # Test the getUserName method
            result = access_instance.getUserName('user@example.com')

            # Assertions
            assert result == expected_result
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()  # Check if execute method is called
            mock_cursor_instance.fetchone.assert_called_once()  # Check if fetchone method is called


def test_get_from_user():
    # Mock expected return data from the database
    expected_result = ('UserID3', 'password123')

    # Mocking the Access class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.fetchone.return_value = expected_result

            # Create an instance of the Access class
            access_instance = Access()

            # Test the getFromUser method
            result = access_instance.getFromUser('user@example.com')

            # Assertions
            assert result == expected_result
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()  # Check if execute method is called
            mock_cursor_instance.fetchone.assert_called_once()  # Check if fetchone method is called


def test_delete_user():
    # Mock expected return data from the database
    expected_result = None  # Assuming the delete method doesn't return data

    # Mocking the Access class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.fetchone.return_value = expected_result

            # Create an instance of the Access class
            access_instance = Access()

            # Test the deleteUser method
            result = access_instance.deleteUser('user@example.com')

            # Assertions
            assert result == expected_result
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()  # Check if execute method is called
            mock_cursor_instance.fetchone.assert_called_once()


def test_update_user_password():
    # Mock expected return data from the database
    expected_result = None  # Assuming the update method doesn't return data

    # Mocking the Access class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.fetchone.return_value = expected_result

            # Create an instance of the Access class
            access_instance = Access()

            # Test the updateUserPassword method
            access_instance.updateUserPassword('UserID123', 'new_password123')

            # Assertions
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()  # Check if execute method is called
            mock_cursor_instance.fetchone.assert_called_once()  # Check if fetchone method is called


def test_update_user_account():
    # Mock expected return data from the database
    expected_result = None  # Assuming the update method doesn't return data

    # Mocking the Access class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.fetchone.return_value = expected_result

            # Create an instance of the Access class
            access_instance = Access()

            # Test the updateUserAccount method
            access_instance.updateUserAccount('user@example.com', 'New User', 'UserID123')

            # Assertions
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()  # Check if execute method is called
            mock_cursor_instance.fetchone.assert_called_once()  # Check if fetchone method is called


def test_new_id():
    # Mock expected return data from the database
    expected_result = 5  # Mocking the last ID in the database

    # Mocking the Access class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.fetchone.return_value = (expected_result,)

            # Create an instance of the Access class
            access_instance = Access()

            # Test the new_id method
            result = access_instance.new_id()

            # Assertions
            assert result == expected_result
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()  # Check if execute method is called
            mock_cursor_instance.fetchone.assert_called_once()  # Check if fetchone method is called


def test_signup():
    # Mock expected return data from the database
    expected_result = ('UserID123', 'user@example.com', 'password123', 'User Name')

    # Mocking the Access class
    with patch('your_module.psycopg2.connect') as mock_connect:
        with patch.object(mock_connect.return_value, 'cursor') as mock_cursor:
            mock_cursor_instance = mock_cursor.return_value
            mock_cursor_instance.fetchone.return_value = expected_result

            # Create an instance of the Access class
            access_instance = Access()

            # Test the signup method
            result = access_instance.signup('user@example.com', 'password123', 'User Name')

            # Assertions
            assert result == expected_result
            mock_connect.assert_called_once()  # Check if psycopg2.connect is called
            mock_cursor.assert_called_once()  # Check if cursor() method is called
            mock_cursor_instance.execute.assert_called_once()  # Check if execute method is called
            mock_cursor_instance.fetchone.assert_called_once()