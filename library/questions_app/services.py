from library.extensions import db
from library.model.models import Question,User,Answer
from library.library_ma import QuestionSchema
from flask import request
from datetime import datetime
import json

question = QuestionSchema
questions = QuestionSchema(many=True)


def get_question_services():
    question = request.json['question']
    datetime_posted = datetime.now()
    datetime_update = datetime.now() 
    asker_id = request.json['asker_id']
    vote_id = request.json['vote_id']
    try:
        new_question = Question(question= question,datetime_updated=datetime_update, datetime_posted=datetime_posted,asker_id=asker_id,vote_id=vote_id)
        db.session.add(new_question)
        db.session.commit()
        return "New question successfully!!!"
    except IndentationError:
        db.session.rollback()
        return "Can't add new question"
        
def update_question_services():
    pass


def delete_question_services():
    pass
 








