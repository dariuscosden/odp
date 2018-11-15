from server.database import db
from slugify import slugify

# user model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))
    category = db.Column(db.String(80))

    # posts relationship
    posts = db.relationship('Post', back_populates='user')

    # represents the table
    def __repr__(self):
        return '<User {}>'.format(self.username)

# post model
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(160))
    slug = db.Column(db.String(160))
    body = db.Column(db.String(3000))
    dateCreated = db.Column(db.String(80))
    category = db.Column(db.String(80))
    image = db.Column(db.String(160))

    # user relationship
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='posts')

    # defines the init function
    def __init__(self, *args, **kwargs):
        # creates the slug
        if not 'slug' in kwargs:
            kwargs['slug'] = slugify(kwargs.get('title', ''))
        super().__init__(*args, **kwargs)

    # represents the table
    def __repr__(self):
        return '<Post {}>'.format(self.title)

# ad model
class Ad(db.Model):
    id = db.Column(db.String(80), primary_key=True)
    title = db.Column(db.String(160))
    type = db.Column(db.String(80))
    content = db.Column(db.String(1000))
    
    def __repr__(self):
        return '<Ad: {}>'.format(self.title)