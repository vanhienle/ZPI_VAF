import React, { useRef, useCallback, useState, useEffect } from "react";
import { FILTERS, CITIES } from "../../constants/mapConstants";

const MapFilters = (props) => {
  const {
    setChosenCity,
    setChosenType,
    setChosenPlace,
    setIsMoreButtonDisabled,
  } = props;

  const dropdownCityRef = useRef();
  const dropdownTypeRef = useRef();

  const [isDropdownCityOpen, setIsDropdownCityOpen] = useState(false);
  const [isDropdownTypeOpen, setIsDropdownTypeOpen] = useState(false);

  const [filteredCityOptions, setFilteredCityOptions] = useState(CITIES);
  const [filteredTypeOptions, setFilteredTypeOptions] = useState(FILTERS);

  const [inputCity, setInputCity] = useState("Warsaw");
  const [inputType, setInputType] = useState("");

  const handleCityInputChange = (e) => {
    const userInput = e.target.value;
    const filtered = CITIES.filter((city) =>
      city.name.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredCityOptions(filtered);
    setInputCity(userInput);
  };

  const handleOptionCityClick = (city) => {
    if (city !== null) {
      setInputCity(city.name);
      setChosenCity(city.name);
      setChosenPlace(null);
      setIsDropdownCityOpen(false);
    }
  };

  const handleSearchButtonClick = () => {
    setIsDropdownCityOpen(false);
    setChosenCity(inputCity);
    setChosenPlace(null);
  };

  const handleTypeInputChange = (e) => {
    const userInput = e.target.value;
    const filtered = FILTERS.filter((type) =>
      type.name.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredTypeOptions(filtered);
    setInputType(userInput);
  };

  const handleOptionTypeClick = (type) => {
    if (type !== null) {
      setInputType(type.name);
      setChosenType(type.name);
      setIsDropdownTypeOpen(false);
      setChosenPlace(null);
    } else {
      setInputType("");
      setChosenType(null);
      setFilteredTypeOptions(FILTERS);
      setIsDropdownTypeOpen(false);
      setChosenPlace(null);
      setIsMoreButtonDisabled(true);
    }
  };

  const handleOutsideCityClick = useCallback(
    (e) => {
      if (isDropdownCityOpen && !dropdownCityRef.current.contains(e.target)) {
        setIsDropdownCityOpen(false);
      }
    },
    [isDropdownCityOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideCityClick);
    return () => {
      document.removeEventListener("click", handleOutsideCityClick);
    };
  }, [handleOutsideCityClick]);

  const handleOutsideTypeClick = useCallback(
    (e) => {
      if (isDropdownTypeOpen && !dropdownTypeRef.current.contains(e.target)) {
        setIsDropdownTypeOpen(false);
      }
    },
    [isDropdownTypeOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideTypeClick);
    return () => {
      document.removeEventListener("click", handleOutsideTypeClick);
    };
  }, [handleOutsideTypeClick]);

  return (
    <div className="w-full p-4">
      {/* Header */}
      <h3 className="w-full text-center text-lg font-semibold text-primary-900 mb-4">
        Filters & Details:
      </h3>
      <hr className="border border-primary-900 rounded-full" />

      {/* Filters Block */}
      <div className="flex items-center justify-around gap-4">
        {/* City Filter */}
        <div ref={dropdownCityRef} className="relative w-1/2 mt-4">
          <input
            type="text"
            value={inputCity}
            onChange={handleCityInputChange}
            onClick={() => setIsDropdownCityOpen(true)}
            placeholder="Select a city..."
            className="border border-primary-900 rounded-md py-2 px-4 w-full text-base focus:outline-none focus:border-primary-500"
          />
          {isDropdownCityOpen && (
            <div className="w-full h-fit max-h-96 overflow-auto z-10 absolute right-0 mt-2 shadow-lg border-2 border-primary-500">
              <div
                className="py-1 bg-background-color"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {filteredCityOptions.length !== 0 ? (
                  filteredCityOptions.map((city) => (
                    <div
                      key={city.id}
                      onClick={() => handleOptionCityClick(city)}
                      className="block px-4 py-2 text-base text-gray-700 cursor-pointer hover:bg-accent-500"
                      role="menuitem"
                    >
                      {city.name}
                    </div>
                  ))
                ) : (
                  <div className="w-full flex flex-col items-center justify-around">
                    <p className="text-center m-4">
                      If you can't find your city in the list, don't worry! You
                      can still search for it.
                    </p>
                    <button
                      className="m-4 rounded-md text-background-color bg-primary-900 hover:bg-primary-700 px-4 py-2 ease-in-out duration-150"
                      onClick={handleSearchButtonClick}
                    >
                      Search
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/*Type of Place Filter*/}
        <div ref={dropdownTypeRef} className="relative w-1/2 mt-4">
          <input
            type="text"
            value={inputType}
            placeholder="None"
            onChange={handleTypeInputChange}
            onClick={() => setIsDropdownTypeOpen(true)}
            className="border border-primary-900 rounded-md py-2 px-4 w-full text-base focus:outline-none focus:border-primary-500"
          />
          {isDropdownTypeOpen && (
            <div className="w-full h-fit max-h-96 overflow-auto z-10 absolute right-0 mt-2 shadow-lg border-2 border-primary-500">
              <div
                className="py-1 z-10 bg-background-color"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {filteredTypeOptions.length !== 0 ? (
                  <>
                    <div
                      key={null}
                      onClick={() => handleOptionTypeClick(null)}
                      className="block px-4 py-2 text-base text-gray-700 cursor-pointer hover:bg-accent-500"
                      role="menuitem"
                    >
                      None
                    </div>
                    {filteredTypeOptions.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => handleOptionTypeClick(type)}
                        className="block px-4 py-2 text-base text-gray-700 cursor-pointer hover:bg-accent-500"
                        role="menuitem"
                      >
                        {type.name}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="w-full flex flex-col items-center justify-around">
                    <p className="text-center m-4">
                      Please, choose one from types in list!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapFilters;
