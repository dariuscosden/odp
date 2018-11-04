from flask import current_app as app
from flask import render_template, redirect, request, url_for, flash, session
from werkzeug.security import check_password_hash
from sqlalchemy import desc
from server.models import User, Post
import json

# renders index.html
@app.route('/', methods=('GET', 'POST'), endpoint='home')
@app.route('/admin', methods=('GET', 'POST'))
def index():

    # handles login
    if request.method == 'POST':
        data = request.get_json()
        if data.get('formInput'):
            _username = data['formInput'].get('username')
            _password = data['formInput'].get('password')

            user = User.query.filter_by(username=_username).first()

            if user:
                if check_password_hash(user.password, _password):
                    session['user_id'] = user.id
                    return json.dumps({
                        'authenticated': True,
                        'username': user.username,
                        'password': user.password
                        })
                else:
                    return json.dumps({'authenticated': False})
            else:
                return json.dumps({'authenticated': False})

        # jsonifies posts
        def jsonifyPosts(posts):
            jsonPosts = []

            # checking for next page
            if posts.has_next:
                jsonPosts.append({'morePostsAvailable': True})
            else:
                jsonPosts.append({'morePostsAvailable': False})

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

        # posts
        if data.get('posts'):
            pagesRequested = data.get('pagesRequested')
            posts = Post.query.order_by(desc(Post.dateCreated)).paginate(1, pagesRequested, error_out=True)

            return jsonifyPosts(posts)

        # categories
        if data.get('categories'):
            pagesRequested = data.get('pagesRequested')
            posts = Post.query.order_by(Post.category).paginate(1, pagesRequested, error_out=True)
            jsonCategories = []

            for post in posts.items:
                if post.category not in jsonCategories:
                    jsonCategories.append(post.category)

            return json.dumps(jsonCategories)

        # filter by category
        if data.get('category'):
            category = data.get('category')
            pagesRequested = data.get('pagesRequested')
            posts = Post.query.filter_by(category=category).order_by(desc(Post.dateCreated)).paginate(1, pagesRequested, error_out=True)

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
    return redirect(url_for('home'))