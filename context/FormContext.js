import React, { createContext, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";  // Import geocoding functions

// Create a context to handle the form state
export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "", // Added location state
        latitude: "", // Added latitude state
        longitude: "", // Added longitude state
        images: [], // Added images state
    });

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

    // Handle form submission (saving or editing data)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData); // Log formData on submit
        setFormData({
            title: "",
            description: "",
            date: "",
            location: "",
            latitude: "",
            longitude: "",
            images: [],
        }); // Reset form after submit
        setModalOpen(false); // Close modal after submission
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

    return (
        <FormContext.Provider
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
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
