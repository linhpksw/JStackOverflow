from library.extensions import db
from library.model.models import question
from library.library_ma import questionSchema

question = questionSchema
questions = questionSchema(many=True)








