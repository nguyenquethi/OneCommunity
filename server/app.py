from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
import os
import tempfile
from flask_sqlalchemy import SQLAlchemy
from email_validator import validate_email, EmailNotValidError
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from models import db, User


app = Flask(__name__)
CORS(app)

# database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'kittyNeko.GatoChat'  # Replace with a secure secret key

db.init_app(app)
# login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# home page
@app.route('/')
def index():
    return "The application is running"

# Register user
@app.route('/register', methods=['POST'])
def register():
    email = request.form.get('email')
    password = request.form.get('password')

    if not email or not password:
        return jsonify({"status": "failure", "message": "Email and password are required"}), 400

    try:
        valid_email = validate_email(email)
        email = valid_email["email"]
    except EmailNotValidError as e:
        return jsonify({"status": "failure", "message": str(e)}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"status": "failure", "message": "Email already in use"}), 400

    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"status": "success", "message": "User registered successfully"}), 201

# Login
@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')

    if not email or not password:
        return jsonify({"status": "failure", "message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        login_user(user)
        return jsonify({"status": "success", "message": "Logged in successfully"}), 200
    else:
        return jsonify({"status": "failure", "message": "Invalid email or password"}), 400

# Logout
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"status": "success", "message": "Logged out successfully"}), 200

# Get users
@app.route('/users')
def users():
    all_users = User.query.all()
    user_emails = [user.email for user in all_users]
    return jsonify({"users": user_emails})


# run transcription
@app.route('/translate', methods=['POST'])
def translate():
    language_from = request.form.get('language_from')
    language_to = request.form.get('language_to')
    audio_file = request.files.get('audio_file')

    if audio_file:
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            audio_file.save(temp_file.name)
            transcription = whisper.transcribe(temp_file.name)
            os.unlink(temp_file.name)
            return jsonify({"transcription": transcription}), 200
    else:
        return jsonify({"error": "No audio file provided"}), 400




if __name__ == '__main__':
    # create database tables
    with app.app_context():
        db.create_all()
    app.run(debug=True)
