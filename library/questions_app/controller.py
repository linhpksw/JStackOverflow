from flask import Blueprint,redirect,render_template,request,url_for
from library.extensions import db
from library.model.models import User, Question
from .services import get_question_services

questions = Blueprint("questions",__name__)

@questions.route('/')
def index():
    questions = Question.query.filter(Question.answer != None).all()
    context = {
        'questions' : questions
    }
    return render_template('home.html', **context)



@questions.route('/questions_manager/question', methods=['POST'])
def add_questions():
    return get_question_services()