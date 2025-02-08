// components/TripForm.js
import React, { useState, useEffect } from 'react';
import { useFormContext } from '../context/FormContext';

const TripForm = () => {
  const { isModalOpen, closeModal, tripData, setTripData } = useFormContext();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (tripData) {
      setTitle(tripData.title);
      setDate(tripData.date);
      setDescription(tripData.description);
      setImageUrl(tripData.imageUrl);
    } else {
      setTitle('');
      setDate('');
      setDescription('');
      setImageUrl('');
    }
  }, [tripData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrip = { title, date, description, imageUrl };
    if (tripData) {
      setTripData(newTrip); // Update the trip in the state
    } else {
      console.log('New Trip: ', newTrip); // Handle adding the trip (save to DB, etc.)
    }
    closeModal();
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
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
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
