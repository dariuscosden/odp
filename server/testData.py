from flask import  current_app as app
from server.models import User, Post, Ad
from server.database import db
from werkzeug.security import check_password_hash, generate_password_hash

# populates database
def populate():

    # populates users
    users = User.query.all()
    if not users:
        user = User(username='admin', password='123', email='admin@ouatedephoque.ca', category='administrator')
        db.session.add(user)
    else:
        user = User.query.filter_by(username='admin').first()


    # populates posts
    posts = Post.query.all()
    if not posts:
        post1 = Post(title='Post 1', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='2018-10-27', user=user, category='Nouvelles', image="/dist/images/post1.jpg")
        post2 = Post(title='Post 2', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='2018-10-28', user=user, category='Drole', image="/dist/images/post1.jpg")
        post3 = Post(title='Post 3', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='2018-10-29', user=user, category='Nouvelles', image="/dist/images/post1.jpg")
        post4 = Post(title='Post 4', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='2018-10-30', user=user, category='Nouvelles', image="/dist/images/post1.jpg")
        post5 = Post(title='Post 5', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='2018-10-31', user=user, category='Drole', image="/dist/images/post1.jpg")
        post6 = Post(title='Post 6', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='2018-11-01', user=user, category='Nouvelles', image="/dist/images/post1.jpg")
        post7 = Post(title='Post 7', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='2018-11-02', user=user, category='Nouvelles', image="/dist/images/post1.jpg")
        post8 = Post(title='Post 8', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='2018-11-03', user=user, category='Drole', image="/dist/images/post1.jpg")
        post9 = Post(title='Post 9', body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateCreated='2018-11-04', user=user, category='Nouvelles', image="/dist/images/post1.jpg")

        db.session.add(post1)
        db.session.add(post2)
        db.session.add(post3)

    # populates ads
    ads = Ad.query.all()
    if not ads:
        ad1 = Ad(id="feedAd", title='Ad 1', type="feed", content="<img src='https://sg.fiverrcdn.com/photo2s/76101161/original/729177c730c99d2eebb2da6a6e66fc332d49c512.jpg?1500125632' />")
        ad2 = Ad(id="sidebarAd", title='Ad 2', type="sidebar", content="<b>ad2</b>")

        db.session.add(ad1)
        db.session.add(ad2)

    db.session.commit()

