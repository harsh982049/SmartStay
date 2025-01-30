from models import db, User

def get_loyalty_points(user_id):
    """Fetches user's loyalty points"""
    user = User.query.get(user_id)
    if not user:
        return {"message": "User not found"}, 404

    return {"user_id": user.id, "loyalty_points": user.loyalty_points}

def redeem_loyalty_points(data):
    """Allows user to redeem points for discounts"""
    user_id = data.get("user_id")
    points_to_redeem = data.get("points")

    user = User.query.get(user_id)
    if not user:
        return {"message": "User not found"}, 404

    if user.loyalty_points < points_to_redeem:
        return {"message": "Not enough loyalty points"}, 400

    user.loyalty_points -= points_to_redeem
    db.session.commit()

    return {"message": "Points redeemed successfully", "remaining_points": user.loyalty_points}
