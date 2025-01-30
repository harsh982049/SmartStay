from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

def register_user(data):
    """Registers a new user"""
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "customer")  # Default role is 'customer'

    if User.query.filter_by(email=email).first():
        return {"message": "User already exists"}, 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return {"message": "User registered successfully", "user_id": new_user.id}

def login_user(data):
    """Authenticates a user"""
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return {"message": "Invalid credentials"}, 401

    return {"message": "Login successful", "user_id": user.id, "role": user.role}

def get_user_by_id(user_id):
    """Fetches user details by ID"""
    user = User.query.get(user_id)
    if not user:
        return {"message": "User not found"}, 404

    return {"user_id": user.id, "email": user.email, "role": user.role}
