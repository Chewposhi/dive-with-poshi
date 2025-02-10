import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router"; // Import useRouter
import { TripContext } from "../context/TripContext";
import { GiDivingHelmet } from "react-icons/gi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TripCard from "./TripCard";
import LocationSearch from "./LocationSearch"; // Location search component
import { ClipLoader } from 'react-spinners'; // Importing a spinner component from react-spinners

const Timeline = () => {
    const router = useRouter(); // Get router object to access the URL
    const {
        formData,
        handleInputChange,
        handleFormSubmit,
        handleEditPost,
        isModalOpen,
        handleModalClose,
        handleModalOpen,
        handleImageChange,
        handleLocationChange,
        trips, // Access trips from context
        isLoading, // Access loading state from context
        isSubmitting, // Access submitting state
        handleDeleteTrip,
    } = useContext(TripContext);

    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (isModalOpen) {
            setLocation(formData.location || null); // Reset location when modal opens
        }
    }, [isModalOpen, formData.location]);

    // Handle image removal
    const handleRemoveImage = (index) => {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        const updatedDeletedIndexes = [...(formData.deletedImageIndexes || []), index];
        
        // Update the formData state with the new list of images and deleted image indexes
        handleInputChange({ target: { name: 'images', value: updatedImages } });
        handleInputChange({ target: { name: 'deletedImageIndexes', value: updatedDeletedIndexes } });
    };

    // Handle Create or Edit Trip submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the shared form submit logic
        await handleFormSubmit(e);
    };

    // Check if we're in the /admin route
    const isAdminPage = router.pathname === "/poshi"; // Check if current URL is /admin

    return (
        <div className="flex flex-col items-center relative">
            {isAdminPage && (
                <button
                    onClick={handleModalOpen}
                    className="bg-teal-600 dark:bg-teal-500 text-white rounded-full p-4 shadow-lg z-20 hover:bg-teal-700 dark:hover:bg-teal-600 transition-all"
                >
                    <GiDivingHelmet size={40} />
                </button>
            )}

            {/* Show a loading spinner while trips are being fetched */}
            {isLoading ? (
                <div className="flex justify-center items-center my-4">
                    <ClipLoader size={50} color="#0D9488" loading={isLoading} />
                </div>
            ) : trips.length === 0 ? (
                <p className="text-teal-900 dark:text-teal-400 text-xl mt-4">No trips available. Add a new trip!</p>
            ) : (
                <div className="flex flex-col items-center w-full">
                    <VerticalTimeline>
                        {trips.map((trip, index) => (
                            <VerticalTimelineElement
                                key={index}
                                icon={
                                    <div className="flex justify-center items-center w-full h-full">
                                        <img
                                            src={"/profile.jpg"}  // Replace with your dynamic image URL
                                            alt={trip.title}
                                            className="w-full h-full object-cover rounded-full border-2 border-teal-500"
                                        />
                                    </div>
                                }
                                iconStyle={{
                                    background: 'transparent', // Remove default background to use custom image
                                    color: '#fff',
                                }}
                                contentStyle={{
                                    background: 'transparent',
                                    border: '4px solid rgb(38, 116, 56)',
                                    borderRadius: '8px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                    padding:'0',
                                }}
                                contentArrowStyle={{ borderRight: '14px solid #0D9488' }}
                            >
                                <TripCard
                                    trip={trip}
                                    handleEditPost={handleEditPost}
                                    handleDeletePost={() => handleDeleteTrip(trip.id)}
                                    isSubmitting={isSubmitting}
                                    isAdmin={isAdminPage} // Pass isAdmin prop if it's the admin page
                                />
                            </VerticalTimelineElement>
                        ))}
                    </VerticalTimeline>
                </div>
            )}

            {isModalOpen && (
                <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-lg w-full sm:w-96 shadow-lg transition-all duration-300 transform scale-95 hover:scale-100 overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl mb-4 text-teal-600 dark:text-teal-400">Add/Edit Trip</h3>
                        <form onSubmit={handleSubmit}>
                            {/* Trip Title */}
                            <label className="block text-teal-600 dark:text-teal-400 mb-2">Trip Title</label>
                            <input
                                type="text"
                                placeholder="Trip Title"
                                name="title"
                                value={formData.title || ""}
                                onChange={handleInputChange}
                                className="w-full mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />

                            {/* Description */}
                            <label className="block text-teal-600 dark:text-teal-400 mb-2">Description</label>
                            <textarea
                                placeholder="Description"
                                name="description"
                                value={formData.description || ""}
                                onChange={handleInputChange}
                                className="w-full mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />

                            {/* Date */}
                            <label className="block text-teal-600 dark:text-teal-400 mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date || ""}
                                onChange={handleInputChange}
                                className="w-full mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />

                            {/* Duration */}
                            <label className="block text-teal-600 dark:text-teal-400 mb-2">Duration (in hours)</label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const formattedValue = value ? parseFloat(value).toFixed(1) : "";
                                    handleInputChange({ target: { name: "duration", value: formattedValue } });
                                }}
                                className="w-full mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="Duration (in hours)"
                                step="0.1"
                            />

                            {/* Location Search Component */}
                            <label className="block text-teal-600 dark:text-teal-400 mb-2">Location</label>
                            <LocationSearch setLocation={(loc) => { handleLocationChange(loc); setLocation(loc); }} />
                            {location && (
                                <div className="mb-4 text-teal-600 dark:text-teal-400">
                                    Selected Location: {location}
                                </div>
                            )}

                            {/* File Upload */}
                            <label className="block text-teal-600 dark:text-teal-400 mb-2">Add Photos</label>
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="file-upload"
                                className="flex justify-center items-center w-full mb-4 p-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                            >
                                <MdAddPhotoAlternate size={24} className="text-teal-500 dark:text-teal-400" />
                                <span className="ml-2 text-sm text-teal-500 dark:text-teal-400">Add Photos</span>
                            </label>

                            {/* Display image previews */}
                            {formData.images && formData.images.length > 0 && (
                                <div className="flex flex-wrap space-x-4 my-4">
                                    {formData.images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image instanceof File ? URL.createObjectURL(image) : `data:image/jpeg;base64,${image}`}
                                                alt={`preview-${index}`}
                                                className="w-24 h-24 object-contain rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-0 right-0 text-red-600 hover:text-red-800"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Show the spinner if submitting */}
                            {isSubmitting ? (
                                <div className="flex justify-center items-center my-4">
                                    <ClipLoader size={50} color="#0D9488" loading={isSubmitting} />
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full bg-teal-500 dark:bg-teal-600 text-white rounded-md px-4 py-2 mb-4 hover:bg-teal-600 dark:hover:bg-teal-500 transition-all"
                                >
                                    Save Trip
                                </button>
                            )}
                        </form>
                        <button
                            onClick={handleModalClose}
                            className="w-full text-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timeline;
