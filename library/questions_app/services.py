from library.extensions import db
from library.model.models import Question,User,Answer
from library.library_ma import QuestionSchema,AnswerSchema
from flask import request,redirect,render_template,url_for
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
    title = request.json['title']
    content = request.json['content']
    tag = request.json['tag']
    datetime_posted = datetime.now() 
    datetime_updated = datetime.now()
    asker_id = current_user.id  
    
    try:
        new_question = Question(question= question,title=title,content=content,tag=tag,datetime_updated=datetime_updated, datetime_posted=datetime_posted,asker_id=asker_id)
        db.session.add(new_question)
        db.session.commit()
        return jsonify({'question': new_question.question,
                        'title': new_question.title,
                        'content': new_question.content,
                        'tag': new_question.tag,
                        'datetime_posted': new_question.datetime_posted,
                        'datetime_updated': new_question.datetime_updated,
                        'asker_id': new_question.asker_id})
    except IndentationError:
        db.session.rollback()
        return jsonify({'status': "Can't add new question"})
       

def get_question_services(id):
    question = Question.query.get(id)
    if question:
        question_json = QuestionSchema().dump(question)
        return jsonify(question_json)
    else:
        return jsonify({"status":"Not found question"}), 404
    

def get_all_questions_services():
    questions = Question.query.all()
    if questions:
        questions = QuestionSchema(many=True).dump(questions)
        return jsonify(questions)
    else:
        return jsonify({"status":" not found questions"}), 404
  
        
def update_question_services(id):
    if Question.query.get(id).asker_id != current_user.id:
        return jsonify({"status":" cannot update question"}), 404
    else:
        question = Question.query.get(id)
        if not question:
            return jsonify({"status": "question not found."}), 404
        data = request.get_json()
        if not data:
            return jsonify({"Error": "Invalid request data."}), 400
        question.question = data.get('question', question.question)
        question.datetime_updated = data.get('datetime_updated', datetime.now())
   
        db.session.commit()

        new_question = Question.query.get(id)
        return QuestionSchema().dump(new_question)

    
def delete_question_services(id):
    if Question.query.get(id).asker_id != current_user.id:
        return jsonify({"Error": "Cannot delete question"}), 404
    else:
        question = Question.query.get(id)
        if not question:
            return jsonify({"Error": "Question not found."}), 404
        if question:
            try:
                db.session.delete(question)
                db.session.commit()
                return jsonify({"status": " delete question successfully"})
            except IndentationError:
                db.session.rollback()
                return jsonify({"error":"Can not delete question"})
            
def vote_question(id):
    question = Question.query.filter(id = id).first()
    question.vote_id += 1
    db.session.commit()
    return jsonify({'question': question.question,
                    'vote_id': question.vote_id})
    
        
#settings for features of answers

def add_answer_services(id):
    question_id = Question.query.get(id).id
    respondent_id = current_user.id 
    answer = request.json['answer']
    datetime_posted = datetime.now()
    datetime_updated = datetime.now()
    
    try:
        new_answer = Answer(question_id=question_id,respondent_id=respondent_id,answer=answer,datetime_posted=datetime_posted,datetime_updated=datetime_updated)
        
        db.session.add(new_answer)
        
        db.session.commit()
        
        return jsonify({'answer': new_answer.answer,
                        'question_id': new_answer.question_id,
                        'datetime_posted': new_answer.datetime_posted,
                        'datetime_updated': new_answer.datetime_updated,
                        'respondent_id': new_answer.respondent_id})
    except Exception as e:
        db.session.rollback()
        return jsonify({'Error': e})

 
    
def get_answer_services(id):
    answer = Answer.query.get(id)
    if not answer:
        return jsonify({"error": "An error occurred"}), 404
    else:
        answer_json = AnswerSchema().dump(answer)
        return jsonify(answer_json)
        

def get_all_answers_services():
    answers = Answer.query.all()
    if answer:
        answers = AnswerSchema(many=True).dump(answers)
        return jsonify(answers)
    else:
        return jsonify({"Error":" Not found answers"}), 404
    

def update_answer_services(id):
    if Answer.query.get(id).respondent_id != current_user.id:
        return jsonify({"Error":" Can't update answer"})
    else:
        answer = Answer.query.get(id)
        if not answer:
            return jsonify({"Error": "Answer not found."}), 404
        data = request.get_json()
        if not data:
            return jsonify({"Error": "Invalid request data."}), 400
        answer.answer = data.get('answer', answer.answer)
        answer.datetime_updated = data.get('datetime_updated', datetime.now())
    
        db.session.commit()

        new_answer = Answer.query.get(id)
        return AnswerSchema().dump(new_answer)
    

def delete_answer_services(id):
    if Answer.query.get(id).respondent_id != current_user.id:
        return jsonify({"Error":" Can't delete answer"})
    else:
        answer = Answer.query.get(id)
        if not answer:
            return jsonify({"Error": "Answer not found."}), 404
        if answer:
            try:
                db.session.delete(answer)
                db.session.commit()
                return jsonify({"status":"deleted answer"})
            except IndentationError:
                db.session.rollback()
                return jsonify({"status":"Can not delete answer"})
            
def get_answer_by_question_id_services(id):
    answers = Answer.query.filter_by(question_id=id).all()
    return jsonify({'answers': [a.to_dict() for a in answers]})