# from flask_sqlalchemy import SQLAlchemy
# # from flask_bcrypt import Bcrypt

# db = SQLAlchemy()

from extensions import db

# 🟢 User Table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    contact = db.Column(db.String(15), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    loyalty_points = db.Column(db.Integer, default=0)  # New Field: Loyalty Points
    role = db.Column(db.String(10), nullable=False, default="user")  # Either 'admin' or 'user'

    transactions = db.relationship('Transaction', backref='user', lazy=True)

# 🏨 Hotels Table (With Multiple Room Types)
class Hotel(db.Model):
    hid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(255), nullable=False)  # Includes city
    city = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Float, nullable=False, default=3.0)  # ⭐ Updated: Only one rating field
    rating_description = db.Column(db.String(50), nullable=True)
    total_rooms = db.Column(db.Integer, nullable=False, default=50)  # Default 50 rooms
    room_types = db.Column(db.JSON, nullable=False)  # JSON: {"Single": 10, "Double": 5, "Suite": 3}
    rooms_booked = db.Column(db.Integer, nullable=False, default=0)  # Initially, no rooms booked

    def __repr__(self):
        return f"<Hotel {self.name} - {self.city}>"

# 🔄 Transactions Table (Used for Hotel Bookings)
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    room_type = db.Column(db.String(100), nullable=False)
    hid = db.Column(db.Integer, db.ForeignKey('hotel.hid'), nullable=False)  # ✅ Corrected ForeignKey
    hotel_name = db.Column(db.String(120), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    adults = db.Column(db.Integer, nullable=False)
    children = db.Column(db.Integer, nullable=False)
    payment_mode = db.Column(db.String(50), nullable=False)

# ⭐ Reviews Table (Now Supports Decimal Ratings)
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Each review is from a user
    hid = db.Column(db.Integer, db.ForeignKey('hotel.hid'), nullable=False)  # ✅ Corrected ForeignKey
    review_text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)  # ⭐ Supports decimal values (e.g., 4.5)
