import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = ({ hotels }) => {
  if (!hotels || hotels.length === 0) return <p className="text-red-500">No location available.</p>;

  return (
    <div className="bg-[#0a192f] p-4 rounded-lg shadow-md">
      <MapContainer center={hotels[0].position} zoom={10} style={{ height: "400px", width: "100%" }} className="rounded-lg shadow-md">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {hotels.map((hotel) => (
          <Marker key={hotel.id} position={hotel.position} icon={customIcon}>
            <Popup>
              <h3 className="font-bold">{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p className="text-blue-500 font-semibold">{hotel.pricePerNight}</p>
              <p className="text-gray-600">{hotel.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;