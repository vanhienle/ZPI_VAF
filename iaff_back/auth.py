from flask import Blueprint, render_template, redirect, url_for, request, jsonify
from flask_restful import reqparse
from flask_login import login_user, login_required, logout_user
from werkzeug.security import generate_password_hash
from userAccess import Access, User

auth = Blueprint('auth', __name__)

userPostArgs = reqparse.RequestParser()
userPostArgs.add_argument("name",type=str,help="User name",required=True)
userPostArgs.add_argument("password",type=str,help="User password",required=True)

access = Access()

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/ab',methods=['GET'])
def ab():
    test = {"key": "data"}
    return jsonify(test)

@auth.route('/login',methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')
    result = access.getUser(email,password=generate_password_hash(password, method='sha256'))
    if not result:
        return
    user = User()
    user.id = result[0]
    login_user(user)

    return redirect(url_for('main.profile'))

@auth.route('/signin')
def signin():
    return render_template('signin.html')

@auth.route('/signin',methods=['POST'])
def signin_post():
    # args = userPostArgs.parse_args()
    email = request.form.get('email')
    password = request.form.get('password')
    if access.signin(email=email,password=generate_password_hash(password, method='sha256')):
        return redirect(url_for('auth.login'))
    return render_template('login.html')

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))