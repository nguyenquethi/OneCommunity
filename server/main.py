from flask import Flask, render_template
from flask_login import LoginManager, login_required
from app.forms import LoginForm
from app.user import User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SECRET_KEY'] = 'mysecretkey'



# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

# Define the login view
@app.route('/login')
def login():
    form = LoginForm()
    return render_template('login.html', form=form)

# Protect a view with the @login_required decorator
@app.route('/dashboard')
@login_required
def dashboard():
    return 'Dashboard page'

if __name__ == '__main__':
    app.run(debug=True)
