from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import LoginManager
ma = Marshmallow()
db = SQLAlchemy()
login_manager = LoginManager()