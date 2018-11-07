from flask import current_app as app
from flask import render_template, redirect, request, url_for, flash, session
from werkzeug.security import check_password_hash
from sqlalchemy import desc, or_
from server.models import User, Post
from server.database import db
import json

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
        d['user'] = post.user.username
        jsonPosts.append(d)

    return json.dumps(jsonPosts)

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
                if check_password_hash(user.password, _password):
                    session['user_id'] = user.id
                    return json.dumps({
                        'authenticated': True,
                        'userID': user.id,
                        'username': user.username
                        })
                else:
                    return json.dumps({'authenticated': False})
            else:
                return json.dumps({'authenticated': False})

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
            postTitle = data.get('postTitle')
            postBody = data.get('postBody')
            postCategory = data.get('postCategory')
            postUser = data.get('postUser')
            user = User.query.filter_by(username=postUser).first()
            post = Post(title=postTitle, body=postBody, user=user, category=postCategory)

            db.session.add(post)
            db.session.commit()

            return json.dumps({"postCreated": True})


        # handles update post
        if data.get('updatePost'):
            postID = data.get('postID')
            postTitle = data.get('postTitle')
            postBody = data.get('postBody')
            post = Post.query.filter_by(id=postID).first()

            # updates post
            post.title = postTitle
            post.body = postBody

            db.session.commit()

            # returns updated post to react
            def updateReact():
                d = {}
                d['postTitle'] = postTitle
                d['postBody'] = postBody

                return json.dumps(d)
            
            return updateReact()

        # handles delete post
        if data.get('deletePost'):
            postID = data.get('postID')
            post = Post.query.filter_by(id=postID).first()
            db.session.delete(post)

            db.session.commit()

            return json.dumps({"postStatus": 'deleted'})
            

    return redirect(url_for('admin'))
