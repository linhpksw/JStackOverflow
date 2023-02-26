from library.extensions import db
from library.model.models import Question,User,Answer
from library.library_ma import QuestionSchema
from flask import request
from datetime import datetime
from flask_login import LoginManager,current_user,login_required
from flask import jsonify
import json

question = QuestionSchema()
questions = QuestionSchema(many=True)


login_manager = LoginManager()


def add_question_services():
    question = request.json['question']
    datetime_posted = datetime.now() 
    datetime_updated = datetime.now()
    asker_id = request.json['asker_id']
    
    try:
        new_question = Question(question= question,datetime_updated=datetime_updated, datetime_posted=datetime_posted,asker_id=asker_id)
        db.session.add(new_question)
        db.session.commit()
        return "New question successfully!!!"
    except IndentationError:
        db.session.rollback()
        return "Can't add new question"
       

def get_question_services(id):
    question = Question.query.get(id)
    if question:
        question_json = QuestionSchema().dump(question)
        return jsonify(question_json)
    else:
        return jsonify({"Error":"Not found question"}), 404
    

def get_all_questions_services():
    questions = Question.query.all()
    if questions:
        questions = QuestionSchema(many=True).dump(questions)
        return jsonify(questions)
    else:
        return jsonify({"Error":" No questions"}), 404
        
def update_question_services(id):
    question = Question.query.get(id)
    if not question:
        return jsonify({"Error": "Question not found."}), 404
    data = request.get_json()
    if not data:
        return jsonify({"Error": "Invalid request data."}), 400
    question.question = data.get('question', question.question)
    question.datetime_update = data.get('datetime_update', datetime)
   
    db.session.commit()

    new_question = Question.query.get(id)
    return QuestionSchema().dump(new_question)

    

def delete_question_services(id):
        
    pass
 








