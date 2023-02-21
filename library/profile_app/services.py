from library.extensions import db
from library.library_ma import UserSchema
from library.model.models import User
from flask import request
import random
from datetime import datetime
import re

user_schema = UserSchema()

def sign_up_services():
    
    id = random.randint(100000, 999999)
    name = request.json['name']
    
    email = request.json['email']
    email_pattern = r'^[a-zA-Z0-9+-.%_]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$'
    if not re.match(email_pattern, email.replace(' ','')):
        return 'Invalid email format'
    
    password = request.json['password']
    password_pattern = r'^[a-zA-Z0-9+-*/%._@#!^\(\)\[\]\{\}\S]{6,}$'
    if not re.match(password_pattern, password):
        return 'Password should have at least 6 characters and should not contain any spaces'
    
    phone_number = request.json['phone_number']
    phone_number_pattern = r'^\d{10,11}$'
    if not re.match(phone_number_pattern, phone_number.replace(' ','')):
        return 'Invalid phone number format'
    
    date_of_birth_str = request.json['date_of_birth']
    date_of_birth = datetime.strptime(date_of_birth_str, '%Y-%m-%d').date()
    
    gender = request.json['gender']
    bio = request.json['bio']
    avatar = request.json['avatar']
    education = request.json['education']
    experience = request.json['experience']
    year_of_experience = request.json['year_of_experience']
    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return "Email address already in use!"
    
    try:
        new_user = User(id=id, name=name, email=email, password=password, phone_number=phone_number, 
                date_of_birth=date_of_birth, gender=gender, bio=bio, avatar=avatar, education=education,
                 experience=experience , year_of_experience = year_of_experience)
        db.session.add(new_user)
        db.session.commit()
        return 'Sign up successfully!'
    except Exception as e:
        db.session.rollback()
        print("An error occurred:", e)
        return "Can not sign up!"

