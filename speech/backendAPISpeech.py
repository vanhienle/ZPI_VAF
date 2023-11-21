from flask import Flask, request, jsonify
import speech_recognition as sr
import whisper
import pyttsx3
from pydub import AudioSegment
from pydub.playback import play
import os

app = Flask(__name__)


@app.route('/record', methods=['POST'])
def record_audio():
    audio_for_whisper_name = f"audio_for_whisper.wav"

    try:
        with sr.Microphone() as source:
            print("Recording...")
            r = sr.Recognizer()
            r.adjust_for_ambient_noise(source, duration=1.0)
            audio = r.listen(source)

            with open(audio_for_whisper_name, 'wb') as audio_file:
                audio_file.write(audio.get_wav_data())

            return jsonify({"message": "Audio recorded successfully", "filename": audio_for_whisper_name})

    except sr.RequestError as e:
        return jsonify({"error": "Could not request results", "details": str(e)}), 500

    except sr.UnknownValueError:
        return jsonify({"error": "Unknown error occurred"}), 500


@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    model = whisper.load_model('small')

    #if 'filename' not in request.files:
        #return jsonify({"error": "No file uploaded"}), 400

    audio_file = request.files['filename']

    if audio_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = audio_file.filename
    audio_file.save(filename)

    result = model.transcribe(filename, fp16=False)

    output_text = result['text']
    os.remove(filename)  # Remove the uploaded file after transcription

    return jsonify({"transcribed_text": output_text})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=9000, debug=True)
