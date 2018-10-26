from flask import Flask
from config import DevelopmentConfig
from server.database import db
from server.models import User
from server import testData

def create_app():

    # creates the app
    app = Flask(__name__, static_folder='../static/dist', template_folder='../static/templates')

    # configuration
    app.config.from_object(DevelopmentConfig)

    # database
    with app.app_context():
        db.init_app(app)
        db.create_all()

    # views
    with app.app_context():
        from server import views

    # populates test database entries
    with app.app_context():
        testData.populate()

    return app
