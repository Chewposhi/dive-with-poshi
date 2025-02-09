import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TbScubaMask } from "react-icons/tb";
import { renderToStaticMarkup } from 'react-dom/server';
import { TripContext } from "../context/TripContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const MapComponent = () => {
  const [position, setPosition] = useState({ lat: 1.3521, lng: 103.8198 }); // Singapore's coordinates
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { trips } = useContext(TripContext);

  useEffect(() => {
    if (trips && trips.length > 0) {
      const firstTrip = trips[0];
      setPosition({ lat: firstTrip.latitude, lng: firstTrip.longitude });
    }
  }, [trips]);

  const scubaMaskIcon = new L.DivIcon({
    html: renderToStaticMarkup(<TbScubaMask size={32} color="teal" />),
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const sliderSettings = {
    dots: true,
    infinite: false, // Set infinite to false
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="py-8">
      <h3 className="text-3xl py-4 text-teal-900 dark:text-teal-400 font-medium font-semibold text-center">
        My Trips
      </h3>
      <MapContainer center={position} zoom={5} style={{ height: '600px', width: '100%' }}> {/* Increased height */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {trips.map((trip, index) => (
          <Marker
            key={index}
            position={{ lat: trip.latitude, lng: trip.longitude }}
            icon={scubaMaskIcon}
          >
            <Popup 
              className="custom-popup" 
              maxWidth={400} 
              minWidth={200}
            >
              <div className="popup-content w-full">
                <h4 className="text-lg font-semibold text-teal-700 dark:text-teal-300">{trip.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{trip.description}</p>

                {trip.images && trip.images.length > 0 ? (
                  <div className="mt-2">
                    <Slider {...sliderSettings}>
                      {trip.images.map((image, imgIndex) => (
                        <div key={imgIndex}>
                          <img
                            src={`data:image/jpeg;base64,${image}`}
                            alt={`Trip Image ${imgIndex + 1}`}
                            className="w-full h-40 object-cover rounded-md cursor-pointer"
                            onClick={() => handleImageClick(image)}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-300 mt-2">No images available</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Modal for displaying larger image */}
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

export default MapComponent;
