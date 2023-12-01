from flask import  request, jsonify, Blueprint, current_app
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from userAccess import Access
import psycopg2
import jwt
import datetime

auth = Blueprint('auth', __name__)
access = Access()

def create_token(user_id):
    payload = {'UserID': user_id,
               "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=12)}
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
        print('User password: does not encrypt into hashed password: ', hashed_password)
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
        print('User password: does not encrypt into hashed password: ', hashed_password)
        return None

    print('Verified user id: ', id)
    return result


@auth.route('/users/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login_post():
    request_data = request.get_json()

    email = request_data['email']
    password = request_data['password']

    print('(Login) verifying user: ', request_data)

    result = verify(email, password)
    if not result:
        return jsonify({'Error': 'Invalid credentials'}), 401

    print('user verified with id: ', result[0], ', creating token...')
    token = create_token(result[0])

    access.DBCursor.execute("UPDATE users SET Token = %s WHERE UserID = %s", (token, result[0]))
    access.DBConnection.commit()
    return jsonify({'token': token}), 200


@auth.route('/users/signup',methods=['POST'])
@cross_origin(supports_credentials=True)
def signup_post():
    request_data = request.get_json()
    email = request_data['email']
    password = request_data['password']
    name = request_data['name']

    print('(Sign up) verifying user: ', request_data)
    password = generate_password_hash(password, method='sha256')
    result = access.signup(email=email, password=password, name=name)
    if not result:
        return jsonify({'Error': 'Failed to sign up'}), 500

    print('user verified with id: ', result[0])
    token = create_token(result[0])

    access.DBCursor.execute("UPDATE users SET Token = %s WHERE UserID = %s", (token, result[0]))
    access.DBConnection.commit()
    return jsonify({'token': token}), 200


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
    token = request.headers.get('token')
    print('(is logged) received token: ', token)
    if token is None:
        return jsonify('false'), 401
    try:
        return (jsonify('true'), 200) if check_token(token) else (jsonify('false'), 401)
    except jwt.ExpiredSignatureError:
        return jsonify('false'), 401
    except jwt.InvalidTokenError:
        return jsonify('false'), 401
    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        access.DBConnection.commit()
        return jsonify('false'), 500


@auth.route('/users/logout', methods=['POST'])
@cross_origin(supports_credentials=True)
def logout():
    token = request.headers.get('token')

    print('(log out) got token: ', token)

    try:
        id = check_token(token)
        if not id:
            return jsonify('false'), 401

        access.DBCursor.execute("UPDATE users SET Token = NULL WHERE UserID = %s", (id,))
        access.DBConnection.commit()

        return jsonify('true'), 200
    except jwt.InvalidTokenError:
        print('invalid token: ', token)
        return jsonify('false'), 401
    except:
        print('Unknown error')
        return jsonify('false'), 500


@auth.route('/users/get_user_data', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_user_data():
    token = request.headers.get('token')
    print('(get_user_data) received token: ', token)
    try:
        id = check_token(token)
        if not id:
            return jsonify({"Error": 'Invalid user'}), 401
        re = access.getUserFromID(id)
        return jsonify({'email': re[1], 'name': re[3]}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'}), 401
    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        access.DBConnection.commit()
        return jsonify({"Error": error_message}), 500


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
            return jsonify({'Error': 'Id not found'}), 401

        if not verifyId(id, password):
            return jsonify({'Error': 'Invalid password'}), 401

        newpassword = generate_password_hash(newpassword, method='sha256')
        access.updateUserPassword(id, newpassword)

        return jsonify('true'), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'}), 401
    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        access.DBConnection.commit()
        return jsonify({"Error": error_message}), 500


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
            return jsonify({'Error': 'Id not found'}), 401

        if not verifyId(id, password):
            return jsonify({'Error': 'Invalid password'}), 401

        access.updateUserAccount(email, name, id)
        return jsonify('true'), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'}), 401
    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        access.DBConnection.commit()
        return jsonify({"Error": error_message}), 500
