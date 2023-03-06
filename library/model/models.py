# from werkzeug.security import generate_password_hash
from library.extensions import db
from flask_login import UserMixin
from datetime import datetime


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
    
    def __init__(self, id, name, email, password,
                  gender,
                  avatar,phone_number, bio='', date_of_birth='', education='',
                 experience='', year_of_experience=0,
                 reputation=0, expert=False):
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
        foreign_keys='Question.asker_id',
        backref='asker',
        lazy=True
    )
    answer_request = db.relationship(
        'Answer',
        primaryjoin='User.id == Answer.respondent_id',
        backref='expert',
        lazy=True
    )


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    content = db.Column(db.String(255))  
    tag =   db.Column(db.String(255))                    
    datetime_posted = db.Column(db.DateTime, default=datetime.utcnow)
    datetime_updated = db.Column(db.DateTime, default=datetime.utcnow)
    asker_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    rating = db.Column(db.Integer,default=0)
    voted_question = db.relationship('Vote_Question')
    
    def __init__(self, title, content,tag, datetime_updated, 
                 datetime_posted, asker_id, rating = 0):
    
        self.title =title
        self.content =content
        self.tag =tag
        self.datetime_posted = datetime_posted
        self.datetime_updated = datetime_updated
        self.asker_id = asker_id        
        self.rating = rating
    

    def to_dict(self):
        return {
            'id': self.id,
            'asker_id': self.asker_id,
            'rating': self.rating,
            'title':self.title,
            'content': self.content,
            'tag': self.tag
            # add more fields as needed
        }


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.Text)
    datetime_posted = db.Column(db.DateTime, default=datetime.utcnow)
    datetime_updated = db.Column(db.DateTime, default=datetime.utcnow)
    respondent_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    like = db.Column(db.Integer,default=0)
    unlike = db.Column(db.Integer,default=0)
    vote_answer = db.relationship('Vote_Answer')

    def __init__(self, answer, datetime_updated, datetime_posted, respondent_id, question_id, like=0, unlike=0):
        self.answer = answer
        self.datetime_updated = datetime_updated
        self.datetime_posted = datetime_posted
        self.respondent_id = respondent_id
        self.question_id = question_id
        self.like = like
        self.unlike= unlike

    def to_dict(self):
        return {
            'id': self.id,
            'answer': self.answer,
            'question_id': self.question_id,
            'respondent_id': self.respondent_id,
            'up_vote': self.up_vote,
            'down_vote' : self.down_vote
            # add more fields as needed
        }

class Vote_Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    voter_id = db.Column(db.Integer)
    vote = db.Column(db.Integer)
    def __init__(self, vote, question_id, voter_id):
        self.vote = vote
        self.question_id = question_id
        self.voter_id = voter_id
        
class Vote_Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer_id = db.Column(db.Integer, db.ForeignKey('answer.id'))
    voter_id = db.Column(db.Integer)
    react = db.Column(db.Integer)
    def __init__(self, answer_id, voter_id, react):
        self.answer_id = answer_id
        self.voter_id = voter_id
        self.react = react