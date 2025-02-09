import { api } from './config';

// Get all trips
export const getTrips = async () => {
  try {
    const response = await api.get('/trips');
    return response.data; // Return the list of trips
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};

// Get a specific trip by ID
export const getTripById = async (id) => {
  try {
    const response = await api.get(`/trips/${id}`);
    return response.data; // Return the trip data
  } catch (error) {
    console.error('Error fetching trip:', error);
    throw error;
  }
};

// Create a new trip
export const createTrip = async (tripData) => {
  try {
    const response = await api.post('/trips', tripData);  // Pass the whole tripData object
    return response.data; // Return the newly created trip
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};

// Update an existing trip
export const updateTrip = async (id, tripData) => {
  try {
    const response = await api.put(`/trips/${id}`, tripData);  // Pass the whole tripData object
    return response.data; // Return the updated trip
  } catch (error) {
    console.error('Error updating trip:', error);
    throw error;
  }
};

// Delete a trip
export const deleteTrip = async (id) => {
  try {
    const response = await api.delete(`/trips/${id}`);
    return response.data; // Return success or response message
  } catch (error) {
    console.error('Error deleting trip:', error);
    throw error;
  }
};
