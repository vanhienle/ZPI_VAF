import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { mapOptions } from "../MapConfiguration/MapConfiguration";

const google = window.google;

const Map = (props) => {
  const { isLoaded, lat, lng, filter, city } = props;
  const [places, setPlaces] = useState([]);
  const [center, setCenter] = useState({ latitude: lat, longitude: lng });

  const fetchPlaces = useCallback((lat, lng, filter) => {
    const placesService = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: { lat, lng },
      radius: 10000,
      type: filter,
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const newPlaces = results.map((place) => ({
          placeId: place.place_id,
          name: place.name,
          coords: place.geometry.location,
        }));

        setPlaces(newPlaces);
      } else {
        console.error("Places service request failed. Status:", status);
      }
    });
  }, []);

  useEffect(() => {
    const selectedOption = filter;

    if (selectedOption && city) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${mapOptions.googleMapApiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "OK" && data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setCenter({ lat, lng });
            fetchPlaces(lat, lng, selectedOption);
          } else {
            console.error("Invalid city input or no results found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [filter, city, fetchPlaces]);

  return (
    isLoaded && (
      <>
        <GoogleMap
          mapContainerClassName="w-1/2 h-[640px]"
          center={{ lat, lng }}
          radius={10000}
          zoom={12}
          options={{
            mapTypeControl: false,
            fullscreenControl: true,
            streetViewControl: false,
            zoomControl: true,
          }}
        >
          {places.map((place) => (
            <Marker key={place.placeId} position={place.coords} />
          ))}
        </GoogleMap>
      </>
    )
  );
};

export default Map;
