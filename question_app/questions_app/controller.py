from flask import Blueprint

questions = Blueprint("questions",__name__)
@questions.route("/get_questions")
def get_questions():
    return f'<h1>Questions</h1>'