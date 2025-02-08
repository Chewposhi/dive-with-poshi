import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const LocationSearch = ({ setLocation }) => {
    const [address, setAddress] = useState('');

    const handleSelect = async (selectedAddress) => {
        setAddress(selectedAddress);
        const geocode = await window.google.maps.Geocoder();
        geocode.geocode({ address: selectedAddress }, (results, status) => {
            if (status === 'OK') {
                const { lat, lng } = results[0].geometry.location;
                setLocation({ lat: lat(), lng: lng() }); // set lat, lng as location
            }
        });
    };

    return (
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input {...getInputProps({ placeholder: 'Search for a location' })} className="w-full mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                    <div>
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div {...getSuggestionItemProps(suggestion, { style })} key={suggestion.placeId}>
                                    {suggestion.description}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default LocationSearch;
