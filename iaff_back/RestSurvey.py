from flask import  request, jsonify, Blueprint
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
            return jsonify('false'), 401

        result = survey.getSurvey(id)
        return (jsonify("true"), 200) if result else (jsonify("false"), 401)

    except jwt.ExpiredSignatureError:
        return jsonify('false'), 401
    except jwt.InvalidTokenError:
        return jsonify('false'), 401
    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        survey.DBConnection.commit()
        return jsonify('false'), 500


def get_survey(survId):
    return survey.getSurvey(survId)


@surv.route('/survey/get_survey',methods=['POST'])
@cross_origin(supports_credentials=True)
def get_user_survey():
    token = request.headers.get('token')
    try:
        id = check_token(token)
        if not id:
            return jsonify({'Error': 'Id not found'}), 401

        survey = get_survey(id)

        if not survey:
            print('Failed to get survey')

        print('Returned survey: ', survey)
        age = {"age": survey[1]}
        kids = {"kids": survey[2]}
        baby = {"baby": survey[3]}
        teen = {"teen": survey[4]}
        adult = {"adult": survey[5]}
        accom = {"accom": survey[6]}
        insure = {"insure": survey[7]}
        study = {"study": survey[8]}
        job = {"job": survey[9]}
        live = {"live": survey[10]}
        refugee = {"refugee": survey[11]}
        other = {"other": survey[12]}
        documenttype = {"documenttype": survey[13]}
        res = {**age,**kids,**baby,**teen,**adult,**accom,**insure,**study,**job,**live,**refugee,**documenttype,**other}
        return (jsonify(res), 200) if survey else (jsonify({'Error': 'Failed to add data'}), 500)

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'}), 401
    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        survey.DBConnection.commit()
        return jsonify({"Error": error_message}), 500


@surv.route('/survey/add_survey',methods=['POST'])
@cross_origin(supports_credentials=True)
def add_survey():
    token = request.headers.get('token')
    try:
        id = check_token(token)
        if not id:
            return jsonify({'Error': 'Id not found'}), 401

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
        print('Survey added to sql database')

        if not result:
            print('Failed to add data')

        print('Returned as a result: ', result)
        return (jsonify("true"), 200) if result else (jsonify({'Error': 'Failed to add data'}), 500)

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'}), 401
    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        survey.DBConnection.commit()
        return jsonify({"Error": error_message}), 500


@surv.route('/survey/update_survey',methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_survey():
    token = request.headers.get('token')
    try:
        id = check_token(token)
        if not id:
            return jsonify({'Error': 'Id not found'}), 401

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
        print('Updated survey in sql database')
        return jsonify("true"), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'}), 401
    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        survey.DBConnection.commit()
        return jsonify({"Error": error_message}), 500
