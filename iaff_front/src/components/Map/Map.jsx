import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { DEFAULT_LAT, DEFAULT_LNG } from "../../constants/mapConstants";
import mapImage from "../../assets/images/map.jpg";

const Map = (props) => {
  const {
    city,
    filter,
    places,
    setPlaces,
    setPlaceClicked,
    setIsLoading,
    handlePagination,
    setIsMoreButtonDisabled,
    setChosenPlace,
    placeClicked,
    chosenPlace,
  } = props;

  const [center, setCenter] = useState({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const getCityLocationByName = () => {
    const request = {
      query: city,
      fields: ["name", "geometry"],
    };

    let service = new window.google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, (result, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setCenter(result[0].geometry.location);
        if (filter !== null) {
          getPlacesByFilter(result[0].geometry.location);
        }
      }
    });
  };

  const getPlacesByFilter = (location) => {
    setIsLoading(true);
    setIsMoreButtonDisabled(false);
    const request = {
      location: location,
      radius: 7000,
      keyword: filter,
    };

    let service = new window.google.maps.places.PlacesService(map);

    let allPlaces = [];

    service.nearbySearch(request, (results, status, pagination) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          if (results[i].rating !== 0 && results[i].user_ratings_total > 10) {
            allPlaces.push(results[i]);
          }
        }
        setPlaces(allPlaces);
        setIsLoading(false);
        setIsMoreButtonDisabled(!pagination || !pagination.hasNextPage);
        handlePagination(() => pagination.nextPage());
      } else if (
        status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
      ) {
        console.log("No places found.");
      } else {
        console.error("Error fetching places:", status);
      }
    });
  };

  useEffect(() => {
    if (map !== null) {
      getCityLocationByName();
    }
  }, [city, map]);

  useEffect(() => {
    if (map !== null) {
      setPlaces([]);
      if (filter !== null) {
        getPlacesByFilter(center);
      }
    }
  }, [filter, map]);

  const handleMapClick = () => {
    setPlaceClicked(null);
  };

  return (
    <>
      <GoogleMap
        mapContainerClassName="w-full h-full z-10 shadow-md"
        center={center}
        radius={10000}
        zoom={11}
        options={{
          mapTypeControl: false,
          fullscreenControl: true,
          streetViewControl: false,
          zoomControl: true,
        }}
        onLoad={onLoad}
        onClick={handleMapClick}
      >
        {places.map((place) => (
          <Marker
            key={place.placeId}
            position={place.geometry.location}
            icon={
              place === placeClicked || place === chosenPlace
                ? {
                    url: "http://maps.google.com/mapfiles/ms/micons/red.png",
                  }
                : {
                    url: "http://maps.google.com/mapfiles/ms/micons/blue.png",
                  }
            }
            onClick={() => {
              setPlaceClicked(place);
              setChosenPlace(null);
            }}
          />
        ))}
        {placeClicked && (
          <InfoWindow
            position={placeClicked.geometry.location}
            mapContainerClassName="w-feet h-feet"
            onCloseClick={() => {
              setPlaceClicked(null);
            }}
          >
            <div className="p-4 flex flex-col items-center gap-3 w-feet max-md:w-64">
              <h1 className="text-xs w-1/2 font-semibold text-primary-900 text-center max-md:text-base">
                {placeClicked.name}
              </h1>
              <img
                src={
                  placeClicked.photos
                    ? placeClicked.photos[0].getUrl({
                        maxWidth: 500,
                        maxHeight: 500,
                      })
                    : mapImage
                }
                alt="place"
                className="w-64 max-md:w-full rounded-md h-32 max-md:h-44 object-cover"
              />
              <p className="text-center hidden max-md:block">
                {placeClicked.vicinity}
              </p>
              <a
                href={`https://www.google.com/maps?q=${placeClicked.vicinity},${placeClicked.name}`}
                className="px-4 py-2 border text-center rounded-md hover:bg-accent-500 hidden max-md:block ease-in-out duration-200"
                target="_blank"
                rel="noreferrer"
              >
                See on Google Maps
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
};

export default Map;
