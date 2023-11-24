import speech_recognition as sr
import pyttsx3
from pydub import AudioSegment
from pydub.playback import play
import whisper

r = sr.Recognizer()


def record_audio():
    audio_for_whisper_name = f"audio_for_whisper.wav"

    try:
        with sr.Microphone() as source:
            print("Recording...")
            r.adjust_for_ambient_noise(source, duration=1.0)
            audio = r.listen(source)

            with open(audio_for_whisper_name, 'wb') as audio_file:
                audio_file.write(audio.get_wav_data())

            return audio_for_whisper_name

    except sr.RequestError as e:
        print("Could not request results: {0}".format(e))

    except sr.UnknownValueError:
        print("Unknown error occurred")


def output_text():
    model = whisper.load_model('small')
    audio_for_whisper = record_audio()
    result = model.transcribe(audio_for_whisper, fp16=False)

    f = open("output.txt", "w")
    f.write(result['text'])

    f.close()
    return


while(1):
    output_text()
    print("Wrote text")


