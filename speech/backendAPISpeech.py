from fastapi import FastAPI, File, UploadFile, HTTPException
import speech_recognition as sr
import whisper
import os

app = FastAPI()


@app.post('/record')
async def record_audio():
    audio_for_whisper_name = f"audio_for_whisper.wav"

    try:
        r = sr.Recognizer()
        with sr.Microphone() as source:
            print("Recording...")
            r.adjust_for_ambient_noise(source, duration=1.0)
            audio = r.listen(source)

            with open(audio_for_whisper_name, 'wb') as audio_file:
                audio_file.write(audio.get_wav_data())

            return {"message": "Audio recorded successfully", "filename": audio_for_whisper_name}

    except sr.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Could not request results: {e}")

    except sr.UnknownValueError:
        raise HTTPException(status_code=500, detail="Unknown error occurred")


@app.post('/transcribe')
async def transcribe_audio(filename: str = File(...), audio_file: UploadFile = File(...)):
    model = whisper.load_model('small')

    if not audio_file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    with open(filename, 'wb') as file_object:
        file_object.write(audio_file.file.read())

    result = model.transcribe(filename, fp16=False)

    output_text = result['text']
    os.remove(filename)  # Remove the uploaded file after transcription

    return {"transcribed_text": output_text}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=9000, debug=True)