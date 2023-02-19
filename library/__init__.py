from flask import Flask,request,Blueprint
from flask_bcrypt import Bcrypt
from .questions_app.controller import questions
from .profile_app.controller import profiles
from .extensions import db,ma
from .model.models import User
import os


flask_bcrypt = Bcrypt()

def create_database(app):
    if not os.path.exists('library/sqlite3.db'):
        with app.app_context():
            db.create_all()
            print ("created database!!!")

    

def create_app(config_file='config.py'):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)
    db.init_app(app)
    ma.init_app(app)
    create_database(app)
    app.register_blueprint(questions)
    app.register_blueprint(profiles)
    flask_bcrypt.init_app(app)
    return app
