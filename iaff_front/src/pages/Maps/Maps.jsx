import React, { useState } from "react";
import Map from "../../components/Map/Map";
import MapFilters from "../../components/MapFilters/MapFilters";
import MapResults from "../../components/MapResults/MapResults";
import { useJsApiLoader } from "@react-google-maps/api";
import { mapOptions } from "../../components/MapConfiguration/MapConfiguration";

const Maps = () => {
  const [places, setPlaces] = useState([]);
  const [chosenCity, setChosenCity] = useState("Warsaw");
  const [chosenType, setChosenType] = useState(null);
  const [chosenPlace, setChosenPlace] = useState(null);

  const [placeClicked, setPlaceClicked] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isMoreButtonDisabled, setIsMoreButtonDisabled] = useState(true);
  const [getNextPage, setGetNextPage] = useState(null);

  const handlePagination = (nextPageFunction) => {
    setGetNextPage(() => nextPageFunction);
  };

  const handleMoreButtonClick = () => {
    setIsMoreButtonDisabled(true);
    if (getNextPage) {
      getNextPage();
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
    libraries: mapOptions.libraries,
  });

  return (
    <div className="flex w-full max-md:flex-col h-[90vh] min-h-[500px]">
      <div className="flex flex-col w-1/3 max-md:w-full z-40 max-md:mb-4">
        <MapFilters
          chosenCity={chosenCity}
          setChosenCity={setChosenCity}
          chosenType={chosenType}
          setChosenType={setChosenType}
          setChosenPlace={setChosenPlace}
          setIsMoreButtonDisabled={setIsMoreButtonDisabled}
        />
        <MapResults
          places={places}
          chosenPlace={chosenPlace}
          setChosenPlace={setChosenPlace}
          placeClicked={placeClicked}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          handleMoreButtonClick={handleMoreButtonClick}
          isMoreButtonDisabled={isMoreButtonDisabled}
          setPlaceClicked={setPlaceClicked}
        />
        {isMoreButtonDisabled ? (
          <button className="mx-4 px-4 py-2 rounded-md text-lg bg-accent-900 text-accent-300 cursor-default hidden max-md:block">
            Load More
          </button>
        ) : (
          <button
            className="mx-4 px-4 py-2 rounded-md text-lg bg-primary-900 text-background-color hover:bg-primary-700 ease-in-out duration-150 hidden max-md:block"
            onClick={handleMoreButtonClick}
          >
            Load More
          </button>
        )}
      </div>
      {isLoaded ? (
        <div className=" w-2/3 h-full max-md:w-full">
          <Map
            isLoaded={isLoaded}
            filter={chosenType}
            city={chosenCity}
            places={places}
            setPlaces={setPlaces}
            placeClicked={placeClicked}
            setPlaceClicked={setPlaceClicked}
            setIsLoading={setIsLoading}
            handlePagination={handlePagination}
            setIsMoreButtonDisabled={setIsMoreButtonDisabled}
            setChosenPlace={setChosenPlace}
            chosenPlace={chosenPlace}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Maps;
