import React, { useState, useEffect, useCallback, useRef } from "react";
import { getDestinations } from "../../utils/Accommodation/getDestinations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiMinus, HiOutlineX } from "react-icons/hi";
import Dropdown from "./Dropdown";
const sortByOptions = {
  popularity: "Popularity",
  distance: "Distance from city centre",
  class_ascending: "Star rating (lowest first)",
  class_descending: "Star rating (highest first)",
  review_score: "Best reviewed first",
  price: "Price (lowest first)",
};

const filterOptions = {
  "distance::1000": "Less than 1 km from city center",
  "facility::8": "24h reception",
  "facility::17": "Airport shuttle",
  "facility::46": "Parking",
  "free_cancellation::1": "Free cancellation",
};

const priceCategories = {
  "price_category::50": "0 - 50 EUR",
  "price_category::100": "50 - 100 EUR",
  "price_category::150": "100 - 150 EUR",
  "price_category::200": "150 - 200 EUR",
  "price_category::250": "200+ EUR",
};

const Filters = ({ handleSearchHotels, handleSetInformation }) => {
  const [destination, setDestination] = useState({
    name: "",
    dest_id: 0,
    dest_type: "city",
  });
  const [isSelectedDestination, setIsSelectedDestination] = useState(false);
  const [suggestedDestinationList, setSuggestedDestinationList] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isOpenSuggestionBox, setIsOpenSuggestionBox] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });
  const [guestCount, setGuestCount] = useState(null);
  const [roomCount, setRoomCount] = useState(null);
  const [priceCategory, setPriceCategory] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [filters, setFilters] = useState([]);

  const suggestionBoxRef = useRef(null);
  const checkInDateRef = useRef(null);
  const checkOutDateRef = useRef(null);

  const handleSetDestination = (e) => {
    setIsSelectedDestination(false);
    const fetchData = async () => {
      const nearestDestinations = getDestinations(e.target.value);
      nearestDestinations.then((result) => {
        if (result) {
          const fetchedPlaces = result.map(({ name, dest_id, dest_type }) => ({
            name,
            dest_id,
            dest_type,
          }));
          setSuggestedDestinationList(fetchedPlaces);
          if (!isSelectedDestination) {
            setIsOpenSuggestionBox(true);
          }
        }
      });
    };
    clearTimeout(timer);
    setDestination(e.target.value);
    if (e.target.value.length >= 3) {
      const newTimer = setTimeout(() => {
        fetchData();
      }, 300);
      setTimer(newTimer);
    }
  };

  const handleSetGuestCount = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setGuestCount(Math.max(1, value));
    } else {
      setGuestCount(null);
    }
  };

  const handleSetRoomCount = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setRoomCount(Math.max(1, value));
    } else {
      setRoomCount(null);
    }
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (isOpenSuggestionBox && !suggestionBoxRef.current.contains(e.target)) {
        setIsOpenSuggestionBox(false);
      }
    },
    [isOpenSuggestionBox]
  );

  const clearDestination = () => {
    setDestination({ name: "", dest_id: 0, dest_type: "city" });
    setIsSelectedDestination(false);
  };

  const handleSelectDestination = (suggestion) => {
    setDestination(suggestion);
    setIsOpenSuggestionBox(false);
    setIsSelectedDestination(true);
  };

  const handleClickSearch = () => {
    if (isSelectedDestination && guestCount && roomCount) {
      let filterList = Object.keys(filterOptions).filter((key) =>
        filters.includes(filterOptions[key])
      );
      if (priceCategory) {
        filterList.push(
          Object.keys(priceCategories).find(
            (key) => priceCategories[key] === priceCategory
          )
        );
      }
      const params = {
        destName: destination.name,
        destId: destination.dest_id,
        destType: destination.dest_type,
        roomCount: roomCount,
        checkInDate: checkInDate.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        checkOutDate: checkOutDate.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        sortBy: sortBy
          ? Object.keys(sortByOptions).find(
              (key) => sortByOptions[key] === sortBy
            )
          : null,
        guestCount: guestCount,
        filters: filterList,
        activePage: 0,
        newSearch: true,
      };
      handleSearchHotels(params);
    } else {
      let missingFields = "";
      if (!isSelectedDestination) {
        missingFields += "Destination";
      }
      if (!guestCount) {
        if (missingFields.length > 0) {
          missingFields += ", ";
        }
        missingFields += "Guest count";
      }

      if (!roomCount) {
        if (missingFields.length > 0) {
          missingFields += ", ";
        }
        missingFields += "Room count";
      }
      handleSetInformation("Please choose also: " + missingFields);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("click", handleOutsideClick, { capture: true });
      return () => {
        document.removeEventListener("click", handleOutsideClick, {
          capture: true,
        });
      };
    }
  }, [handleOutsideClick]);

  useEffect(() => {
    if (isOpenSuggestionBox) {
      setIsOpenSuggestionBox(false);
    }
  }, [destination]);

  useEffect(() => {
    if (checkOutDate < checkInDate) {
      setCheckOutDate(
        new Date(
          checkInDate.getFullYear(),
          checkInDate.getMonth(),
          checkInDate.getDate() + 1
        )
      );
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    if (checkInDateRef.current) {
      const input = checkInDateRef.current.input;
      if (input) {
        input.readOnly = true;
      }
    }
    if (checkOutDateRef.current) {
      const input = checkOutDateRef.current.input;
      if (input) {
        input.readOnly = true;
      }
    }
  }, []);
  return (
    <div className="bg-background-color shadow-md rounded-lg p-6 mb-6 text-sm">
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <label>
            Destination <span className="text-error-900">*</span>
          </label>
          <div className="relative">
            <input
              id="destination_input"
              className={`border border-accent-900 focus:border-primary-700 outline-none p-3 w-full rounded-lg ${
                isSelectedDestination ? "font-semibold" : ""
              }`}
              type="text"
              value={destination.name}
              onChange={handleSetDestination}
              placeholder=""
            />
            {isSelectedDestination && (
              <div
                className="absolute right-0 top-0 flex justify-center items-center cursor-pointer text-text-color hover:text-primary-500 h-full w-16"
                onClick={clearDestination}
              >
                <HiOutlineX size={22} className="" />
              </div>
            )}
            {suggestedDestinationList.length > 0 && isOpenSuggestionBox && (
              <ul
                ref={suggestionBoxRef}
                id="city_dropdown"
                className="absolute top-12 z-10 bg-background-color border border-accent-700 rounded-md mt-1 max-h-32 w-full overflow-auto"
              >
                {suggestedDestinationList.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-3 hover:bg-accent-500 cursor-pointer"
                    onClick={() => {
                      handleSelectDestination(suggestion);
                    }}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-2">
            <label>Check-in date</label>
            <div>
              <DatePicker
                ref={checkInDateRef}
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                dateFormat="dd/MM/yyyy"
                className="text-center border border-accent-900 focus:border-primary-700 outline-none p-3 w-full rounded-lg"
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>Check-out date</label>
            <div>
              <DatePicker
                ref={checkOutDateRef}
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                dateFormat="dd/MM/yyyy"
                className="text-center border border-accent-900 focus:border-primary-700 outline-none p-3 w-full rounded-lg"
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <label>
              Guest count <span className="text-error-900">*</span>
            </label>
            <input
              className="border border-accent-900 focus:border-primary-700 outline-none p-3 w-full rounded-lg"
              type="number"
              min="1"
              value={guestCount}
              onChange={handleSetGuestCount}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>
              Room count <span className="text-error-900">*</span>
            </label>
            <input
              className="border border-accent-900 focus:border-primary-700 outline-none p-3 w-full rounded-lg"
              type="number"
              min="1"
              value={roomCount}
              onChange={handleSetRoomCount}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4 max-sm:gap-2">
        <Dropdown
          options={Object.values(priceCategories)}
          single
          className="border border-accent-900 outline-none p-3 w-full rounded-lg flex "
          placeholder="Price category"
          selectedOptions={priceCategory}
          setSelectedOptions={setPriceCategory}
        />
        <Dropdown
          options={Object.values(filterOptions)}
          multiple
          className="border border-accent-900 outline-none p-3 w-full rounded-lg flex"
          placeholder="Choose filters"
          selectedOptions={filters}
          setSelectedOptions={setFilters}
        />
        <Dropdown
          options={Object.values(sortByOptions)}
          single
          className="border border-accent-900 outline-none p-3 w-full rounded-lg flex"
          placeholder="Sort by"
          selectedOptions={sortBy}
          setSelectedOptions={setSortBy}
        />
        <div className="flex items-center">
          <button
            className="w-full h-11 bg-primary-900 hover:bg-primary-700 text-background-color p-3 rounded-lg font-medium"
            onClick={handleClickSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
