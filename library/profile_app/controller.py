from flask import Blueprint, render_template, redirect, url_for, jsonify
from .services import sign_up_services, login_services, logout_services, delete_user_services, load_user, see_profile_services, edit_profile_services, change_avatar_services, get_question_by_user_id, get_answer_by_user_id
from flask_login import login_required, login_user, LoginManager, logout_user, current_user
from library.extensions import login_manager
from library.model.models import User

profiles = Blueprint("profiles", __name__)

@profiles.route('/')
def index():
    return render_template('draft.html')

@profiles.route('/api/get_info/<id>')
def get_info(id):
    found_user = User.query.get(id)
    
    if found_user:
        return jsonify({"name": found_user.name,
                        "date of birth": found_user.date_of_birth,
                        "gender": found_user.gender,
                        "bio": found_user.bio,
                        "education": found_user.education,
                        "experience": found_user.experience,
                        "year_of_experience": found_user.year_of_experience,
                        "avatar": found_user.avatar}) 
    

@profiles.route('/sign_up', methods=['POST'])
def sign_up():
     return  sign_up_services() #, render_template('draft.html')


@profiles.route('/login', methods=['POST'])
def login():
    return login_services()


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


@profiles.route('/user/<int:id>', methods=['GET'])
@login_required
def see_profile(id):
    return see_profile_services(id)


@profiles.route('/user/<int:id>/edit', methods=['PUT'])
@login_required
def edit_profile(id):
    return edit_profile_services(id)


@profiles.route('/user/<int:id>/change_avatar', methods=['PUT'])
@login_required
def change_avatar(id):
    return change_avatar_services(id)


@profiles.route('/user/<int:id>/questions', methods=['GET'])
@login_required
def get_questions(id):
    return get_question_by_user_id(id)


@profiles.route('/user/<int:id>/answers', methods=['GET'])
@login_required
def get_answers(id):
    return get_answer_by_user_id(id)
