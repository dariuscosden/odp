from flask import Flask
from server.database import db
from server.models import User
from server import testData
from pathlib import Path
import os

# creates the flask app
def create_app():

    # creates the app
    app = Flask(__name__, static_folder='../static/dist', template_folder='../static/templates')

    # config
    devConfig = Path(os.path.join(app.instance_path, 'devConfig.py'))
    prodConfig = Path(os.path.join(app.instance_path, 'prodConfig.py'))

    # dev over prod
    if devConfig.is_file():
        from instance.devConfig import DevelopmentConfig
        app.config.from_object(DevelopmentConfig)

    elif prodConfig.is_file():
        from instance.prodConfig import ProductionConfig
        app.config.from_object(ProductionConfig)

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
