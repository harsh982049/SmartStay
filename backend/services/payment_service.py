def initiate_payment(data):
    """Starts a payment process"""
    user_id = data.get("user_id")
    booking_id = data.get("booking_id")
    amount = data.get("amount")

    return {"message": "Payment initiated", "payment_id": f"PAY-{booking_id}", "amount": amount}

def confirm_payment(data):
    """Confirms a payment"""
    payment_id = data.get("payment_id")
    status = data.get("status")  # Should be "success" or "failed"

    if status == "success":
        return {"message": "Payment successful", "payment_id": payment_id}
    else:
        return {"message": "Payment failed", "payment_id": payment_id}, 400
