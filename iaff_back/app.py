from flask import Flask
from flask_cors import CORS, cross_origin
from auth import auth as auth_blueprint
from RestSurvey import surv as surv_blueprint
from RestDocuments import docs as docs_blueprint
from RestAssistant import assist as assist_blueprint
import time


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Accordingtoallknownlawsofaviationthereisnowayabeeshouldbeabletofly'
    cross_origin(automatic_options=True)

    cors = CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    app.config['CORS_HEADERS'] = 'Content-Type'

    app.register_blueprint(auth_blueprint)
    app.register_blueprint(surv_blueprint)
    app.register_blueprint(docs_blueprint)
    app.register_blueprint(assist_blueprint)

    return app


app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
