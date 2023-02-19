from flask import Blueprint
from .services import register

profiles = Blueprint("profiles", __name__)

@profiles.route('/get_info')
def get_info():
    return 'In4'

@profiles.route('/sign_up', methods = ['POST'])
def sign_up():
    return register()
