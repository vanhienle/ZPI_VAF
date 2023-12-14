from dotenv import load_dotenv
import os
import aiohttp
import io
import ffmpeg
import tempfile
import os

load_dotenv()

def convert_webm_bytes_to_wav_bytes(webm_bytes):
    webm_fd, webm_path = tempfile.mkstemp(suffix='.webm')
    with os.fdopen(webm_fd, 'wb') as temp_webm:
        temp_webm.write(webm_bytes)

    wav_fd, wav_path = tempfile.mkstemp(suffix='.wav')
    os.close(wav_fd)

    try:
        ffmpeg.input(webm_path).output(wav_path, format='wav', y=None).run()

        with open(wav_path, 'rb') as temp_wav:
            wav_bytes = temp_wav.read()
            return wav_bytes
    except Exception as e:
        print("Error:", e.stderr.decode())
        return None
    finally:
        os.remove(webm_path)
        os.remove(wav_path)

async def transcribe(content, lang):
    content = convert_webm_bytes_to_wav_bytes(content)
    lang_map = {"English": "en-US",
                "Vietnamese": "vi-VN",
                "Belarusian": "be-BY",
                "Ukrainian": "uk-UA",
                "Polish": "pl-PL",
                "Russian": "ru-RU"}

    azure_speech_key = os.getenv("AZURE_SPEECH_KEY")
    azure_region = os.getenv("AZURE_REGION")
    azure_endpoint = f"https://{azure_region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language={lang_map[lang]}"
    headers = {
        "Ocp-Apim-Subscription-Key": azure_speech_key,
        "Content-Type": "audio/wav"
    }

    audio_io = io.BytesIO(content)
    
    transcription = ""
    async with aiohttp.ClientSession() as session:
        async with session.post(azure_endpoint, headers=headers, data=audio_io) as response:
            try:
                if response.status == 200:
                    result = await response.json()
                    transcription = result.get('DisplayText', '')
                else:
                    error_details = await response.text()
                    print(f"Error: {response.status}, Details: {error_details}")
            except Exception as e:
                print(f"An error occured: {e}")
    return transcription