import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger menu icon
import { FaCalendarAlt, FaMapMarkerAlt, FaHourglass } from "react-icons/fa"; // Date, Location, and Duration icons
import Slider from "react-slick"; // Import react-slick

// Import slick-carousel styles for the slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TripCard = ({ trip, handleEditPost }) => {
  const [showMenu, setShowMenu] = useState(false);
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

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the menu if the click is outside the menuRef element
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    // Add event listener on component mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
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
    dots: true, // Enable dots for navigation
    infinite: false, // Loop the images
    speed: 500, // Transition speed in ms
    autoplay: true, // Enable auto scroll
    autoplaySpeed: 3000, // Set auto scroll interval (3 seconds)
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
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
  <div className="flex items-center space-x-2"> {/* Ensure proper space between icon and text */}
    <FaCalendarAlt className="text-teal-500 text-lg" /> {/* Icon size */}
    <h4 className="text-gray-500 dark:text-gray-300 m-0 p-0 leading-none">{formatDate(trip.date)}</h4> {/* Remove margins and padding */}
  </div>
  <div className="flex items-center space-x-2"> {/* Ensure proper space between icon and text */}
    <FaMapMarkerAlt className="text-teal-500 text-lg" /> {/* Icon size */}
    <h4 className="text-gray-500 dark:text-gray-300 m-0 p-0 leading-none">{trip.location}</h4> {/* Remove margins and padding */}
  </div>
  <div className="flex items-center space-x-2"> {/* Ensure proper space between icon and text */}
    <FaHourglass className="text-teal-500 text-lg" /> {/* Icon size */}
    <h4 className="text-gray-500 dark:text-gray-300 m-0 p-0 leading-none">{trip.duration} hours</h4> {/* Remove margins and padding */}
  </div>
</div>


        </div>
        {/* Hamburger menu */}
        <div className="absolute top-2 right-2">
          <GiHamburgerMenu
            onClick={toggleMenu}
            className="cursor-pointer text-2xl text-teal-900 dark:text-teal-400"
          />
          {showMenu && (
            <div
              ref={menuRef} // Attach the ref to the menu
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

      {/* Images */}
      {trip.images && trip.images.length > 0 ? (
        <div className="mt-4">
          <Slider {...sliderSettings}>
            {trip.images.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={`data:image/jpeg;base64,${image}`}
                  alt={`Trip Image ${index + 1}`}
                  className="w-full h-48 object-contain mt-4 rounded-md" // Changed to object-contain to prevent cropping
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 mt-4">No images available</p>
      )}
    </div>
  );
};

export default TripCard;
