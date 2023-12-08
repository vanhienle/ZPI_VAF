import React, { useEffect } from "react";
import Loading from "../../components/Spinner/Loading";
import mapImage from "../../assets/images/map.jpg";
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const MapPlaceDetails = (props) => {
  const {
    chosenPlace,
    setChosenPlace,
    isLoading,
    setIsLoading,
    setPlaceClicked,
  } = props;

  const handleBackButtonClick = () => {
    setPlaceClicked(chosenPlace);
    setChosenPlace(null);
  };

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [setIsLoading]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="rounded-md w-full p-4 flex flex-col items-center justify-center gap-4 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between w-full gap-4">
        <button
          onClick={() => handleBackButtonClick()}
          className="rounded-md text-background-color bg-primary-900 px-4 py-2 hover:bg-primary-700 ease-in-out duration-150"
        >
          Back
        </button>
        <p className="text-lg font-semibold text-right">{chosenPlace.name}</p>
      </div>

      {/* Image */}
      <div className="w-full">
        <img
          src={
            chosenPlace.photos
              ? chosenPlace.photos[0].getUrl({
                  maxWidth: 1000,
                  maxHeight: 1000,
                })
              : mapImage
          }
          alt="place"
          className="w-full rounded-md h-64 object-cover"
        />
      </div>

      {/* Address */}
      {chosenPlace.vicinity && (
        <div className="flex justify-between w-full items-center">
          <FaMapMarkerAlt className="text-accent-300" />
          <p className="text-base text-accent-300 font-bold">
            {chosenPlace.vicinity}
          </p>
        </div>
      )}

      {/* Price */}
      {chosenPlace.price_level && (
        <div className="flex justify-between w-full items-center">
          <p className="text-base text-accent-300 font-bold">Price:</p>
          <div className="flex justify-end items-center w-feet">
            {Array(chosenPlace.price_level)
              .fill()
              .map((_, index) => (
                <FaDollarSign key={index} className="text-sm text-accent-300" />
              ))}
          </div>
        </div>
      )}

      {/* Rating */}
      {chosenPlace.rating !== 0 && (
        <div className="flex justify-between w-full items-center">
          <p className="text-base text-accent-300 font-bold">Rating:</p>
          <p className="w-feet text-primary-900 flex items-center gap-2 line-he">
            <FaStar className="text-primary-900" />
            {chosenPlace.rating}
          </p>
        </div>
      )}

      {/* Voted Users */}
      {chosenPlace.user_ratings_total !== 0 && (
        <div className="flex justify-between w-full items-center">
          <p className="text-base text-accent-300 font-bold">Ranked by:</p>
          <p className="text-base text-accent-300 font-bold">
            {chosenPlace.user_ratings_total} users
          </p>
        </div>
      )}

      {/* Types of Place */}
      {chosenPlace.types && (
        <div className="flex flex-wrap gap-6 justify-center w-full items-center">
          {chosenPlace.types.map((type) => (
            <p
              key={type}
              className="rounded-lg shadow-md bg-accent-900 text-text-color px-4 py-2 cursor-default font-semibold text-sm"
            >
              {type}
            </p>
          ))}
        </div>
      )}

      {/* Link to Google Maps */}
      <div className="flex justify-center w-full">
        <a
          href={`https://www.google.com/maps?q=${chosenPlace.vicinity},${chosenPlace.name}`}
          target="_blank"
          rel="noreferrer"
          className="text-base text-accent-300 font-bold px-4 py-2 rounded-md shadow-md border border-accent-300 hover:bg-accent-500 ease-in-out duration-150"
        >
          See on Google Maps
        </a>
      </div>
    </div>
  );
};

export default MapPlaceDetails;
