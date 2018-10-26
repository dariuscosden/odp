from flask import current_app as app
from flask import render_template, redirect, request, url_for, flash, session
from werkzeug.security import check_password_hash
from server.models import User

# renders index.html
@app.route('/')
@app.route('/admin', methods=('GET', 'POST'))
def index():

    # handles login
    if request.method == 'POST':
        _username = request.form['username']
        _password = request.form['password']
        message = ''

        if not _username:
            message = 'Please enter your username'
        elif not _password:
            message = 'Please enter your password'
        else:
            user = User.query.filter_by(username=_username).first()
            if check_password_hash(user.password, _password):
                session['user_id'] = user.id
                message = 'Logged In!'
            else:
                message = 'Incorrect password'

            flash(message)
            return redirect(url_for('index'))

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