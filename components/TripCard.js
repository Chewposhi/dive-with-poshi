import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router"
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCalendarAlt, FaMapMarkerAlt, FaHourglass } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TripCard = ({ trip, handleEditPost, handleDeletePost, isSubmitting }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // Track if delete is in progress
  const menuRef = useRef(null);
  const router = useRouter();
  const isAdminPage = router.pathname === "/poshi";
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleEdit = () => {
    handleEditPost(trip);
  };

  const handleDelete = () => {
    if (isDeleting) return; // Prevent multiple deletions

    // Optionally, show a confirmation before deleting
    if (window.confirm("Are you sure you want to delete this trip?")) {
      setIsDeleting(true); // Set deleting state
      // console.log("Deleting trip:", trip);
      handleDeletePost(trip.id);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

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
    <div className="trip-card bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg relative">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xl font-semibold text-teal-900 dark:text-teal-400">{trip.title}</h4>
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
          {isAdminPage && <GiHamburgerMenu
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="cursor-pointer text-2xl text-teal-900 dark:text-teal-400"
          />}
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
                  disabled={isDeleting} // Disable button during delete
                >
                  {isDeleting ? (
                    <div className="flex justify-center items-center">
                      {/* Spinner */}
                      <div className="w-5 h-5 border-4 border-teal-500 border-t-transparent border-solid rounded-full animate-spin" />
                    </div>
                  ) : (
                    "Delete"
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {trip.images && trip.images.length > 0 ? (
        <div className="mt-1">
          <Slider {...sliderSettings}>
            {trip.images.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={`data:image/jpeg;base64,${image}`}
                  alt={`Trip Image ${index + 1}`}
                  className="w-full h-48 object-contain mt-4 rounded-md cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 mt-1">No images available</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-3xl w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
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
