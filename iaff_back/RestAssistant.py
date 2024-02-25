from flask import request, jsonify, Blueprint
from flask_cors import cross_origin
import requests
from dotenv import load_dotenv
import os

load_dotenv()

ASSISTANT_URL = os.getenv("ASSISTANT_URL")

assist = Blueprint('assistant', __name__)
assistant_api_address = ASSISTANT_URL


@assist.route('/assistant/get_response', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_answer():
    try:
        print('sending question to assistant service')
        request_data = request.get_data()
        print(request_data)
        r = requests.post(url=assistant_api_address + '/assistant_service/get_response', data=request_data)
        print('got response: ', r.json())
        return jsonify(r.json()), 200
    except Exception as e:
        print(e)
        return jsonify('Assistant error'), 500


@assist.route('/assistant/translate', methods=['POST'])
@cross_origin(supports_credentials=True)
def translate():
    try:
        print('sending translation to assistant service')
        request_data = request.get_data()
        print(request_data)
        r = requests.post(url=assistant_api_address + '/assistant_service/translate', data=request_data)
        print('got response: ', r.json())
        return jsonify(r.json()), 200
    except Exception as e:
        print(e)
        return jsonify('Assistant error'), 500


@assist.route('/assistant/transcribe', methods=['POST'])
@cross_origin(supports_credentials=True)
def transcribe():
    try:
        print('sending audio to assistant service')
        file = request.files['file']
        lang = request.form.get('lang')
        files = {'file': (file.filename, file, file.content_type)}
        data = {'lang': lang}
        r = requests.post(url=assistant_api_address + '/assistant_service/transcribe', files=files, data=data)
        print('got response: ', r.json())
        return jsonify(r.json()), 200
    except Exception as e:
        print(e)
        return jsonify('Assistant error'), 500
