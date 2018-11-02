from flask import  current_app as app
from server.models import User, Post
from server.database import db
from werkzeug.security import check_password_hash, generate_password_hash

# populates database
def populate():

    # populates users
    users = User.query.all()
    if not users:
        user = User(username='admin', password=generate_password_hash('123'), email='admin@ouatedephoque.ca')
        db.session.add(user)


    # populates posts
    posts = Post.query.all()
    if not posts:
        post1 = Post(title='Post 1', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='October 27, 2018', user=user, category='Nouvelles')
        post2 = Post(title='Post 2', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='October 28, 2018', user=user, category='Drole')
        post3 = Post(title='Post 3', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='October 29, 2018', user=user, category='Nouvelles')

        db.session.add(post1)
        db.session.add(post2)
        db.session.add(post3)

    db.session.commit()

