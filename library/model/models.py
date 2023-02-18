from werkzeug.security import generate_password_hash
from library.extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(255))
    bio = db.Column(db.String(1000))
    avatar = db.Column(db.String(1000))
    reputation = db.Column(db.Integer, default = 0)
    expert = db.Column(db.Boolean)

    def repu(self):
        pass
    
    def __init__(self,name, email, password,
                 phone_number, date_of_birth, gender,
                 bio, avatar,expert):
        self.name = name
        self.email = email
        self.password = password
        self.phone_number = phone_number
        self.date_of_birth = date_of_birth
        self.gender = gender
        self.bio = bio
        self.avatar = avatar
        self.expert = expert
        self.repu()

        question_asker = db.relationship(
            'question',
            foreign_keys= 'question.asker_id',
            backref='asker',
            lazy = True
        )
        answer_request = db.relationship(
            'question',
            foreign_keys= 'question.except_id',
            backref='expert',
            lazy = True
        )
    
        @property
        def password(self):
            raise AttributeError('Cannot view password!')
        @password.setter
        def password(self, password):
            self.password = generate_password_hash(password)
   
           
class question(db.Model):
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
    

     
        
