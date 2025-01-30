import json
from models import db, Hotel
from app import app  # Import your Flask app instance

# Load JSON data
with open("C:\\Users\\harsh\\OneDrive\\Desktop\\React\\Job-Portal\\public\\hotels.json", "r", encoding="utf-8") as file:
    hotel_data = json.load(file)

# Function to insert data into the database
def insert_hotels():
    with app.app_context():
        for hotel in hotel_data:
            name = hotel.get("Hotel Name")
            location = hotel.get("Location", "Unknown Location")
            city = hotel.get("City", "Unknown City")
            rating = hotel.get("Rating", 3.0)  # ✅ Star rating removed, only using `rating`
            rating_description = hotel.get("Rating Description", "Good")

            # Generate default room types
            room_types = {
                "Single": 10,
                "Double": 5,
                "Suite": 3
            }

            # Create a new hotel entry
            new_hotel = Hotel(
                name=name,
                location=location,
                city=city,
                rating=rating,  # ⭐ Now stores actual star rating
                rating_description=rating_description,
                total_rooms=sum(room_types.values()),  # Total rooms calculated
                room_types=room_types
            )

            db.session.add(new_hotel)

        db.session.commit()
        print("✅ Hotels inserted successfully!")

# Run the script
if __name__ == "__main__":
    insert_hotels()
