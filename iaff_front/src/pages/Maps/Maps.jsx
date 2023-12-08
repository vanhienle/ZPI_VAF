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

  const [isMoreButtonDisabled, setIsMoreButtonDisabled] = useState();
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
    <div className="flex w-full">
      <div className="flex flex-col w-1/3">
        <MapFilters
          chosenCity={chosenCity}
          setChosenCity={setChosenCity}
          chosenType={chosenType}
          setChosenType={setChosenType}
          setChosenPlace={setChosenPlace}
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
        />
      </div>
      {isLoaded ? (
        <div className=" w-2/3 h-[38.75rem]">
          <Map
            isLoaded={isLoaded}
            filter={chosenType}
            city={chosenCity}
            places={places}
            setPlaces={setPlaces}
            setPlaceClicked={setPlaceClicked}
            setIsLoading={setIsLoading}
            handlePagination={handlePagination}
            setIsMoreButtonDisabled={setIsMoreButtonDisabled}
            setChosenPlace={setChosenPlace}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Maps;
