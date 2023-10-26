from flask import  request, jsonify, Blueprint, make_response # Blueprint, render_template, redirect, url_for,
from flask_login import login_user, login_required, logout_user, current_user
from flask_cors import cross_origin
from survey import Survey

surv = Blueprint('survey', __name__)
survey = Survey()

@surv.route('/survey/get_id')
@cross_origin()
def get_id():
    if not current_user.is_authenticated:
        return jsonify("False")
    id = current_user.id
    return jsonify(id)

@surv.route('/survey/filled_survey')
@cross_origin()
def filled_survey():
    if not current_user.is_authenticated:
        return jsonify("User not found")
    id = current_user.id

    result = survey.getSurvey(id)

    return result if result else jsonify("False")

@surv.route('/survey/add_survey',methods=['POST'])
@cross_origin()
def add_survey():
    if not current_user.is_authenticated:
        print('User is not authenticated')
        return jsonify("User not found")
    id = current_user.id

    print('Adding survey from user with id: ', id)
    request_data = request.get_json()

    try:
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

        result = survey.addSurvey(id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other, documenttype)
        if not result:
            print('Failed to add data')

        return result if result else jsonify("False")

    except:
        print('Incorrect data')
        return jsonify("Incorrect data")