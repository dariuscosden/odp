from flask import current_app as app
from flask import render_template

# renders index.html
@app.route('/')
@app.route('/admin')
def index():

    return render_template('index.html')