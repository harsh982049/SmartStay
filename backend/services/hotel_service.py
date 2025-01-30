from models import db, Hotel
from flask import request, jsonify

# def get_hotels():
#     """Fetches all hotels"""
#     hotels = Hotel.query.all()
#     return [
#         {
#             "hid": hotel.hid,  # Primary Key
#             "name": hotel.name,
#             "location": hotel.location,
#             "city": hotel.city,  # Added city
#             "rating": hotel.rating  # Added rating
#         }
#         for hotel in hotels
#     ]
    
def get_hotels(page=1, per_page=8):
    """Fetch paginated hotels"""
    hotels_paginated = Hotel.query.paginate(page=page, per_page=per_page, error_out=False)

    return {
        "hotels": [
            {
                "hid": hotel.hid,  # Primary Key
                "name": hotel.name,
                "location": hotel.location,
                "city": hotel.city,  # City added
                "rating": hotel.rating  # Rating added
            }
            for hotel in hotels_paginated.items
        ],
        "total_pages": hotels_paginated.pages,
        "current_page": hotels_paginated.page
    }


def get_hotel_by_id(hotel_id):
    """Fetches details of a specific hotel"""
    hotel = Hotel.query.get(hotel_id)
    if not hotel:
        return {"message": "Hotel not found"}, 404

    return {
        "hid": hotel.hid,
        "name": hotel.name,
        "location": hotel.location,
        "city": hotel.city,  # Added city
        "rating": hotel.rating,  # Added rating
        "description": hotel.description,
        "image_url": hotel.image_url
    }

def search_hotels(query):
    """Search hotels by name, location, or city"""
    hotels = Hotel.query.filter(
        (Hotel.name.ilike(f"%{query}%")) | 
        (Hotel.location.ilike(f"%{query}%")) |
        (Hotel.city.ilike(f"%{query}%"))  # Added search by city
    ).all()

    return [
        {
            "hid": hotel.hid,
            "name": hotel.name,
            "location": hotel.location,
            "city": hotel.city,
            "rating": hotel.rating
        }
        for hotel in hotels
    ]
