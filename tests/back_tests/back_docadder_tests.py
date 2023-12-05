from unittest.mock import Mock, patch
import pytest
from iaff_back import documents, DocumentAdder


# Mock psycopg2 connection and cursor
@pytest.fixture
def mock_db_cursor():
    with patch('psycopg2.connect') as mock_connect:
        mock_cursor = Mock()
        mock_connect.return_value.cursor.return_value = mock_cursor
        yield mock_cursor


# Mock pandas read_excel method
@pytest.fixture
def mock_pandas_read_excel():
    with patch('pandas.read_excel') as mock_read_excel:
        mock_read_excel.return_value = Mock()
        yield mock_read_excel


def test_purge_document(mock_db_cursor):
    docs = Documents()
    assert docs.purgeDocument() == True
    mock_db_cursor.execute.assert_called_once_with("""DELETE FROM documents""")


def test_add_document(mock_db_cursor):
    docs = Documents()
    category, title, short, info, age, kids, accom, insure, study, job, live, refugee, other, documenttype, image, links = (
        'category', 'title', 'short', 'info', 25, 2, 1, 0, 1, 1, 0, 0, 1, 'type', 'image', 'links'
    )
    assert docs.addDocument(category, title, short, info, age, kids, accom, insure, study, job, live, refugee, other,
                            documenttype, image, links) == True
    mock_db_cursor.execute.assert_called_once()


def test_get_all_files():
    path = 'C://Users/vano/Documents/GitHub/ZPI_VAF/iaff_assistant/documents'
    dc = DocumentAdder(path)
    files = dc.getAllFiles()
    assert isinstance(files, list)
