from library.extensions import db
from library.model.models import Question,User
from library.library_ma import QuestionSchema
from flask import request
import json

question = QuestionSchema
questions = QuestionSchema(many=True)


def get_question_services():
    question = request.json['question']
    answer = request.json['answer']
    asker_id = request.json['asker_id']
    expert_id = request.json['expert_id']
    try: 
        new_question = Question(question= question, answer= answer,asker_id=asker_id,expert_id=expert_id)
        db.session.add(new_question)
        db.session.commit()
        return "new_question added successfully"
    except IndentationError:
        db.session.rollback()
        return "Can't add new question"
        








