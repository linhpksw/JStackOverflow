import os
from dotenv import load_dotenv
import cloudinary

load_dotenv()

# connect to database
SECRET_KEY = os.environ.get('SECRET_KEY')
SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URL')
SQLALCHEMY_TRACK_MODIFICATIONS = False

# connect to cloudinary server
cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('API_KEY'),
    api_secret=os.getenv('API_SECRET')
    )
