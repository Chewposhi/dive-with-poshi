import React, { useState, useContext } from "react";
import { FormContext } from "../context/FormContext"; // Ensure correct path
import { GiDivingHelmet } from "react-icons/gi";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css'; // Make sure to import the CSS
import TripCard from "./TripCard"; // Import your existing TripCard component

const trips = [
    {
        title: "Great Barrier Reef",
        date: "July 2021",
        description: "A memorable diving experience in the Great Barrier Reef, Australia.",
        imageUrl: "https://picsum.photos/200/300"
    },
    {
        title: "Blue Hole",
        date: "November 2021",
        description: "Exploring the famous Blue Hole in Belize.",
        imageUrl: "https://picsum.photos/200/300"
    },
    {
        title: "Galapagos Islands",
        date: "March 2022",
        description: "Diving with sea lions and sharks in the Galapagos Islands.",
        imageUrl: "https://picsum.photos/200/300"
    }
];

const Timeline = () => {
    // Ensure useContext is accessing FormContext properly
    const { formData, handleFormSubmit, handleEditPost, isModalOpen, handleModalClose, handleModalOpen, } = useContext(FormContext);
    return (
        <div className="flex flex-col items-center relative">
            <h3 className="text-3xl py-4 text-teal-900 font-medium dark:text-teal-400 font-semibold text-center">
                My Trips
            </h3>
            {/* Button to open modal */}
            <button
                onClick={handleModalOpen}
                className="transform - bg-teal-600 text-white rounded-full p-4 shadow-lg z-20 hover:bg-teal-700 transition-all"
            >
                <GiDivingHelmet size={40} />
            </button>

            {/* Vertical Timeline */}
            <div className="flex flex-col items-center w-full">
                <VerticalTimeline>
                    {trips.map((trip, index) => (
                        <VerticalTimelineElement
                            key={index}
                            date={trip.date}
                            icon={<img src={trip.imageUrl} alt={trip.title} className="w-12 h-12 rounded-full" />}
                            iconStyle={{ background: 'teal', color: '#fff' }}
                            contentStyle={{
                                background: 'transparent',
                                border: '4px solid #ddd',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                            contentArrowStyle={{ borderRight: '14px solid #fff' }}
                        >
                            {/* Use the existing TripCard component here */}
                            <TripCard trip={trip} handleEditPost={handleEditPost} />
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </div>

            {/* Modal for adding/editing post */}
            {isModalOpen && (
                <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="modal-content bg-white p-6 rounded-lg w-full sm:w-96 shadow-lg transition-all duration-300 transform scale-95 hover:scale-100">
                        <h3 className="text-xl mb-4 text-teal-600">Add/Edit Trip</h3>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                placeholder="Trip Title"
                                name="title"
                                value={formData.title || ""}
                                onChange={(e) => handleFormSubmit(e)}
                                className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <textarea
                                placeholder="Description"
                                name="description"
                                value={formData.description || ""}
                                onChange={(e) => handleFormSubmit(e)}
                                className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-teal-500 text-white rounded-md px-4 py-2 mb-4 hover:bg-teal-600 transition-all"
                            >
                                Save Trip
                            </button>
                        </form>
                        <button
                            onClick={handleModalClose}
                            className="w-full text-center text-red-600 hover:text-red-700 transition-all"
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
