from flask import request, jsonify, Blueprint
from flask_cors import cross_origin
from auth import check_token
from documents import Documents
from RestSurvey import get_survey
import psycopg2
import jwt

docs = Blueprint('documents', __name__)
documents = Documents()


@docs.route('/documents/get_document', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_document():
    try:
        print('invoking get_document method')
        request_data = request.get_json()
        print('extracting id from json')
        docID = request_data['documentId']
        print('extracted id=',docID, ', sending sql query to database')
        result = documents.getDocument(docID)
        print('founded: ', result)
        return (jsonify({"category": result[0],"title": result[1],"info": result[2],"links": result[-2],"image": result[-4]}), 200) if result else (jsonify("false"), 401)

    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        documents.DBConnection.commit()
        return jsonify('false'), 500
    except RuntimeError as e:
        error_message = str(e)
        print("Unknown error:", error_message)
        return jsonify('false'), 500


@docs.route('/documents/get_categories')
@cross_origin(supports_credentials=True)
def get_categories():
    try:
        results = documents.getCategories()
        if len(results) == 0:
            return jsonify("false"), 401

        acc = []
        for result in results:
            acc.append({"category": result[0]})
        return jsonify({"results": acc}), 200

    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        documents.DBConnection.commit()
        return jsonify('false'), 500
    except RuntimeError as e:
        error_message = str(e)
        print("Unknown error:", error_message)
        return jsonify('false'), 500



@docs.route('/documents/get_by_category', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_by_category():
    try:
        request_data = request.get_json()
        category = request_data['category']
        print('Searching for all articles with category: ', category)
        results = documents.getAllByCategory(category)
        print('Articles found: ', len(results))
        if len(results) == 0:
            return jsonify([]), 200

        acc = []
        for result in results:
            print('Article tuples: ', len(result), ',    article: ', result)
            acc.append({"id": result[-1], "category": result[0],  "title": result[1], "short": result[-3]})
        return jsonify({"results": acc}), 200

    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        documents.DBConnection.commit()
        return jsonify('false'), 500
    except RuntimeError as e:
        error_message = str(e)
        print("Unknown error:", error_message)
        return jsonify('false'), 500





@docs.route('/documents/get_by_name', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_by_name():
    try:
        request_data = request.get_json()
        name = request_data['name']
        print('Filtered keyword: ', name)
        results = documents.getAllByName(name)
        print('Found ',len(results),' results')
        if len(results) == 0:
            return jsonify([]), 200

        acc = []
        for result in results:
            acc.append({"id": result[0], "category": result[1], "title": result[2], "info": result[3]})
        return jsonify({"results": acc}), 200

    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        documents.DBConnection.commit()
        return jsonify('false'), 500
    except RuntimeError as e:
        error_message = str(e)
        print("Unknown error:", error_message)
        return jsonify('false'), 500


@docs.route('/documents/get_recommendations', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_recommendations():
    print('attempt at getting recommended info')
    token = request.headers.get('token')
    print('received token: ', token)
    try:
        id = check_token(token)
        if not id:
            return jsonify('false'), 401

        print('extracting survey from database with userid: ', id)
        surv = get_survey(id)
        if not surv:
            return jsonify("false"), 401

        print('survey found.')
        age = surv[1]
        kids = int(surv[2])
        #print('kids: ', kids)
        baby = int(surv[3])
        #print('baby: ', baby)
        teen = int(surv[4])
        #print('teen: ', teen)
        adult = int(surv[5])
        #print('adult: ', adult)
        accom = int(surv[6])
        #print('accom: ', accom)
        insure = int(surv[7])
        #print('insure: ', insure)
        study = int(surv[8])
        #print('study: ', study)
        job = int(surv[9])
        #print('job: ', job)
        live = int(surv[10])
        #print('live: ', live)
        refugee = int(surv[11])
        #print('refugee: ', refugee)
        other = int(surv[12])
        #print('other: ', other)
        documentType = surv[13]
        print('Filtering data to get most scoring info for user according to their survey')
        results = documents.getRecommendations(id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other,
                                     documentType)
        if len(results) == 0:
            return jsonify([]), 404

        acc = []
        for result in results:
            acc.append({"title": result[0], "info": result[1], "id": result[3], "category": result[4]})
        return jsonify({"results": acc}), 200

    except jwt.ExpiredSignatureError:
        return jsonify('false'), 401
    except jwt.InvalidTokenError:
        return jsonify('false'), 401
    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        documents.DBConnection.commit()
        return jsonify('false'), 500
    except RuntimeError as e:
        error_message = str(e)
        print("Unknown error:", error_message)
        return jsonify('false'), 500
