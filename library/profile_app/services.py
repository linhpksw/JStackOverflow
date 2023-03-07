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
users_schema = UserSchema(many = True)

def sign_up_services():

    id = random.randint(100000, 999999)
    name = request.values.get('name')
    email = request.values.get('email')
    if email is None or email.strip() == '':
        return jsonify({'status':'Email field is required'})
    email_pattern = r'^[a-zA-Z0-9+-.%_]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$'
    if not re.match(email_pattern, email):
        return jsonify({'status':'Invalid email format'})

    password = request.values.get('password')
    password_pattern = r'^[a-zA-Z0-9+-.*/%_@#!^]{6,}$'
    if not re.match(password_pattern, password):
        return jsonify({'status':'Password should have at least 6 characters and should not contain any spaces'})
    else:
        password = generate_password_hash(password)

    phone_number = request.values.get('phone_number')
    phone_number_pattern = r'^\d{10,11}$'
    if not re.match(phone_number_pattern, phone_number):
        return jsonify({'status':'Invalid phone number format'})

    date_of_birth_str = request.values.get('date_of_birth')
    if date_of_birth_str != None:
        date_of_birth = datetime.strptime(date_of_birth_str, '%Y-%m-%d').date()

    gender = request.values.get('gender')
    bio = request.values.get('bio')
    avatar = get_path_image(request)
    education = request.values.get('education')
    experience = request.values.get('experience')
    year_of_experience = request.values.get('year_of_experience')

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'status':"Email address already in use!"})

    try:
        new_user = User(id=id, name=name, email=email, password=password, phone_number=phone_number,
                        date_of_birth=date_of_birth, gender=gender, bio=bio, avatar=avatar, education=education,
                        experience=experience, year_of_experience=year_of_experience)
        db.session.add(new_user)
        db.session.commit()
        return render_template('sign-in.html')
    except Exception as e:
        db.session.rollback()
        print("An error occurred:", e)
        return jsonify({"error":"cannot sign up"})

    

def login_services():
    email = request.json.get('email')
    password = request.json.get('password')

    found_user = User.query.filter_by(email=email).first()
    if not found_user:
        return jsonify({"status":"email not found"})
    else:
        
        if password and check_password_hash(found_user.password, password):
            try:
                login_user(found_user)
                # return render_template('home-page.html')
                return jsonify({"id":found_user.id,
                                "status":"sign in successfully"})
            except Exception as e:
                print("error:",e)
                return jsonify({"status":"cannot login"})
        else:
            return jsonify({"error":"incorrect password"})




def load_user(id):
    return User.query.get(int(id))


def logout_services():
    logout_user()
    return jsonify({'success':'logout successfully'})


def delete_user_services():
    id = request.json.get('id')
    if id == current_user.id:
        # found_user = User.query.filter_by(id=id).first()
        # if found_user:
        db.session.delete(current_user)
        db.session.commit()
        return jsonify({'success':'delete successfully'})
    else:
        return jsonify({'error':'delete failed'})


def edit_profile_services(id):

    if id != current_user.id:
        # found_user = User.query.get(id)
        return jsonify({'error':'You are not allowed to edit this profile'})
    data = request.json
    if not data:
        return jsonify({'error':'No need to edit'})
    infor = ["name", "bio", "education", "experience", "year_of_experience","gender"]
    if "date_of_birth" in data:
        date_of_birth = datetime.strptime(
            data.get("date_of_birth"), '%Y-%m-%d').date()
        update = {"date_of_birth": date_of_birth}

    update = {in4: data.get(in4) for in4 in infor if in4 in data}
    try:
        User.query.filter_by(id=id).update(update)
        db.session.commit()
        return jsonify({'success':'Edit successfully'})
    except Exception as e:
        db.session.rollback()
        print("An error occurred:", e)
        return jsonify({'error':'Cannot edit profile'})


def change_avatar_services(id):
    if id != current_user.id:
        return jsonify({'error':'You are not allowed to edit this profile'})
    # avatar = request.values
    try:
        current_user.avatar = get_path_image(request)
        db.session.commit()
        return jsonify({"success":"change avatar successfully"})
    except Exception as e:
        db.session.rollback()
        print("An error occurred:", e)
        return jsonify({"error":"Cannot change avatar"})


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
                                        "avatar": found_user.avatar,
                                        "id": found_user.id,
                                        "date_of_birth": found_user.date_of_birth})  
    except Exception as e:
        print('an error occur:', e)
        return jsonify({"Error:", e}) 
    else:
        return "Not found!"



def get_question_by_user_id(id):
    questions = Question.query.filter_by(asker_id=id).all()
    return jsonify({'questions': [q.to_dict() for q in questions]})


def get_answer_by_user_id(id):
    answers = Answer.query.filter_by(respondent_id=id).all()
    return jsonify({'answers': [a.to_dict() for a in answers]})



def get_path_image(request):
    file = request.files.get('avatar', None)
    # check if user has uploaded file, save the path
    if file is not None:
        res = cloudinary.uploader.upload(file)
        return res['secure_url']
    else:
        return "https://res.cloudinary.com/dpybsqrhy/image/upload/v1678178336/Screenshot_2023-03-07_153621_hg11np.png"


def get_all_users_services():
    users = User.query.all()
    if users:
        users = UserSchema(many=True).dump(users)
        return jsonify(users)
    else:
        return jsonify({"Error": " No questions"}), 404
    
def get_info_user_services(id):
    found_user = User.query.get(id)
    
    if found_user:
        found_user = UserSchema().dump(found_user)
        return jsonify(found_user)
    else:
        return jsonify({"Error": " No user"}), 404