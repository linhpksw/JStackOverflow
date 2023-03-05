from library.extensions import db
from library.library_ma import UserSchema, QuestionSchema, AnswerSchema
from library.model.models import User, Question, Answer
from flask import request, jsonify, render_template, redirect, url_for
import random
from datetime import datetime
import re
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import login_required, login_user, LoginManager, logout_user, current_user
import cloudinary.uploader


user_schema = UserSchema()


def sign_up_services():

    id = random.randint(100000, 999999)
    name = request.values.get('name')
    email = request.values.get('email')
    email_pattern = r'^[a-zA-Z0-9+-.%_]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$'
    if not re.match(email_pattern, email):
        return 'Invalid email format'

    password = request.values.get('password')
    password_pattern = r'^[a-zA-Z0-9+-.*/%_@#!^]{6,}$'
    if not re.match(password_pattern, password):
        return 'Password should have at least 6 characters and should not contain any spaces'
    else:
        password = generate_password_hash(password)

    phone_number = request.values.get('phone_number')
    phone_number_pattern = r'^\d{10,11}$'
    if not re.match(phone_number_pattern, phone_number):
        return 'Invalid phone number format'

    date_of_birth_str = request.values.get('date_of_birth')
    print(date_of_birth_str)
    print(type(date_of_birth_str))
    if date_of_birth_str != None:
        date_of_birth = datetime.strptime(date_of_birth_str, '%Y-%m-%d').date()

    gender = request.values.get('gender')
    bio = request.values.get('bio')
    # avatar = request.json.get('avatar')
    avatar = get_path_image(request)
    education = request.values.get('education')
    experience = request.values.get('experience')
    year_of_experience = request.values.get('year_of_experience')

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return "Email address already in use!"

    try:
        new_user = User(id=id, name=name, email=email, password=password, phone_number=phone_number,
                        date_of_birth=date_of_birth, gender=gender, bio=bio, avatar=avatar, education=education,
                        experience=experience, year_of_experience=year_of_experience)
        db.session.add(new_user)
        db.session.commit()
        return render_template('id.html', id = new_user.id)
    except Exception as e:
        db.session.rollback()
        print("An error occurred:", e)
        return "Can not sign up!"

    

def login_services():
    email = request.json.get('email')
    password = request.json.get('password')

    found_user = User.query.filter_by(email=email).first()
    if not found_user:
        return "email has not been"
    else:
        if password and check_password_hash(found_user.password, password):
            login_user(found_user)
            return 'login up successfully'
        else:
            return "Password is incorrect!"


'''
def login_services():
    email = request.json.get('email')
    password = request.json.get('password')


    found_user = User.query.filter_by(email=email).first()
    if not found_user:
        return 'Email has not been registered'
    else:
        if password and check_password_hash(found_user.password, password):
            login_user(found_user)
            return 'Login successfully!'
        else:
            return 'Incorrect password!'


def load_user(id):
    return User.query.get(int(id))


'''


def load_user(id):
    return User.query.get(int(id))


def logout_services():
    logout_user()
    return 'Logout successfully!'


def delete_user_services():
    id = request.json.get('id')
    if id == current_user.id:
        # found_user = User.query.filter_by(id=id).first()
        # if found_user:
        db.session.delete(current_user)
        db.session.commit()
        return 'Delete successfully!'
    else:
        return 'Cannot delete user!'


def edit_profile_services(id):

    if id != current_user.id:
        # found_user = User.query.get(id)
        return "You are not allowed to edit this profile"
    data = request.json
    if not data:
        return "No need to edit"
    infor = ["name", "bio", "education", "experience", "year_of_experience"]
    if "date_of_birth" in data:
        date_of_birth = datetime.strptime(
            data.get("date_of_birth"), '%Y-%m-%d').date()
        update = {"date_of_birth": date_of_birth}

    update = {in4: data.get(in4) for in4 in infor if in4 in data}
    try:
        User.query.filter_by(id=id).update(update)
        db.session.commit()
        return 'Edit successfully'
    except Exception as e:
        db.session.rollback()
        print("An error occurred:", e)
        return "Cannot edit profile"


def change_avatar_services(id):
    if id != current_user.id:
        return "You are not allowed to edit this profile"
    # avatar = request.values
    try:
        current_user.avatar = get_path_image(request)
        db.session.commit()
        return "change avatar successfully"
    except Exception as e:
        db.session.rollback()
        print("An error occurred:", e)
        return "Cannot change avatar"


def see_profile_services(id):
    found_user = User.query.get(id)
    try:
        if found_user:
            return user_schema.jsonify({"name": found_user.name,
                                        "date of birth": found_user.date_of_birth,
                                        "gender": found_user.gender,
                                        "bio": found_user.bio,
                                        "education": found_user.education,
                                        "experience": found_user.experience,
                                        "year_of_experience": found_user.year_of_experience,
                                        "avatar": found_user.avatar})  # , get_question_by_user_id(id), get_answer_by_user_id(id)
    except Exception as e:
        print('an error occur:', e)
        return "csfdfsf"  # "avatar": found_user.avatar})
    else:
        return "Not found!"


'''(self, id, name, email, password,
                 phone_number, date_of_birth, gender,
                 bio, avatar, education = None,
                 experience = None, year_of_experience = None, 
                 reputation=0, expert= False):'''


def get_question_by_user_id(id):
    questions = Question.query.filter_by(asker_id=id).all()
    return jsonify({'questions': [q.to_dict() for q in questions]})


def get_answer_by_user_id(id):
    answers = Answer.query.filter_by(respondent_id=id).all()
    return jsonify({'answers': [a.to_dict() for a in answers]})


# def calculate_reputation_services(id):
#     answers = Answer.query.filter_by(respondent_id=id).all()
#     repu = 0
#     for answer in answers:
#         repu += (answer.lide_id - answer.unlide_id)
#     user =  User.query.filter_by(id=id).first()
#     user.reputaion = repu


def get_path_image(request):
    file = request.files.get('avatar', None)
    # check if user has uploaded file, save the path
    if file is not None:
        res = cloudinary.uploader.upload(file)
        return res['secure_url']
    else:
        return "https://res.cloudinary.com/dxu6nsoye/image/upload/v1649821452/z3336574163217_bc5927ec38c68b516f13b300443dfcac_zouzvp.jpg"


