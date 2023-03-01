from flask import Blueprint
from .services import sign_up_services, login_services, logout_services, delete_user_services, load_user, see_profile_services, edit_profile_services, change_avatar_services, get_question_by_user_id, get_answer_by_user_id
from flask_login import login_required, login_user, LoginManager, logout_user, current_user
from library.extensions import login_manager
from library.model.models import User

profiles = Blueprint("profiles", __name__)


@profiles.route('/get_info')
def get_info():
    return 'In4'


@profiles.route('/sign_up', methods=['POST'])
def sign_up():
    return sign_up_services()


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