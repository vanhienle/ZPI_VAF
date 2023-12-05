import React, { useState, useRef, useCallback, useEffect } from "react";
import Map from "../../components/Map/Map";
import { useJsApiLoader } from "@react-google-maps/api";
import { mapOptions } from "../../components/MapConfiguration/MapConfiguration";
import { FILTERS, CITIES } from "../../constants/mapConstants";

const Maps = () => {
  const dropdownRef = useRef();

  const [selectedCity, setSelectedCity] = useState("Warsaw");
  const [latitude, setLatitude] = useState(52.237049);
  const [longitude, setLongitude] = useState(21.0111);
  const [filteredOptions, setFilteredOptions] = useState(CITIES);

  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (value) => {
    setSelectedFilter(value === selectedFilter ? null : value);
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (isDropdownOpen && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    },
    [isDropdownOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleInputChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    const filtered = CITIES.filter((option) =>
      option.city.toLowerCase().includes(userInput)
    );

    setFilteredOptions(filtered);
    setSelectedCity(userInput);
  };

  const handleOptionClick = (filter) => {
    setSelectedCity(filter.city);
    setIsDropdownOpen(false);
    setLatitude(filter.lat);
    setLongitude(filter.lng);
  };

  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
    libraries: ["places"],
  });

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 mt-6 px-6">
      {/* Title of Module */}
      <h1 className="text-2xl text-primary-900 font-semibold">Map</h1>
      {/* Maps Block */}
      <div className="flex border shadow-lg border-primary-900 w-full rounded-lg">
        {/* Filter Side */}
        <div className="w-1/4 p-6">
          <h3 className="w-full text-center text-2xl font-semibold text-primary-900 mb-4">
            Filters:
          </h3>
          <hr className="border border-primary-900 rounded-full" />
          <div
            ref={dropdownRef}
            className="relative inline-block text-left w-full mt-4"
          >
            <input
              type="text"
              value={selectedCity}
              onChange={handleInputChange}
              onClick={() => setIsDropdownOpen(true)}
              placeholder="Select a city..."
              className="border border-primary-900 rounded-md py-2 px-4 w-full text-lg focus:outline-none focus:border-primary-500"
            ></input>
            {isDropdownOpen && (
              <div className="w-full h-fit max-h-96 overflow-auto absolute right-0 mt-2 shadow-lg border-2 border-primary-500">
                <div
                  className="py-1 z-10 bg-background-color"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {filteredOptions.map((filter) => (
                    <div
                      key={filter.city}
                      onClick={() => handleOptionClick(filter)}
                      className="block px-4 py-2 text-base text-gray-700 cursor-pointer hover:bg-accent-500"
                      role="menuitem"
                    >
                      {filter.city}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center">
            {FILTERS.map((item) => (
              <div key={item.id} className="flex w-1/2 gap-2 items-center mt-4">
                <input
                  type="checkbox"
                  value={item.value}
                  className="w-5 h-5"
                  checked={item.value === selectedFilter}
                  onChange={() => handleCheckboxChange(item.value)}
                />
                <label className="text-base text-semibold">{item.title}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Map Side */}
        <Map
          isLoaded={isLoaded}
          lat={latitude}
          lng={longitude}
          filter={selectedFilter}
          city={selectedCity}
        />

        {/* Details Side */}
        <div className="w-1/4 pt-6">
          <h3 className="w-full text-center text-2xl font-semibold text-primary-900 mb-4">
            Details:
          </h3>
          <hr className="border border-primary-900 rounded-full mx-6" />
          <div className="overflow-y-auto h-[530px] mt-2 p-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Maps;
