from flask import  request, jsonify, Blueprint, make_response # Blueprint, render_template, redirect, url_for,
from flask_login import login_user, login_required, logout_user, current_user
from flask_cors import cross_origin
from auth import check_token
from survey import Survey
import psycopg2
import jwt

surv = Blueprint('survey', __name__)
survey = Survey()

@surv.route('/survey/is_filled_survey', methods=['POST'])
@cross_origin(supports_credentials=True)
def filled_survey():
    token = request.headers.get('token')
    try:
        id = check_token(token)
        if not id:
            return jsonify('False')

        result = survey.getSurvey(id)
        return jsonify("True") if result else jsonify("False")

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'})
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'})


@surv.route('/survey/add_survey',methods=['POST'])
@cross_origin(supports_credentials=True)
def add_survey():
    token = request.headers.get('token')
    try:
        id = check_token(token)
        if not id:
            return jsonify('False')

        request_data = request.get_json()

        age = request_data['age']
        kids = request_data['kids']
        baby = request_data['baby']
        teen = request_data['teen']
        adult = request_data['adult']
        accom = request_data['accom']
        insure = request_data['insure']
        study = request_data['study']
        job = request_data['job']
        live = request_data['live']
        refugee = request_data['refugee']
        other = request_data['other']
        documenttype = request_data['documenttype']
        print('Extracted all data from survey')

        result = survey.addSurvey(id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other,
                                  documenttype)
        print('Added to sql database')

        if not result:
            print('Failed to add data')

        print('Returned as a result: ', result)
        return jsonify("True") if result else jsonify("False")

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'})
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'})
    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        survey.DBConnection.commit()
        return jsonify({"SQL error": error_message})


@surv.route('/survey/update_survey',methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_survey():
    token = request.headers.get('token')
    try:
        id = check_token(token)
        if not id:
            return jsonify('False')

        request_data = request.get_json()

        age = request_data['age']
        kids = request_data['kids']
        baby = request_data['baby']
        teen = request_data['teen']
        adult = request_data['adult']
        accom = request_data['accom']
        insure = request_data['insure']
        study = request_data['study']
        job = request_data['job']
        live = request_data['live']
        refugee = request_data['refugee']
        other = request_data['other']
        documenttype = request_data['documenttype']
        print('Extracted all data from survey')

        survey.updateSurvey(id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other,
                                  documenttype)
        print('Updated sql database')
        return jsonify("True")

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'})
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'})
    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        survey.DBConnection.commit()
        return jsonify({"SQL error": error_message})
