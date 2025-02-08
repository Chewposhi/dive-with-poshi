import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

const LocationSearch = ({ setLocation }) => {
    const [address, setAddress] = useState("");

    const handleSelect = (value) => {
        setAddress(value);
        setLocation(value); // Update the parent component's state
    };

    return (
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div>
                    <input
                        {...getInputProps({
                            placeholder: "Search for a location...",
                            className: "location-search-input w-full mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
                        })}
                    />
                    <div
                        className="autocomplete-dropdown-container"
                        style={{
                            maxHeight: "200px", // Set max height for the dropdown
                            overflowY: "auto",  // Enable vertical scrolling
                            borderRadius: "8px", // Optional: rounded corners
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: drop shadow for better UI
                        }}
                    >
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                {...getSuggestionItemProps(suggestion)}
                                className="suggestion-item text-gray-900 dark:text-gray-100 p-2 cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-700 rounded bg-white dark:bg-gray-700"
                            >
                                {suggestion.description}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default LocationSearch;
