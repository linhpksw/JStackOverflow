from flask import Flask,request,Blueprint
from flask_bcrypt import Bcrypt
from .questions_app.controller import questions
from .extensions import db

flask_bcrypt = Bcrypt()

def create_app(config_file='config.py'):
    app = Flask(__name__)
    
    app.config.from_pyfile(config_file)
    db.init_app(app)
    app.register_blueprint(questions)
    flask_bcrypt.init_app(app)
    return app
