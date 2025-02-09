import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger menu icon

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

  return (
    <div className="trip-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xl font-semibold text-teal-900 dark:text-teal-400">
            {trip.title}
          </h4>
          <p className="text-gray-500 dark:text-gray-300">{trip.description}</p>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            <strong>Date: </strong>{formatDate(trip.date)}
          </p>
          <p className="text-gray-500 dark:text-gray-300">
            <strong>Duration: </strong>{trip.duration} hours
          </p>
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
          {trip.images.map((image, index) => (
            <img
              key={index}
              src={`data:image/jpeg;base64,${image}`}
              alt={`Trip Image ${index + 1}`}
              className="w-full h-48 object-cover mt-4 rounded-md"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 mt-4">No images available</p>
      )}
    </div>
  );
};

export default TripCard;
