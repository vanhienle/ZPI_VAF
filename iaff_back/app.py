from flask import Flask, current_app
from flask_cors import CORS, cross_origin
from auth import auth as auth_blueprint
from RestSurvey import surv as surv_blueprint
from RestDocuments import docs as docs_blueprint
from RestAssistant import assist as assist_blueprint
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PW = os.getenv("DB_PW")

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Accordingtoallknownlawsofaviationthereisnowayabeeshouldbeabletofly'

    app.config['DB_POOL'] = psycopg2.pool.SimpleConnectionPool(1, 10, 
                                                            host=DB_HOST,
                                                            port=DB_PORT,
                                                            database=DB_NAME,
                                                            user=DB_USER,
                                                            password=DB_PW)

    cross_origin(automatic_options=True)

    cross_origin(automatic_options=True)

    cors = CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    app.config['CORS_HEADERS'] = 'Content-Type'

    app.register_blueprint(auth_blueprint)
    app.register_blueprint(surv_blueprint)
    app.register_blueprint(docs_blueprint)
    app.register_blueprint(assist_blueprint)

    return app

app= create_app()

if __name__ == '__main__':
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)