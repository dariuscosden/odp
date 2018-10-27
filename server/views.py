from flask import current_app as app
from flask import render_template, redirect, request, url_for, flash, session
from werkzeug.security import check_password_hash
from server.models import User
import json

# renders index.html
@app.route('/')
@app.route('/admin', methods=('GET', 'POST'))
def index():

    # handles login
    if request.method == 'POST':
        data = request.get_json()
        _username = data['formInput'].get('username')
        _password = data['formInput'].get('password')

        user = User.query.filter_by(username=_username).first()

        if user:
            if check_password_hash(user.password, _password):
                session['user_id'] = user.id
                return json.dumps({
                    'authenticated': True,
                    'username': user.username,
                    'password': user.password
                    })
            else:
                return json.dumps({'authenticated': False})
        else:
            return json.dumps({'authenticated': False})


    return render_template('index.html')

# handles logout
@app.route('/logout')
def logout():
    if session.get('user_id'):
        session.clear()
        message = 'Logged Out!'
    else:
        message = 'You are not logged in.'

    flash(message)
    return redirect(url_for('index'))