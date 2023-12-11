import pytest
from fastapi import Request
from fastapi.responses import JSONResponse
from iaff_assistant import app, validation_exception_handler, get_answer, get_translated, Message, Conversation, Content
from fastapi.encoders import jsonable_encoder

# Replace 'your_module' with the actual name of the module where your functions are defined.


@pytest.fixture
async def example_conversation():
    # Example conversation fixture
    return Conversation(
        conversation=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "assistant", "content": "How can I help today?"},
            {"role": "user", "content": "What is a PESEL number?"}
        ],
        language="English"
    )


@pytest.fixture
async def example_content():
    # Example content fixture
    return Content(content="Example content", target_language="French")


@pytest.fixture
def mock_request_validation_error():
    # Mocked RequestValidationError instance
    return RequestValidationError(["error1", "error2"])


@pytest.mark.asyncio
async def test_get_answer(example_conversation):
    # Testing get_answer function
    result = await get_answer(example_conversation)
    assert result  # Add assertions based on expected results


@pytest.mark.asyncio
async def test_get_translated(example_content):
    # Testing get_translated function
    result = await get_translated(example_content)
    assert result  # Add assertions based on expected results


@pytest.mark.asyncio
async def test_exception_handler(mock_request_validation_error):
    # Testing exception_handler function
    request = Request({"scope": {}})
    response = await validation_exception_handler(request, mock_request_validation_error)
    assert response  # Add assertions based on expected results


@pytest.mark.asyncio
async def test_get_response(example_conversation):
    # Testing /assistant_service/get_response endpoint
    response = await app.test_client.post("/assistant_service/get_response", json=jsonable_encoder(example_conversation))
    assert response.status_code == 200  # Replace with expected status code
    assert response.json()  # Add assertions based on expected response


@pytest.mark.asyncio
async def test_translate(example_content):
    # Testing /assistant_service/translate endpoint
    response = await app.test_client.post("/assistant_service/translate", json=jsonable_encoder(example_content))
    assert response.status_code == 200  # Replace with expected status code
    assert response.json()  # Add assertions based on expected response


@pytest.mark.asyncio
async def test_transcribe_audio():
    # Testing /assistant_service/transcribe endpoint
    # Mocking UploadFile instance
    class MockUploadFile:
        async def read(self):
            return b"mocked audio content"

    # Replace with the appropriate language value
    lang = "en"

    file = MockUploadFile()
    response = await app.test_client.post("/assistant_service/transcribe", data={"file": file, "lang": lang})
    assert response.status_code == 200  # Replace with expected status code
    assert response.json()