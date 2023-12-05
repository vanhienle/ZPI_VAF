import React from "react";

const facilityMap = {
  8: ["24h reception", "fa fa-check"],
  17: ["Airport shuttle", "fas fa-shuttle-van"],
  46: ["Free parking", "fas fa-parking"],
  107: ["Free Wifi", "fas fa-wifi"],
  433: ["Swimming pool", "fas fa-swimming-pool"],
};

const Listing = ({ id, params, filterParams }) => {
  const facilities = params.hotel_facilities.split(",");

  const handleClickOpen = () => {
    const URL =
      params.url +
      "?checkin=" +
      filterParams.checkInDate +
      "&checkout=" +
      filterParams.checkOutDate +
      "&group_adults=" +
      filterParams.guestCount +
      "&no_rooms" +
      filterParams.roomCount;
    window.open(URL, "_blank");
  };
  return (
    <div
      key={id}
      className="flex flex-row rounded-xl bg-background-color shadow-lg w-full mb-8"
    >
      <div>
        <img
          src={params.max_photo_url}
          alt="Listing"
          className="object-cover w-80 max-md:w-60 max-sm:w-40 h-60 max-sm:h-40 rounded-xl"
        />
      </div>
      <div className="px-6 max-sm:px-3 flex flex-col justify-start w-2/3 max-sm:w-3/5">
        <h1 className="text-xl max-md:text-lg max-sm:text-base font-medium mb-2">
          {params.hotel_name}
        </h1>
        {params.review_score &&
          params.review_nr &&
          params.review_score_word && (
            <p className="text-xs mb-4 ">
              {params.review_score} ({params.review_nr}){" "}
              {params.review_score_word}
            </p>
          )}
        <div className="flex flex-wrap flex-grow mb-4 w-full">
          {params.class > 0 && (
            <div className="text-sm max-sm:text-xs inline-flex items-center mr-2 mb-2 rounded-full px-3 py-1">
              <i className="fas fa-hotel mr-1"></i>
              {params.class}-star hotel
            </div>
          )}
          {Object.keys(facilityMap).map(
            (key, index) =>
              facilities.includes(key) && (
                <div className="text-sm max-sm:text-xs inline-flex items-center mr-2 mb-2 rounded-full px-3 py-1">
                  <i className={`mr-1 ${facilityMap[key][1]}`}></i>
                  {facilityMap[key][0]}
                </div>
              )
          )}
        </div>
        <div className="flex items-center justify-between mb-6 max-sm:mb-3">
          <span className="text-3xl max-md:text-2xl max-sm:text-xl font-bold">
            {params.price_breakdown.currency}{" "}
            {Math.ceil(params.price_breakdown.all_inclusive_price)}
          </span>
          <button
            className="text-background-color bg-primary-900 hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => {
              handleClickOpen();
            }}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listing;
