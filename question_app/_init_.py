from flask import Flask,request,Blueprint
from .questions_app.controller import questions


def create_app(config_file='config.py'):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)
    app.register_blueprint(questions)
    return app
