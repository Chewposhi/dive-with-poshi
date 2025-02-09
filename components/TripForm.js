import React, { useState, useEffect } from 'react';
import { TripContext } from '../context/TripContext';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const defaultLocation = [31.24505425549617, 121.42562708203337]; // Fallback location (Shanghai)

const TripForm = () => {
  const { isModalOpen, closeModal, tripData, setTripData } = TripContext();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [markerLocation, setMarkerLocation] = useState<LatLngTuple | null>(null);

  useEffect(() => {
    if (tripData) {
      setTitle(tripData.title);
      setDate(tripData.date);
      setDescription(tripData.description);
      setImageUrls(tripData.imageUrls || []);
      setMarkerLocation(tripData.location || defaultLocation);
    } else {
      setTitle('');
      setDate('');
      setDescription('');
      setImageUrls([]);
      setMarkerLocation(null);
    }
  }, [tripData]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImageUrls = [...imageUrls];
    if (files) {
      Array.from(files).forEach((file) => {
        if (newImageUrls.length < 9) {
          newImageUrls.push(URL.createObjectURL(file));
        }
      });
    }
    setImageUrls(newImageUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrip = { title, date, description, imageUrls, location: markerLocation };
    if (tripData) {
      setTripData(newTrip); // Update the trip in the state
    } else {
      console.log('New Trip: ', newTrip); // Handle adding the trip (save to DB, etc.)
    }
    closeModal();
  };

  const MapClickEvent = () => {
    const map = useMapEvents({
      click(e) {
        setMarkerLocation([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null; // This component doesn't render anything, just listens for events
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h3 className="text-xl font-bold mb-4">{tripData ? 'Edit Trip' : 'Add New Trip'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image URLs (up to 9)</label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-md"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Location</label>
            <div style={{ height: '200px', width: '100%' }}>
              <MapContainer center={markerLocation || defaultLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickEvent />
                {markerLocation && <Marker position={markerLocation} />}
              </MapContainer>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-teal-500 text-white p-2 rounded-md">
              {tripData ? 'Update Trip' : 'Add Trip'}
            </button>
          </div>
        </form>
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">
          X
        </button>
      </div>
    </div>
  );
};

export default TripForm;
