import React from "react";
import mapImage from "../../assets/images/map.jpg";
import { FaStar } from "react-icons/fa";

const MapShortPlaceDetails = (props) => {
  const { place, handleChoosingPlace } = props;
  return (
    <div
      className="rounded-md shadow-md w-full flex flex-col items-center hover:bg-accent-500 cursor-pointer hover:scale-105 ease-in-out duration-200"
      onClick={() => handleChoosingPlace(place)}
    >
      <img
        src={
          place.photos
            ? place.photos[0].getUrl({
                maxWidth: 1000,
                maxHeight: 1000,
              })
            : mapImage
        }
        alt="Place"
        className="w-full rounded-t-md h-64 object-cover"
      />
      <div className="flex justify-between w-full items-center p-6">
        <p className="flex items-center gap-2 font-semibold cursor-pointer">
          <img src={place.icon} alt="Type of Place" className="h-5"></img>
          {place.name}
        </p>
        {place.rating !== 0 && (
          <p className="w-feet text-primary-900 flex items-center gap-2 line-he">
            <FaStar className="text-primary-900" />
            {place.rating}
          </p>
        )}
      </div>
    </div>
  );
};

export default MapShortPlaceDetails;
