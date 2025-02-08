import React, { createContext, useState } from "react";

// Create a context to handle the form state
export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "", // Added location state
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

    // Handle location change (set location)
    const handleLocationChange = (location) => {
        console.log("Location selected:", location); // Log location change
        setFormData({
            ...formData,
            location: location,
        });
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
