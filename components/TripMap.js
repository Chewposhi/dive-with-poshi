import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ trips }) => {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 }); // Default position

  // Optionally set to center based on user data or other criteria
  useEffect(() => {
    if (trips && trips.length > 0) {
      const firstTrip = trips[0];
      setPosition({ lat: firstTrip.latitude, lng: firstTrip.longitude });
    }
  }, [trips]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {trips.map((trip, index) => (
        <Marker
          key={index}
          position={{ lat: trip.latitude, lng: trip.longitude }}
        >
          <Popup>
            <strong>{trip.title}</strong>
            <br />
            {trip.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
