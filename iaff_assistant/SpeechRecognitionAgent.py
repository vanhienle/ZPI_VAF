import openai
from dotenv import load_dotenv
import os
import aiohttp
import io
from aiohttp import FormData

load_dotenv()

openai.api_type = os.getenv("OPENAI_API_TYPE")
openai.api_version = os.getenv("OPENAI_API_VERSION")
openai.api_base = os.getenv("OPENAI_API_BASE")
openai.api_key = os.getenv("OPENAI_API_KEY")

async def transcribe(content):        
    headers = {        
        "api-key": f"{openai.api_key}"
    }
    deployment_name = "iaff_whisper"
    whisper_version = "2023-09-01-preview"
    deployment_api = f"{openai.api_base}openai/deployments/{deployment_name}/audio/transcriptions?api-version={whisper_version}"

    audio_io = io.BytesIO(content)

    data = FormData()
    data.add_field('file',
                   audio_io,
                   filename="test.wav",
                   content_type='audio/wav') 

    transcription = ""
    async with aiohttp.ClientSession() as session:
        async with session.post(deployment_api, headers=headers, data=data) as response:
            if response.status == 200:
                transcription = await response.json()
            else:
                error_details = await response.text()
                print(f"Error: {response.status}, Details: {error_details}")
    
    return transcription