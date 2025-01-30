from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager  # 
from flask_migrate import Migrate
from extensions import db, bcrypt  # ✅ Import from extensions.py
from utils.db import init_db
from routes import initialize_routes

app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Load configurations
app.config.from_object('config.Config')

app.config["JWT_SECRET_KEY"] = "your_secret_key_here"
jwt = JWTManager(app)

# Initialize database & bcrypt
db.init_app(app)
bcrypt.init_app(app)  # ✅ Initialize bcrypt
migrate = Migrate(app, db)  # Flask-Migrate

# Initialize routes
initialize_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
