from unittest.mock import Mock, patch
import pytest
from iaff_back import documents


@pytest.fixture
def mock_db_cursor():
    with patch('psycopg2.connect') as mock_connect:
        mock_cursor = Mock()
        mock_connect.return_value.cursor.return_value = mock_cursor
        yield mock_cursor


def test_get_document(mock_db_cursor):
    doc = Documents()
    id = 1
    mock_db_cursor.fetchone.return_value = ('TestDocument', 'TestInfo', 'TestCategory')  # Replace with expected return value
    result = doc.getDocument(id)
    assert result == ('TestDocument', 'TestInfo', 'TestCategory')  # Replace with expected result


def test_get_categories(mock_db_cursor):
    doc = Documents()
    mock_db_cursor.fetchall.return_value = [('Category1',), ('Category2',)]  # Replace with expected return value
    result = doc.getCategories()
    assert result == [('Category1',), ('Category2',)]  # Replace with expected result


def test_get_all_by_category(mock_db_cursor):
    doc = Documents()
    category = 'TestCategory'
    mock_db_cursor.fetchall.return_value = [('Document1',), ('Document2',)]  # Replace with expected return value
    result = doc.getAllByCategory(category)
    assert result == [('Document1',), ('Document2',)]  # Replace with expected result


def test_get_all_by_name(mock_db_cursor):
    doc = Documents()
    name = 'TestName'
    mock_db_cursor.fetchall.return_value = [('Document1',), ('Document2',)]  # Replace with expected return value
    result = doc.getAllByName(name)
    assert result == [('Document1',), ('Document2',)]  # Replace with expected result


def test_add_document(mock_db_cursor):
    doc = Documents()
    # Replace with appropriate parameters for testing
    category, title, short, info, age, kids, accom = '1', 'Title', 'Short', 'Info', 30, '2', '3'
    insure, study, job, live, refugee, other = '4', '5', '6', '7', '8', '9'
    documenttype, image, links = 'Type', '10', '11'
    mock_db_cursor.execute.return_value = None  # Assuming successful execution
    result = doc.addDocument(category, title, short, info, age, kids, accom, insure, study, job, live, refugee, other, documenttype, image, links)
    assert result == True  # Replace with expected result


def test_get_recommendations(mock_db_cursor):
    doc = Documents()
    id = 1
    # Replace with appropriate parameters for testing
    age, kids, baby, teen, adult, accom = 30, 2, 0, 0, 1, 3
    insure, study, job, live, refugee, other, documenttype = 4, 5, 6, 7, 8, 9, 'Type'
    mock_db_cursor.fetchall.return_value = [('Document1', 'Info1', 50, 1, 'Category1'), ('Document2', 'Info2', 40, 2, 'Category2')]
    result = doc.getRecommendations(id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other, documenttype)
    assert result == [('Document1', 'Info1', 50, 1, 'Category1'), ('Document2', 'Info2', 40, 2, 'Category2')]  # Replace with expected result