from library.extensions import db
from library.model.models import Question,User,Answer
from library.library_ma import QuestionSchema, AnswerSchema
from flask import request
from datetime import datetime
from flask_login import LoginManager,current_user,login_required
from flask import jsonify
import json

question = QuestionSchema()
questions = QuestionSchema(many=True)
answer = AnswerSchema()
answers = AnswerSchema(many=True)


login_manager = LoginManager()


#settings for features of questions

def add_question_services():
    question = request.json['question']
    datetime_posted = datetime.now() 
    datetime_updated = datetime.now()
    asker_id = current_user.id   #request.json['asker_id']
    
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
    #print(question.asker_id)
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
    question.datetime_updated = data.get('datetime_updated', datetime.now())
   
    db.session.commit()

    new_question = Question.query.get(id)
    return QuestionSchema().dump(new_question)

    

def delete_question_services(id):
    question = Question.query.get(id)
    if not question:
        return jsonify({"Error": "Question not found."}), 404
    if question:
        try:
            db.session.delete(question)
            db.session.commit()
            return "deleted question!!!"
        except IndentationError:
            db.session.rollback()
            return "Can not delete question!"
        
        
#settings for features of answers

def add_answer_services(id):
    question_id = id#request.json['question_id']
    respondent_id = current_user.id #request.json['respondent_id']
    answer = request.json['answer']
    datetime_posted = datetime.now()
    datetime_updated = datetime.now()
    
    try:
        new_answer = Answer(question_id=question_id,respondent_id= respondent_id,
                            answer=answer,datetime_posted=datetime_posted,datetime_updated=datetime_updated)
        db.session.add(new_answer)
        db.session.commit()
        return "answer added in database!!!"
    except Exception as e:
        db.session.rollback()
        print("An error occurred:", e)
        return "Can not add answer in database!!!"
 
    

def get_answer_services(id):
    pass

def get_all_answers_services():
    pass

def update_answer_services(id):
    pass

def delete_answer_services(id):
    pass
        







