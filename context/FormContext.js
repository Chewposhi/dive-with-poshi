import React, { createContext, useState } from "react";

// Create a context to handle the form state
export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setFormData({
            title: "",
            description: "",
        });
        setModalOpen(false);
    };


    const handleFormSubmit = (e) => {
        if (e) {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        } else {
            // Handle save form data logic (adding/editing post)
            console.log(formData);
            setFormData({ title: "", description: "" }); // Reset form after submit
        }
    };

    const handleEditPost = (trip) => {
        setFormData(trip); // Populate the form with the selected trip data for editing
        setModalOpen(true);
    };

    return (
        <FormContext.Provider value={{ formData, handleFormSubmit, handleEditPost, isModalOpen, setModalOpen, handleModalOpen, handleModalClose }}>
            {children}
        </FormContext.Provider>
    );
};
