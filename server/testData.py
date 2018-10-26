from flask import  current_app as app
from server.models import User
from server.database import db
from werkzeug.security import check_password_hash, generate_password_hash

# populates database
def populate():
    user = User.query.all()
    if not user:
        user = User(username='admin', password=generate_password_hash('123'), email='admin@ouatedephoque.ca')
        db.session.add(user)
        db.session.commit()