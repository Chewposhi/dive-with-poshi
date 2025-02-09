import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger menu icon
import { FaCalendarAlt, FaMapMarkerAlt, FaHourglass } from "react-icons/fa"; // Date, Location, and Duration icons
import Slider from "react-slick"; // Import react-slick

// Import slick-carousel styles for the slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TripCard = ({ trip, handleEditPost }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
  const menuRef = useRef(null); // Reference for the menu to detect outside clicks

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleEdit = () => {
    handleEditPost(trip);
  };

  const handleDelete = () => {
    // Logic to delete the trip
    console.log("Deleting trip:", trip);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the selected image for the modal
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedImage(null); // Reset selected image
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format the date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="trip-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xl font-semibold text-teal-900 dark:text-teal-400">
            {trip.title}
          </h4>
          <p className="text-gray-500 dark:text-gray-300">{trip.description}</p>
          <div className="mt-2 flex flex-col items-start space-y-2">
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-teal-500 text-lg" />
              <h4 className="text-gray-500 dark:text-gray-300 m-0 p-0 leading-none">
                {formatDate(trip.date)}
              </h4>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-teal-500 text-lg" />
              <h4 className="text-gray-500 dark:text-gray-300 m-0 p-0 leading-none">
                {trip.location}
              </h4>
            </div>
            <div className="flex items-center space-x-2">
              <FaHourglass className="text-teal-500 text-lg" />
              <h4 className="text-gray-500 dark:text-gray-300 m-0 p-0 leading-none">
                {trip.duration} hours
              </h4>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <GiHamburgerMenu
            onClick={toggleMenu}
            className="cursor-pointer text-2xl text-teal-900 dark:text-teal-400"
          />
          {showMenu && (
            <div
              ref={menuRef}
              className="absolute top-8 right-0 bg-white dark:bg-gray-700 border rounded-md shadow-lg w-32"
            >
              <ul>
                <li
                  onClick={handleEdit}
                  className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-teal-900 dark:text-teal-400"
                >
                  Edit
                </li>
                <li
                  onClick={handleDelete}
                  className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:text-red-400"
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {trip.images && trip.images.length > 0 ? (
        <div className="mt-4">
          <Slider {...sliderSettings}>
            {trip.images.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={`data:image/jpeg;base64,${image}`}
                  alt={`Trip Image ${index + 1}`}
                  className="w-full h-48 object-contain mt-4 rounded-md cursor-pointer"
                  onClick={() => handleImageClick(image)} // Add click event to open modal
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 mt-4">No images available</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-3xl w-full shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
          >
            <img
              src={`data:image/jpeg;base64,${selectedImage}`}
              alt="Selected Trip Image"
              className="w-full h-auto object-contain rounded-md"
            />
            <button
              onClick={handleCloseModal}
              className="mt-4 text-white bg-teal-600 dark:bg-teal-500 rounded-lg px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripCard;
