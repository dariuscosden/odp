from flask import current_app as app
from flask import render_template
from server.models import User

@app.route('/')
def index():

    return render_template('index.html')