from mainapp import app, bcrypt
from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token
from .models import User, db
from .schemas import UserSchema


@app.route('/register', methods = ["POST"])
def register_user():
    email = request.json['email']
    password = request.json['password']
    username = request.json['username']
    role = request.json['role']

    user_exists = User.query.filter_by(email = email).first()

    if user_exists:
        return jsonify(message  = 'User exists')
    
    hashed_password = bcrypt.generate_password_hash(password)

    new_user = User(username = username, password = hashed_password, email = email, role = role)

    db.session.add(new_user)
    db.session.commit()
    
    return make_response(jsonify({
        "id":new_user.id,
        "email":new_user.email

    }), 200)
    
@app.route('/login', methods = ['POST'])
def login_user():
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email = email).first()

    if user is None:
        return jsonify(message = "Unauthorized")
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify(message = "Incorrect email/password")
    
    access_token = create_access_token(identity=email)

    user_data = UserSchema().dump(user)
    
    return jsonify({
        "access_token":access_token,
        "id":user.id,
        "email":user.email,
        "username":user.username,
        "role":user.role,
        "user_data":user_data
    })