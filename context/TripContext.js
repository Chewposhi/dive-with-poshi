import React, { createContext, useState, useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"; // Import geocoding functions
import imageCompression from "browser-image-compression"; // Import the image compression library
import { createTrip, updateTrip, getTrips, deleteTrip } from '../api/TripApi'; // Import necessary functions

// Create a context to handle the form state
export const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "", // Added location state
        latitude: "", // Added latitude state
        longitude: "", // Added longitude state
        images: [], // Added images state
        duration: "", // Added duration state
    });
    const [trips, setTrips] = useState([]); // State to hold the list of trips
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track loading

    // Fetch trips when the component mounts
    useEffect(() => {
        const fetchAllTrips = async () => {
            setIsLoading(true);
            try {
                const response = await getTrips();

                // Sort trips by date (latest first)
                const sortedTrips = response.sort((a, b) => {
                    // Convert the date string to Date objects and compare
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA; // Latest date first
                });

                setTrips(sortedTrips); // Set sorted trips data
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setIsLoading(false); // Set loading to false after the request
            }
        };
        fetchAllTrips();
    }, []); // Empty dependency array means it runs only once on mount


    const handleModalOpen = () => {
        setModalOpen(true);
        console.log("Modal opened.");
    };

    const handleModalClose = () => {
        console.log("Modal closed. Resetting form data.");
        setFormData({
            title: "",
            description: "",
            date: "",
            location: "", // Reset location
            latitude: "", // Reset latitude
            longitude: "", // Reset longitude
            images: [], // Reset images
            duration: "", // Reset duration
        });
        setModalOpen(false);
    };

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const updatedData = { ...prevData, [name]: value };
            console.log(`Form data updated - ${name}:`, updatedData); // Log input changes
            return updatedData;
        });
    };

    // Fetch trips again after creating or updating a trip
    const fetchUpdatedTrips = async () => {
        setIsLoading(true);
        try {
            const response = await getTrips();

            // Sort trips by date (latest first)
            const sortedTrips = response.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA; // Latest date first
            });

            setTrips(sortedTrips); // Set sorted trips data
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setIsLoading(false); // Set loading to false after the request
        }
    };


    // Handle form submission (creating or editing trip data)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData); // Log formData on submit
        setIsSubmitting(true);

        // Log image compression process
        console.log("Compressing images...");
        const compressedImages = await Promise.all(
            formData.images.map(async (file) => {
                const options = {
                    maxSizeMB: 0.5, // Maximum size of each image in MB
                    maxWidthOrHeight: 500, // Maximum width or height for the image
                };
                try {
                    const compressedFile = await imageCompression(file, options);
                    console.log("Compressed image:", compressedFile); // Log compressed image
                    return compressedFile;
                } catch (error) {
                    console.error("Image compression error:", error);
                    return file; // If compression fails, fall back to the original file
                }
            })
        );

        console.log("Creating FormData to send to backend...");
        // Create FormData to send to backend
        const formDataToSend = new FormData();

        // Log trip data
        console.log("Appending trip data to FormData", {
            title: formData.title,
            description: formData.description,
            date: formData.date,
            location: formData.location,
            latitude: formData.latitude,
            longitude: formData.longitude,
            duration: formData.duration,
        });
        formDataToSend.append('trip', new Blob([JSON.stringify({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            location: formData.location,
            latitude: formData.latitude,
            longitude: formData.longitude,
            duration: formData.duration,
        })], { type: "application/json" }));

        // Log images and append them to FormData
        console.log("Appending images to FormData");
        compressedImages.forEach((image) => {
            formDataToSend.append('images', image);
            console.log("Appended image:", image);
        });

        // Log deleted image indexes (if any)
        if (formData.deletedImageIndexes && formData.deletedImageIndexes.length > 0) {
            console.log("Appending deleted image indexes:", formData.deletedImageIndexes);
            formDataToSend.append('deletedImageIndexes', JSON.stringify(formData.deletedImageIndexes)); // Send deleted image indices
        }

        // Check if we are editing or creating a new trip
        if (formData.id) {
            console.log(`Updating existing trip with ID: ${formData.id}`);
            try {
                const response = await updateTrip(formData.id, formDataToSend);
                console.log("Trip updated successfully:", response);
                fetchUpdatedTrips(); // Fetch the updated trips list
            } catch (error) {
                console.error("Error updating trip:", error);
            }
        } else {
            console.log("Creating a new trip...");
            try {
                const response = await createTrip(formDataToSend);
                console.log("Trip created successfully:", response);
                fetchUpdatedTrips(); // Fetch the updated trips list
            } catch (error) {
                console.error("Error creating trip:", error);
            }
        }

        // Reset form data after submission
        setFormData({
            title: "",
            description: "",
            date: "",
            location: "",
            latitude: "",
            longitude: "",
            images: [], // Reset images after submission
            duration: "", // Reset duration after submission
            deletedImageIndexes: [], // Reset deleted images list
        });
        setModalOpen(false); // Close modal after submission
        setIsSubmitting(false);
    };


    // Handle editing an existing trip
    const handleEditPost = (trip) => {
        console.log("Editing trip:", trip); // Log trip being edited
        setFormData(trip); // Populate the form with the selected trip data for editing
        setModalOpen(true); // Open modal for editing
    };

    // Handle image change (multiple images upload)
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        console.log("Images selected:", files); // Log images selected

        if (formData.images.length + files.length > 8) {
            alert("You can only upload up to 8 images.");
            return;
        }

        setFormData({
            ...formData,
            images: [...formData.images, ...files],
        });
    };

    // Handle location change (set location and convert it to coordinates)
    const handleLocationChange = async (location) => {
        console.log("Location selected:", location); // Log location change
        try {
            // Geocode the location to get coordinates
            const results = await geocodeByAddress(location);
            const latLng = await getLatLng(results[0]);

            // Update formData with location and coordinates
            setFormData({
                ...formData,
                location: location,
                latitude: latLng.lat,
                longitude: latLng.lng,
            });
            console.log("Coordinates updated:", latLng); // Log coordinates
        } catch (error) {
            console.error("Error getting coordinates for location:", error);
        }
    };

    const handleDeleteTrip = async (id) => {
        try {
            setIsSubmitting(true);
            // Call the API to delete the trip
            await deleteTrip(id); // Assuming deleteTripApi is your API function for deleting trips

            console.log(`Trip with ID ${id} deleted successfully`);

            // Fetch the updated trips list
            fetchUpdatedTrips(); // This will re-fetch and re-sort the trips
        } catch (error) {
            console.error("Error deleting trip:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <TripContext.Provider
            value={{
                formData,
                handleInputChange,
                handleFormSubmit,
                handleEditPost,
                isModalOpen,
                setModalOpen,
                handleModalOpen,
                handleModalClose,
                handleImageChange,
                handleLocationChange,
                trips,
                isLoading,
                isSubmitting,
                handleDeleteTrip
            }}
        >
            {children}
        </TripContext.Provider>
    );
};
