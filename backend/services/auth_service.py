from extensions import db, bcrypt  # ✅ Import from extensions.py
from models import User
from flask_jwt_extended import create_access_token
from datetime import timedelta

def register_user(data):
    """Registers a new user"""
    username = data.get("username")
    email = data.get("email")
    contact = data.get("contact")
    password = data.get("password")
    role = data.get("role", "user")  # Default role is "user"

    if User.query.filter_by(email=email).first():
        return {"message": "User already exists"}, 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(username=username, email=email, contact=contact, password=hashed_password, role=role)

    db.session.add(new_user)
    db.session.commit()

    return {"message": "User registered successfully"}

def login_user(data):
    """Authenticates user & generates JWT"""
    email = data.get("email")
    password = data.get("password")
    # print(email, password)

    user = User.query.filter_by(email=email).first()
    # print(user)
    # print(user.email, user.password)
    if not user:
        print("NO user")
        return {"message": "Invalid credentials"}, 401
    
    pw_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    if not bcrypt.check_password_hash(pw_hash, password):
        print("invalid creds")
        return {"message": "Invalid credentials"}, 401

    access_token = create_access_token(identity={"id": user.id, "role": user.role}, expires_delta=timedelta(days=1))
    return {"access_token": access_token, "role": user.role}
