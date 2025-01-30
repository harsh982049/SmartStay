from models import db, Transaction
from datetime import datetime

def book_hotel(data):
    """Creates a new hotel booking in the Transaction table"""
    user_id = data.get("user_id")
    hid = data.get("hid")  # Hotel ID
    hotel_name = data.get("hotel_name")
    amount = data.get("amount")  # Total cost of booking
    room_type = data.get("room_type")
    start_date = datetime.strptime(data.get("start_date"), "%Y-%m-%d")
    end_date = datetime.strptime(data.get("end_date"), "%Y-%m-%d")
    adults = data.get("adults", 1)
    children = data.get("children", 0)
    payment_mode = data.get("payment_mode")

    # Creating a new transaction entry
    new_booking = Transaction(
        user_id=user_id,
        hid=hid,
        hotel_name=hotel_name,
        amount=amount,
        room_type=room_type,
        start_date=start_date,
        end_date=end_date,
        adults=adults,
        children=children,
        payment_mode=payment_mode
    )
    
    db.session.add(new_booking)
    db.session.commit()

    return {"message": "Booking successful", "booking_id": new_booking.id}

def get_user_bookings(user_id):
    """Fetches all bookings for a user from Transaction table"""
    bookings = Transaction.query.filter_by(user_id=user_id).all()

    return [{
        "booking_id": booking.id,
        "hotel_name": booking.hotel_name,
        "amount": booking.amount,
        "room_type": booking.room_type,
        "start_date": booking.start_date.strftime("%Y-%m-%d"),
        "end_date": booking.end_date.strftime("%Y-%m-%d"),
        "adults": booking.adults,
        "children": booking.children,
        "payment_mode": booking.payment_mode
    } for booking in bookings]

def cancel_booking(booking_id):
    """Cancels a booking (Deletes from Transaction Table)"""
    booking = Transaction.query.get(booking_id)
    if not booking:
        return {"message": "Booking not found"}, 404

    db.session.delete(booking)
    db.session.commit()
    return {"message": "Booking cancelled successfully"}
