from flask import Blueprint, render_template, redirect, url_for, jsonify, session, request
from .services import sign_up_services, login_services, logout_services, delete_user_services, load_user, see_profile_services, edit_profile_services, change_avatar_services, get_question_by_user_id, get_answer_by_user_id, get_all_users_services, get_info_user_services
from flask_login import login_required, login_user, LoginManager, logout_user, current_user
from library.extensions import login_manager
from library.model.models import User

profiles = Blueprint("profiles", __name__)


@profiles.route('/')
def index():
    return render_template('sign-in.html')


@profiles.route('/login', methods=['POST'])
def login():
    return login_services()


@profiles.route('/home', methods=['GET'])
# @login_required
def home():
    if not current_user.is_authenticated:
        return redirect('/')
    return render_template('home-page.html')


@profiles.route('/api/get_info/<id>')
def get_info(id):
    return get_info_user_services(id)


@profiles.route('/api/get_all_users', methods=['GET'])
def get_all_users():
    return get_all_users_services()


@profiles.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'GET':
        return render_template('sign-up.html')
    elif request.method == 'POST':
        return sign_up_services()


# @profiles.route('/sign_up', methods=['POST'])
# def sign_up():
#      return  sign_up_services() #, render_template('draft.html')


@login_manager.user_loader
def load_user_callback(id):
    return load_user(id)


@profiles.route('/logout', methods=['POST'])
@login_required
def logout():
    return logout_services()


@profiles.route('/delete', methods=['DELETE'])
@login_required
def delete():
    return delete_user_services()


@profiles.route('/api/user/<int:id>', methods=['GET'])
# @login_required
def see_profile(id):
    return see_profile_services(id)


@profiles.route('/user/<int:id>', methods=['GET'])
# @login_required
def see_profile2(id):
    return render_template('profile-page.html', id=id)


@profiles.route('/user/<int:id>/edit', methods=['PUT'])
@login_required
def edit_profile(id):
    return edit_profile_services(id)


@profiles.route('/user/<int:id>/change_avatar', methods=['PUT'])
@login_required
def change_avatar(id):
    return change_avatar_services(id)


@profiles.route('/api/user/<int:id>/questions', methods=['GET'])
@login_required
def get_questions_api(id):
    return get_question_by_user_id(id)


@profiles.route('/api/user/<int:id>/answers', methods=['GET'])
@login_required
def get_answers_api(id):
    return get_answer_by_user_id(id)


@profiles.route('/user/<int:id>/questions', methods=['GET'])
@login_required
def get_questions(id):
    return render_template('profile_page_question.html', id=id)


@profiles.route('/user/<int:id>/answers', methods=['GET'])
@login_required
def get_answers(id):
    return render_template('profile_page_answer.html', id=id)
