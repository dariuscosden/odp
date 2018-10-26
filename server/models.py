from server.database import db

# user model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))
    email = db.Column(db.String(160))

    # represents the table
    def __repr__(self):
        return '<User {}>'.format(self.username)