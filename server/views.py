from flask import current_app as app
from flask import render_template, redirect, request, url_for, flash, session
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from sqlalchemy import desc, or_
from server.models import User, Post, Ad
from server.database import db
import json
import datetime
import os


# favicon
@app.route('/favicon.ico')
def favicon():
    return url_for('static', filename='favicon.ico')

 # jsonifies posts
def jsonifyPosts(posts):
    jsonPosts = []

    # checking for next page
    if posts.has_next:
        jsonPosts.append({'nextPage': True})
    else:
        jsonPosts.append({'nextPage': False})

    # checking for previous page
    if posts.has_prev:
        jsonPosts.append({'previousPage': True})
    else:
        jsonPosts.append({'previousPage': False})

    for post in posts.items:
        d = {}
        d['id'] = post.id
        d['title'] = post.title
        d['slug'] = post.slug
        d['body'] = post.body
        excerpList = post.body.split()
        words = 0
        excerp = ''
        for word in excerpList:
            if words < 29:
                excerp += word + ' '
                words += 1
            elif words == 29:
                excerp += word + '...'
                words += 1
        d['excerp'] = excerp
        d['dateCreated'] = post.dateCreated
        d['category'] = post.category
        d['image'] = post.image
        d['user'] = post.user.username
        jsonPosts.append(d)

    return json.dumps(jsonPosts)

# jsonifies users
def jsonifyUsers(users):
    jsonUsers = [] 

    for user in users:
        d = {}
        d['id'] = user.id
        d['username'] = user.username
        d['category'] = user.category
        jsonUsers.append(d)

    return json.dumps(jsonUsers)

# jsonifies ads
def jsonifyAds(ads):
    jsonAds = []

    for ad in ads:
        d = {}
        d['id'] = ad.id
        d['type'] = ad.type
        d['content'] = ad.content
        jsonAds.append(d)

    return json.dumps(jsonAds)

# renders index.html
@app.route('/', methods=('GET', 'POST'), endpoint='home')
@app.route('/admin', methods=('GET', 'POST'), endpoint='admin')
def index():

    # handles POST request
    if request.method == 'POST':
        data = request.get_json()

        # handles login
        if data.get('loginFormInput'):
            _username = data['loginFormInput'].get('username')
            _password = data['loginFormInput'].get('password')

            user = User.query.filter_by(username=_username).first()

            if user:
                if user.password == _password:
                    return json.dumps({
                        'authenticated': True,
                        'userID': user.id,
                        'username': user.username
                        })
                else:
                    return json.dumps({'authenticated': False})
            else:
                return json.dumps({'authenticated': False})

        # ads
        if data.get('ads'):
            ads = Ad.query.all()

            return jsonifyAds(ads)

        # users
        if data.get('users'):
            users = User.query.order_by(User.username).all()

            return jsonifyUsers(users)

        # posts
        if data.get('posts'):
            perPage = data.get('perPage')
            pageRequested = data.get('pageRequested')
            posts = Post.query.order_by(desc(Post.dateCreated)).paginate(pageRequested, perPage, error_out=True)

            return jsonifyPosts(posts)

        # categories
        if data.get('categories'):
            perPage = data.get('perPage')
            posts = Post.query.order_by(Post.category).paginate(1, perPage, error_out=True)
            jsonCategories = []

            for post in posts.items:
                if post.category not in jsonCategories:
                    jsonCategories.append(post.category)

            return json.dumps(jsonCategories)

        # filter by category
        if data.get('category'):
            category = data.get('category')
            perPage = data.get('perPage')
            posts = Post.query.filter_by(category=category).order_by(desc(Post.dateCreated)).paginate(1, perPage, error_out=True)

            return jsonifyPosts(posts)



    return render_template('index.html')

# gets individual post
@app.route('/<postSlug>', methods=('GET', 'POST'))
def getPost(postSlug):
    post = Post.query.filter_by(slug=postSlug).first()

    if post:
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

@app.errorhandler(404)
def page_not_found(e):
    if 'admin' in request.url:
        return redirect(url_for('admin'))
    return redirect(url_for('home'))

# handles the admin ads route
@app.route('/adminAds', methods=('GET', 'POST'))
def adminAds():

    if request.method == 'POST':
        data = request.get_json()

        if data.get('updateAds'):
            feedAdContent = data.get('feedAd')
            sidebarAdContent = data.get('sidebarAd')

            feedAd = Ad.query.filter_by(id='feedAd').first()
            sidebarAd = Ad.query.filter_by(id='sidebarAd').first()

            feedAd.content = feedAdContent
            sidebarAd.content = sidebarAdContent
            db.session.commit()

            ads = []
            ads.append(feedAd)
            ads.append(sidebarAd)

            return jsonifyAds(ads)

    return redirect(url_for('admin'))
            

# handles the admin posts route
@app.route('/adminPosts', methods=('GET', 'POST'))
def adminPosts():

    if request.method == 'POST':
        data = request.get_json()

        # handles admin post search
        if data.get('searchPosts'):
            searchInput = data.get('searchPosts')
            pageRequested = data.get('pageRequested')
            perPage = data.get('perPage')
            posts = Post.query.filter(or_(Post.title.like('%' + searchInput + '%'), Post.body.like('%' + searchInput + '%'))).order_by(desc(Post.title)).paginate(pageRequested, perPage, error_out=True)
            
            if posts:
                return jsonifyPosts(posts)
            else:
                return false

        # handles admin getNextPage
        if data.get('getNextPage'):
            perPage = data.get('perPage')
            pageRequested = data.get('pageRequested')
            posts = Post.query.order_by(desc(Post.dateCreated)).paginate(pageRequested, perPage, error_out=True)

            return jsonifyPosts(posts)

        # handles create post
        if data.get('createPost'):
            postImage = data.get('postImage')
            postTitle = data.get('postTitle')
            postBody = data.get('postBody')
            postCategory = data.get('postCategory')
            postImage = data.get('postImage')
            postUser = data.get('postUser')
            dateCreated = datetime.datetime.today().strftime('%Y-%m-%d')
            user = User.query.filter_by(username=postUser).first()
            post = Post(title=postTitle, body=postBody, user=user, category=postCategory, image=postImage, dateCreated=dateCreated)

            db.session.add(post)
            db.session.commit()

            return json.dumps({"postCreated": True})


        # handles update post
        if data.get('updatePost'):
            postID = data.get('postID')
            postTitle = data.get('postTitle')
            postBody = data.get('postBody')
            postImage = data.get('postImage')
            postCategory = data.get('postCategory')
            post = Post.query.filter_by(id=postID).first()

            # updates post
            post.title = postTitle
            post.body = postBody
            post.image = postImage
            post.category = postCategory

            db.session.commit()

            return json.dumps({'postUpdated': True})

        # handles delete post
        if data.get('deletePost'):
            postID = data.get('postID')
            post = Post.query.filter_by(id=postID).first()
            db.session.delete(post)

            db.session.commit()

            return json.dumps({"postDeleted": True})
            

    return redirect(url_for('admin'))

# handles the admin post route
@app.route('/adminPost', methods=('GET', 'POST'))
def adminPost():

    if request.method == 'POST':
        parentDir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
        file = request.files['file']
        filename = secure_filename(file.filename)
        file.save(os.path.join(parentDir, 'static/dist/images/{}'.format(filename)))

        return json.dumps({"fileURL": url_for('static', filename="images/{}".format(filename))})

    return redirect(url_for('admin'))

# handles the admin users route
@app.route('/adminUsers', methods=('GET', 'POST'))
def adminUsers():

    if request.method == 'POST':
        data = request.get_json()

        # handles the create user
        if data.get('createUser'):
            username = data.get('username')
            userPassword = data.get('userPassword')
            userExists = User.query.filter_by(username=username).first()

            if userExists:
                return json.dumps({"userExists": True})
            else:
                user = User(username=username, password=generate_password_hash(userPassword), category='administrator')
                db.session.add(user)
                db.session.commit()
                return json.dumps({"postCreated": True})

        # handles the delete user
        if data.get('deleteUser'):
            userID = data.get('userID')
            user = User.query.filter_by(id=userID).first()
            posts = Post.query.filter_by(user=user).all()

            # deletes all post from user
            for post in posts:
                db.session.delete(post)

            db.session.delete(user)

            db.session.commit()

            return json.dumps({"userDeleted": True})

        # handles the update user
        if data.get('updateUser'):
            userID = data.get('userID')
            username = data.get('username')
            userPassword = data.get('userPassword')
            user = User.query.filter_by(id=userID).first()
            otherUsers = User.query.filter_by(username=username).all()
            userStatus = {'usernameExists': False}

            for x in otherUsers:
                if x.id != user.id:
                    userStatus['usernameExists'] = True
                    break

            if userStatus['usernameExists']:
                return json.dumps({'userExists': True})
            else:
                # updates user
                user.username = username
                user.password = generate_password_hash(userPassword)

                db.session.commit()

            return json.dumps({'userCreated': True})
