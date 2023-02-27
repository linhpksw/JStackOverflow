from werkzeug.security import generate_password_hash
from datetime import datetime
from library.extensions import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(255))
    bio = db.Column(db.String(1000))
    avatar = db.Column(db.String(1000))
    education = db.Column(db.String(255))
    experience = db.Column(db.String(255))
    year_of_experience = db.Column(db.Integer)
    reputation = db.Column(db.Integer, default=0)
    expert = db.Column(db.Boolean, default=False)
    def __init__(self, id, name, email, password,
                 phone_number, date_of_birth, gender,
                 bio, avatar, education = None,
                 experience = None, year_of_experience = None, 
                 reputation=0, expert= False):
        self.id = id 
        self.name = name
        self.email = email
        self.password = password
        self.phone_number = phone_number
        self.date_of_birth = date_of_birth
        self.gender = gender
        self.bio = bio
        self.avatar = avatar
        self.education = education
        self.experience = experience
        self.year_of_experience = year_of_experience
        self.reputation = reputation
        self.expert = expert
       
    question_asker = db.relationship(
        'Question',
        foreign_keys= 'Question.asker_id',
        backref='asker',
        lazy = True
    )
    answer_request = db.relationship(
        'Answer',
        primaryjoin= 'User.id == Answer.respondent_id',
        backref='expert',
        lazy = True
    )
    
'''
    @property
    def password_hash(self):
        raise AttributeError('Cannot view password!')
    @password_hash.setter
    def password_hash(self, password_hash):
        self.password_hash = generate_password_hash(password_hash)
''' 

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text)
    datetime_posted = db.Column(db.DateTime,default=datetime.utcnow)
    datetime_updated = db.Column(db.DateTime, default = datetime.utcnow)
    asker_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    vote_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    def __init__(self,question,datetime_updated,datetime_posted,asker_id,vote_id = None):
        self.question = question
        self.datetime_posted = datetime_posted
        self.datetime_updated = datetime_updated
        self.asker_id = asker_id
        self.vote_id = vote_id
        
class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.Text)
    datetime_posted = db.Column(db.DateTime,default=datetime.utcnow)
    datetime_updated = db.Column(db.DateTime,default=datetime.utcnow)
    respondent_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    question_id = db.Column(db.Integer,db.ForeignKey('question.id'))
    like_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    unlike_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    
    def __init__(self,answer,datetime_updated,datetime_posted,respondent_id,question_id,like_id = None,unlike_id = None):
        self.answer = answer
        self.datetime_updated = datetime_updated
        self.datetime_posted = datetime_posted
        self.respondent_id = respondent_id
        self.question_id = question_id
        self.like_id = like_id
        self.unlike_id = unlike_id
    
    

     
        
