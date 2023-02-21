from werkzeug.security import generate_password_hash
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
                 bio, avatar, education = '',
                 experience = '', year_of_experience = '', 
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
            'question',
            foreign_keys= 'Question.asker_id',
            backref='asker',
            lazy = True
        )
        answer_request = db.relationship(
            'question',
            foreign_keys= 'Question.expert_id',
            backref='expert',
            lazy = True
        )
    
        @property
        def password(self):
            raise AttributeError('Cannot view password!')
        @password.setter
        def password(self, password):
            self.password = generate_password_hash(password)
   
           
class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text)
    answer = db.Column(db.Text)
    asker_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    expert_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    def __init__(self,question,answer,asker_id,expert_id):
        self.question = question
        self.answer = answer
        self.asker_id = asker_id
        self.expert_id = expert_id
    

     
        
