from flask import request, jsonify
from services.user_service import register_user, login_user, get_user_by_id
from services.hotel_service import get_hotels, get_hotel_by_id, search_hotels
from services.booking_service import book_hotel, get_user_bookings, cancel_booking
from services.payment_service import initiate_payment, confirm_payment
from services.loyalty_service import get_loyalty_points, redeem_loyalty_points
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.auth_service import register_user, login_user

def initialize_routes(app):

    # ------------------------- 🟢 USER AUTHENTICATION -------------------------
    @app.route('/register', methods=['POST'])
    def register():
        """Registers a new user or admin"""
        data = request.json
        response = register_user(data)
        return jsonify(response)

    @app.route('/login', methods=['POST'])
    def login():
        """Logs in the user and returns a JWT token"""
        data = request.json
        response = login_user(data)
        return jsonify(response)

    @app.route('/user/<int:user_id>', methods=['GET'])
    def get_user(user_id):
        user = get_user_by_id(user_id)
        return jsonify(user)

    # ------------------------- 🏨 HOTEL MANAGEMENT -------------------------
    @app.route('/hotels', methods=['GET'])
    def get_all_hotels():
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 8, type=int)
        hotels = get_hotels(page, per_page)
        return jsonify(hotels)

    @app.route('/hotels/<int:hotel_id>', methods=['GET'])
    def get_hotel(hotel_id):
        hotel = get_hotel_by_id(hotel_id)
        return jsonify(hotel)

    @app.route('/hotels/search', methods=['GET'])
    def search_hotels_route():
        query = request.args.get('query', '')
        results = search_hotels(query)
        return jsonify(results)

    # ------------------------- 📅 HOTEL BOOKING -------------------------
    @app.route('/bookings', methods=['POST'])
    def book():
        data = request.json
        response = book_hotel(data)
        return jsonify(response), 201

    @app.route('/bookings/<int:user_id>', methods=['GET'])
    def get_bookings(user_id):
        bookings = get_user_bookings(user_id)
        return jsonify(bookings)

    @app.route('/bookings/cancel/<int:booking_id>', methods=['DELETE'])
    def cancel_booking_route(booking_id):
        response = cancel_booking(booking_id)
        return jsonify(response)

    # ------------------------- 💳 PAYMENTS -------------------------
    @app.route('/payments/initiate', methods=['POST'])
    def initiate_payment_route():
        data = request.json
        response = initiate_payment(data)
        return jsonify(response), 200

    @app.route('/payments/confirm', methods=['POST'])
    def confirm_payment_route():
        data = request.json
        response = confirm_payment(data)
        return jsonify(response), 200

    # ------------------------- ⭐ LOYALTY POINTS -------------------------
    @app.route('/loyalty/<int:user_id>', methods=['GET'])
    def get_loyalty(user_id):
        points = get_loyalty_points(user_id)
        return jsonify(points)

    @app.route('/loyalty/redeem', methods=['POST'])
    def redeem_points():
        data = request.json
        response = redeem_loyalty_points(data)
        return jsonify(response), 200
