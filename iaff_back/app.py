from flask import Flask
from flask_login import LoginManager
from flask_cors import CORS
# from main import main as main_blueprint
from auth import auth as auth_blueprint
from userAccess import Access, User

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Accordingtoallknownlawsofaviationthereisnowayabeeshouldbeabletofly'
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    # app.register_blueprint(main_blueprint)
    app.register_blueprint(auth_blueprint)
    access = Access()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(username):
        print('inside login manager')
        print('current username: ', username)
        result = access.getUserFromID(username)
        print('current result from finding user')
        if not result:
            print('cound not find user')
            return None
        user = User()
        user.id = result[0]
        print('found user with id: ', id)
        return user

    return app

app= create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)