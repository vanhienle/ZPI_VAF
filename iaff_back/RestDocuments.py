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
        request_data = request.get_json()
        docID = request_data['documentId']
        print('(get_document) extracted id=',docID, ', sending sql query to database')
        result = documents.getDocument(docID)
        print('founded: ', result)
        return (jsonify({"category": result[0],"title": result[1],"info": result[2],"links": result[-3],"short": result[-4], "image": result[-1]}), 200) if result else (jsonify("false"), 401)

    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        documents.DBConnection.commit()
        return jsonify('false'), 500
    except Exception as e:
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
    except Exception as e:
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
            acc.append({"id": result[-2], "category": result[0],  "title": result[1], "short": result[-4], "image": result[-1]})

        return jsonify({"results": acc}), 200

    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        documents.DBConnection.commit()
        return jsonify('false'), 500
    except Exception as e:
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
            return jsonify({"results": []}), 200

        acc = []
        for result in results:
            acc.append({"id": result[-2], "category": result[0], "title": result[1], "short": result[-4], "image": result[-1]})
        return jsonify({"results": acc}), 200

    except psycopg2.Error as e:
        error_message = str(e)
        print("SQL error:", error_message)
        documents.DBConnection.commit()
        return jsonify('false'), 500
    except Exception as e:
        error_message = str(e)
        print("Unknown error:", error_message)
        return jsonify('false'), 500


@docs.route('/documents/get_recommendations', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_recommendations():
    token = request.headers.get('token')
    print('(get_recommendations) received token: ', token)
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
        baby = int(surv[3])
        teen = int(surv[4])
        adult = int(surv[5])
        accom = int(surv[6])
        insure = int(surv[7])
        study = int(surv[8])
        job = int(surv[9])
        live = int(surv[10])
        refugee = int(surv[11])
        other = int(surv[12])
        documentType = surv[13]
        results = documents.getRecommendations(id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other,
                                     documentType)
        if len(results) == 0:
            return jsonify([]), 404

        acc = []
        for result in results:
            acc.append({"title": result[0], "short": result[1], "id": result[3], "category": result[4], "image": result[-1]})
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
    except Exception as e:
        error_message = str(e)
        print("Unknown error:", error_message)
        return jsonify('false'), 500
