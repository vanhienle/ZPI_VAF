import datetime

from flask import  request, jsonify, Blueprint, current_app, session, make_response #make_response # Blueprint, render_template, redirect, url_for,
#from flask_restful import reqparse
from flask_login import login_user, login_required, logout_user, current_user, login_remembered
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from userAccess import Access, User
import jwt

auth = Blueprint('auth', __name__)

#userPostArgs = reqparse.RequestParser()
#userPostArgs.add_argument("name",type=str,help="User name",required=True)
#userPostArgs.add_argument("password",type=str,help="User password",required=True)

access = Access()

def create_token(user_id):
    payload = {'UserID': user_id}
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    print('Creating token: ', token)
    return token


def verify(email, password):
    result = access.getFromUser(email)
    if not result:
        print('User email not found: ', email)
        return None

    hashed_password = result[1]

    if not check_password_hash(hashed_password, password):
        print('User password:', password, ' does not encrypt into hashed password: ', hashed_password)
        return None

    print('Verified user: ', email)
    return result


def verifyId(id, password):
    result = access.getUserFromID(id)
    if not result:
        print('User id not found: ', id)
        return None

    hashed_password = result[2]

    if not check_password_hash(hashed_password, password):
        print('User password:', password, ' does not encrypt into hashed password: ', hashed_password)
        return None

    print('Verified user id: ', id)
    return result


@auth.route('/users/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login_post():
    print('somebody tried to log in')
    request_data = request.get_json()

    email = request_data['email']
    password = request_data['password']

    print('verifying user: ', request_data)

    result = verify(email, password)
    if not result:
        return jsonify({'Error': 'Invalid credentials'})

    print('user verified with id: ', result[0], ', creating token...')
    token = create_token(result[0])

    print('saving token in the database')
    access.DBCursor.execute("UPDATE users SET Token = %s WHERE UserID = %s", (token, result[0]))
    access.DBConnection.commit()
    return jsonify({'token': token})


@auth.route('/users/signup',methods=['POST'])
@cross_origin(supports_credentials=True)
def signup_post():
    print('somebody tried to sign up')
    # args = userPostArgs.parse_args()
    request_data = request.get_json()
    email = request_data['email']
    password = request_data['password']
    name = request_data['name']

    print('verifying user: ', request_data)
    password = generate_password_hash(password, method='sha256')
    result = access.signup(email=email, password=password, name=name)
    if not result:
        return jsonify("False")

    print('user verified with id: ', result[0], ', creating token...')
    token = create_token(result[0])

    print('saving token in the database')
    access.DBCursor.execute("UPDATE users SET Token = %s WHERE UserID = %s", (token, result[0]))
    access.DBConnection.commit()
    return jsonify({'token': token})


def check_token(token):
    payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
    id = payload['UserID']
    print('decoded id: ', id, ', checking if token is saved in database')

    access.DBCursor.execute("SELECT Token FROM users WHERE UserID = %s", (id,))
    stored_token = access.DBCursor.fetchone()

    return id if stored_token and stored_token[0] == token else None


@auth.route('/users/is_logged', methods=['POST'])
@cross_origin(supports_credentials=True)
def is_logged():
    print('checking authorization of a token')
    token = request.headers.get('token')
    print('received token: ', token)
    try:
        return jsonify('True') if check_token(token) else jsonify('False')
    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'})
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'})


@auth.route('/users/logout', methods=['POST'])
@cross_origin(supports_credentials=True)
def logout():
    print('somebody tried to log out')
    token = request.headers.get('token')

    print('got token: ', token)

    try:
        id = check_token(token)
        if not id:
            return jsonify('False')

        access.DBCursor.execute("UPDATE users SET Token = NULL WHERE UserID = %s", (id,))
        access.DBConnection.commit()

        return jsonify('True')
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'})

@auth.route('/users/get_user_data', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_user_data():
    print('getting data of user with token')
    token = request.headers.get('token')
    print('received token: ', token)
    try:
        id = check_token(token)
        if not id:
            return jsonify('False')
        re = access.getUserFromID(id)
        return jsonify({'email': re[1], 'name': re[3]})

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'})
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'})


@auth.route('/ab',methods=['GET'])
def ab():
    test = {"key": "data"}
    return jsonify(test)

#
# @auth.route('/users/is_logged')
# @cross_origin(supports_credentials=True)
# def is_logged():
#     return jsonify("True") if current_user.is_authenticated else jsonify("False")
#
#
# @auth.route('/users/login', methods=['POST'])
# @cross_origin(supports_credentials=True)
# def login_post():
#     request_data = request.get_json()
#     print(request_data)
#     email = request_data['email']
#     password = request_data['password']
#
#     result = verify(email, password)
#     if not result:
#         return jsonify("False")
#
#     user = User()
#     user.id = result[0]
#
#     name = access.getUserName(email)[0]
#     ujson = {"email": email, "name": name}
#
#     res = login_user(user)
#
#     if res:
#         return jsonify(ujson)
#     return jsonify("False")

# @auth.route('/users/signup',methods=['POST'])
# @cross_origin(supports_credentials=True)
# def signup_post():
#     print('somebody tried to sign up')
#     # args = userPostArgs.parse_args()
#     request_data = request.get_json()
#     email = request_data['email']
#     password = request_data['password']
#     name = request_data['name']
#     password = generate_password_hash(password, method='sha256')
#     result = access.signup(email=email, password=password, name=name)
#     if not result:
#         return jsonify("False")
#     user = User()
#     user.id = result[0]
#     print('logging user to session')
#     return jsonify("True") if login_user(user) else jsonify("False")
#
# @auth.route('/users/logout')
# @cross_origin(supports_credentials=True)
# def logout():
#     if current_user.is_authenticated:  # Check if the user is logged in
#         logout_user()
#         return jsonify("True")
#     else:
#         return jsonify("False")


@auth.route('/users/change_password',methods=['PUT'])
@cross_origin()
def change_password():
    request_data = request.get_json()
    print(request_data)
    password = request_data['password']
    newpassword = request_data['newpassword']
    token = request.headers.get('token')

    try:
        id = check_token(token)
        if not id:
            return jsonify('False')

        if not verifyId(id, password):
            return jsonify({'Error': 'Invalid password'})

        newpassword = generate_password_hash(newpassword, method='sha256')
        access.updateUserPassword(id, newpassword)

        return jsonify("True")

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'})
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'})


@auth.route('/users/change_account',methods=['PUT'])
@cross_origin()
def change_account():
    request_data = request.get_json()
    print(request_data)
    email = request_data['email']
    name = request_data['name']
    password = request_data['password']
    token = request.headers.get('token')

    try:
        id = check_token(token)
        if not id:
            return jsonify('False')

        if not verifyId(id, password):
            return jsonify({'Error': 'Invalid password'})

        access.updateUserAccount(email, name, id)
        return jsonify("True")

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'})
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'})
