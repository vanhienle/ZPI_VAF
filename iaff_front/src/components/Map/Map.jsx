import React, { useState, useCallback, useEffect, useRef } from "react";
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

  const infoWindowRef = useRef();

  const [center, setCenter] = useState({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

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

  const handleOutsideInfoWindowClick = useCallback(
    (e) => {
      const infoWindowElement = document.querySelector(".gm-style-iw");

      if (
        selectedMarker &&
        infoWindowElement &&
        !infoWindowElement.contains(e.target)
      ) {
        setSelectedMarker(null);
        setPlaceClicked(null);
        setChosenPlace(null);
      }
    },
    [selectedMarker]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideInfoWindowClick);

    return () => {
      document.removeEventListener("click", handleOutsideInfoWindowClick);
    };
  }, [handleOutsideInfoWindowClick]);

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
              setSelectedMarker(place);
            }}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            ref={infoWindowRef}
            position={selectedMarker.geometry.location}
            mapContainerClassName="hidden max-md:block w-feet h-feet"
            onCloseClick={() => {
              setSelectedMarker(null);
              setPlaceClicked(null);
              setChosenPlace(null);
            }}
          >
            <div className="p-4 flex flex-col gap-3">
              <h1 className="text-base font-semibold text-primary-900 text-center">
                {selectedMarker.name}
              </h1>
              <img
                src={
                  selectedMarker.photos
                    ? selectedMarker.photos[0].getUrl({
                        maxWidth: 500,
                        maxHeight: 500,
                      })
                    : mapImage
                }
                alt="place"
                className="w-full rounded-md h-44 object-cover"
              />
              <p className="text-left">{selectedMarker.vicinity}</p>
              <a
                href={`https://www.google.com/maps?q=${selectedMarker.vicinity},${selectedMarker.name}`}
                className="text-left hover:text-primary-500"
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
