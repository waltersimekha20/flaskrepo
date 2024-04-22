from flask import Flask, render_template
from .models import db
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from werkzeug.exceptions import NotFound
from flask_cors import CORS

load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../frontend/build',
    template_folder='../frontend/build'
    )

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)
CORS(app)


migrate = Migrate(app, db)

bcrypt = Bcrypt(app)

db.init_app(app)

@app.errorhandler(NotFound)
def handle_not_found(e):
    return render_template('index.html', title='Homepage', message='Welcome to our website!')

# @app.route('/', methods = ['GET'])
# def index():
#     return render_template('index.html')