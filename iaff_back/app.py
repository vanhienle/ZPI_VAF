from flask import Flask
from flask_login import LoginManager
from main import main as main_blueprint
from auth import auth as auth_blueprint
from userAccess import Access, User

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Accordingtoallknownlawsofaviationthereisnowayabeeshouldbeabletofly'
    app.register_blueprint(main_blueprint)
    app.register_blueprint(auth_blueprint)
    access = Access()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(username):
        result = access.getUser(username)
        if not result:
            return
        user = User()
        user.id = result[0]
        return user

    return app

app= create_app()

if __name__ == '__main__':
    app.run(host='10.182.10.71', port=5000, debug=True) #Remove debug on production
