import pytest
from unittest.mock import AsyncMock, patch
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from TranslationAgent import translate
import asyncio
import os
import pandas as pd
import re

# Import your functions here
from your_module import preprocess_docs, ingest_doc, get_links_from_text, DOC_REPO_DIRECTORY, HF_EMBEDDINGS, \
    CHROMA_LOCAL, LANGUAGES, embeddings, vector_store


@pytest.fixture
def mock_translate():
    with patch('your_module.translate') as mock:
        mock.side_effect = lambda text, lang: f"Translated_{lang}_{text}"
        yield mock


@pytest.mark.asyncio
async def test_get_links_from_text():
    text_with_links = "This is a text with a link: https://example.com"
    text_without_links = "This is a text without any links."

    links_from_text = get_links_from_text(text_with_links)
    assert links_from_text == ["https://example.com"]

    no_links_from_text = get_links_from_text(text_without_links)
    assert no_links_from_text == "None"


@pytest.mark.asyncio
async def test_preprocess_docs(mock_translate):
    # Mocking asyncio.sleep to avoid waiting during the test
    with patch('asyncio.sleep'):
        await preprocess_docs()

    # Your assertions based on the expected behavior after the preprocessing


@pytest.mark.asyncio
async def test_ingest_doc(mock_translate):
    # Mocking pandas.read_excel method to avoid actual file reading during testing
    with patch('pandas.read_excel') as mock_read_excel:
        mock_read_excel.return_value = pd.DataFrame({
            'useful_links': ['https://example.com'],
            'info': ['Some information.']
        })

        await ingest_doc('path/to/some/file.xlsx')

        # Your assertions based on the expected behavior after ingesting the document
