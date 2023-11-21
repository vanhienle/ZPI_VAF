from flask import request, jsonify, Blueprint
from flask_cors import cross_origin
from auth import check_token
import requests
import jwt
import auth

assist = Blueprint('assistant', __name__)
assistant_api_address = "http://iaff.westeurope.cloudapp.azure.com:8085"

@assist.route('/assistant/get_response', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_answer():
    token = request.headers.get('token')
    print('sending question to assistant service')
    request_data = request.get_data()
    print(request_data)
    r = requests.post(url=assistant_api_address+'/assistant_service/get_response', data=request_data)
    print('got response: ', r.json())
    return jsonify(r.json()), 200


@assist.route('/assistant/translate', methods=['POST'])
@cross_origin(supports_credentials=True)
def translate():
    print('inside translate')
    token = request.headers.get('token')
    print('sending question to assistant service')
    request_data = request.get_data()
    print(request_data)
    r = requests.post(url=assistant_api_address+'/assistant_service/translate', data=request_data)
    print('got response: ', r.json())
    return jsonify(r.json()), 200