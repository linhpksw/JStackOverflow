from flask import Blueprint,redirect,render_template,request,url_for
from library.extensions import db
from library.model.models import User, Question,Answer
from .services import add_question_services, update_question_services, delete_question_services,get_question_services,get_all_questions_services
from flask_login import current_user,login_required

questions = Blueprint("questions",__name__)

@questions.route('/')
def index():
    questions = Question.query.filter(Question.question != None).all()
    answers = Answer.query.filter(Answer.answer != None).all()
    context = {
        'questions' : questions,
        'answers' : answers
    }
    return render_template('home.html', **context)



@questions.route('/questions_manager/add_question', methods=['POST'])
def add_questions():
    return add_question_services()


@questions.route('/questions_manager/questions/<int:id>', methods=['GET'])
def get_question(id):
    return get_question_services(id)


@questions.route('/questions_manager/questions/all_questions', methods=['GET'])
def get_all_questions():
    return get_all_questions_services()


@questions.route('/questions_manager/update_question', methods=['POST','GET'])
@login_required
def update_questions():
    pass

@questions.route('/questions_manager/delete_question', methods=['POST'])
def delete_questions():
    pass