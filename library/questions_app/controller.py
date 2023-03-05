from flask_login import current_user, login_required
from flask import Blueprint, redirect, render_template, request, url_for
from library.extensions import db
from library.model.models import User, Question, Answer
from .services import add_question_services, update_question_services, delete_question_services, get_question_services, get_all_questions_services
from .services import add_answer_services, update_answer_services, delete_answer_services, get_answer_services, get_all_answers_services, get_answer_by_question_id_services
from library.library_ma import QuestionSchema, AnswerSchema
from flask import jsonify

main = Blueprint('main', __name__)

# setup the questions services

# @main.route('/')
# def index():
#     questions = Question.query.filter(Question.question != None).all()
#     answers = Answer.query.filter(Answer.answer != None).all()
#     context = {
#         'questions': questions,
#         'answers': answers

#      }
#     return render_template('home.html', **context)


@main.route('/questions_manager/add_question', methods=['POST'])
@login_required
def add_questions():
    return add_question_services()


@main.route('/questions_manager/questions/<int:id>', methods=['GET'])
@login_required
def get_question(id):
    return get_question_services(id)


@main.route('/questions_manager/questions/all_questions', methods=['GET'])
@login_required
def get_all_questions():
    return get_all_questions_services()


@main.route('/questions_manager/questions/<int:id>', methods=['PUT'])
@login_required
def update_questions(id):
    return update_question_services(id)


@main.route('/questions_manager/questions/<int:id>', methods=['DELETE'])
@login_required
def delete_questions(id):
    return delete_question_services(id)


# setup the answer services

@main.route('/answers_manager/add_answers/<int:id>', methods=['POST'])
@login_required
def add_answer(id):
    return add_answer_services(id)


@main.route('/answers_manager/answers/<int:id>', methods=['GET'])
@login_required
def get_answer(id):
    return get_answer_services(id)


@main.route('/answers_manager/answers/get_all_answers', methods=['GET'])
@login_required
def get_all_answers():
    return get_all_answers_services()


@main.route('/answers_manager/answers/update_answer/<int:id>', methods=['PUT'])
@login_required
def update_answer(id):
    return update_answer_services(id)


@main.route('/answers_manager/answers/delete_answer/<int:id>', methods=['DELETE'])
@login_required
def delete_answer(id):
    return delete_answer_services(id)

@main.route('/questions_manager/questions/<int:id>/answers', methods=['GET'])
@login_required
def get_answer_by_question_id(id):
    return get_answer_by_question_id_services(id)