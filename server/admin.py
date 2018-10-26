from flask import Blueprint, render_template

bp = Blueprint('admin', __name__, template_folder='./templates')

# admin panel
@bp.route('/admin')
def get():

    return render_template('admin.html')