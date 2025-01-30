import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MapComponent from "@/components/ui/MapComponent";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// Load Stripe
const stripePromise = loadStripe("your-stripe-public-key");

const hotels = [
  {
    id: 1,
    name: "Taj Mahal Palace",
    location: "Mumbai",
    position: [18.921984, 72.833068],
    image: "https://source.unsplash.com/600x400/?hotel,taj",
    pricePerNight: 25000,
    description: "A luxurious heritage hotel with sea views and royal hospitality.",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Sea View", "24/7 Room Service"],
    rooms: [
      { type: "Standard Room", price: 15000, capacity: "2 Adults", beds: "1 King Bed" },
      { type: "Deluxe Room", price: 20000, capacity: "2 Adults + 1 Child", beds: "1 King Bed, 1 Sofa Bed" },
      { type: "Luxury Suite", price: 30000, capacity: "4 Adults", beds: "2 King Beds" },
    ],
  },
];

const CheckoutForm = ({ totalCost, points }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert("Payment failed! Please try again.");
    } else {
      alert(`Payment Successful! 🎉 Total: ₹${totalCost}, Points Earned: ${points}`);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <CardElement className="bg-white p-2 rounded-md" />
      <Button type="submit" className="bg-green-500 w-full text-white mt-2" disabled={!stripe}>
        Pay ₹{totalCost}
      </Button>
    </form>
  );
};

const HotelDetailPage = () => {
  const { id } = useParams();
  const hotel = hotels.find((h) => h.id === parseInt(id));

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [nights, setNights] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [points, setPoints] = useState(0);

  if (!hotel) return <h2 className="text-center text-2xl font-bold text-red-600">Hotel Not Found</h2>;

  // Handle Room Selection
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  // Calculate total price when dates change
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setCheckIn(start);
    setCheckOut(end);

    if (start && end) {
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Calculate nights
      setNights(diff);
      const total = selectedRoom.price * diff;
      setTotalCost(total);
      setPoints(Math.floor(total / 100)); // 1 point per ₹100 spent
    }
  };

  return (
    <div className="p-6 flex flex-col items-center bg-gray-900 min-h-screen">
      <Card className="w-full max-w-4xl shadow-lg bg-[#0a192f] text-white p-6 rounded-lg">
        <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover rounded-lg shadow-md" />
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">{hotel.name}</CardTitle>
          <p className="text-gray-400">{hotel.location}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{hotel.description}</p>
          <p className="text-xl font-semibold mt-4 text-blue-400">Price Per Night: ₹{hotel.pricePerNight}</p>

          {/* Room Types */}
          <h3 className="text-lg font-semibold mt-6 text-blue-300">Room Types</h3>
          <div className="mt-2">
            {hotel.rooms.map((room, index) => (
              <div key={index} className="p-4 border rounded-lg mt-2 bg-gray-800 flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-white">{room.type}</p>
                  <p className="text-gray-400">Capacity: {room.capacity}</p>
                  <p className="text-gray-400">Beds: {room.beds}</p>
                  <p className="font-semibold text-blue-400">Price: ₹{room.price}</p>
                </div>
                <Button className="bg-blue-500 text-white" onClick={() => handleRoomSelect(room)}>
                  Book Now
                </Button>
              </div>
            ))}
          </div>

          {/* Map Component */}
          <h3 className="text-lg font-semibold mt-6 text-blue-300">Hotel Location</h3>
          <MapComponent hotels={[hotel]} />
        </CardContent>
      </Card>

      {/* Booking Form Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Book {selectedRoom?.type}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Name</Label>
            <Input type="text" placeholder="Your Name" />

            <Label>Email</Label>
            <Input type="email" placeholder="Your Email" />

            <Label>Phone</Label>
            <Input type="text" placeholder="Your Phone" />

            <Label>Check-in & Check-out</Label>
            <DatePicker
              selected={checkIn}
              onChange={handleDateChange}
              startDate={checkIn}
              endDate={checkOut}
              selectsRange
              className="text-black"
            />

            {nights > 0 && (
              <div className="mt-4">
                <p className="text-lg font-semibold">Total Nights: {nights}</p>
                <p className="text-lg font-semibold text-blue-400">Total Cost: ₹{totalCost}</p>
                <p className="text-lg font-semibold text-green-400">Reward Points: {points}</p>
              </div>
            )}

            {/* Stripe Payment */}
            <Elements stripe={stripePromise}>
              <CheckoutForm totalCost={totalCost} points={points} />
            </Elements>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotelDetailPage;
