import React from "react";
import { useState, useEffect } from "react";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import Filters from "./Filters";
import Listing from "./Listing";
import { getHotels } from "../../utils/Accommodation/getHotels";
const Accommodation = () => {
  const [loadedListings, setLoadedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState([1, 2, 3, 4]);
  const [activePage, setActivePage] = useState(1);
  const [maxPage, setMaxPage] = useState(4);
  const [listingCount, setListingCount] = useState(0);
  const [params, setParams] = useState(null);
  const [information, setInformation] = useState("");
  const handlePageClick = (page) => {
    setActivePage(() => {
      const pageCount = Math.min(maxPage, 4);
      setPages(
        Array.from(
          { length: pageCount },
          (_, i) => Math.min(page, maxPage - pageCount + 1) + i
        )
      );
      return page;
    });
  };

  const handleNextPageClick = () => {
    handlePageClick(activePage + 1);
  };

  const handlePreviousPageClick = () => {
    handlePageClick(activePage - 1);
  };

  const handleSearchHotels = async (params) => {
    setIsLoading(true);
    setLoadedListings([]);
    setListingCount(0);
    const result = await getHotels(params);
    if (result && result.count > 0) {
      setLoadedListings(result.result);
      setListingCount(result.count);
      setIsLoading(false);
      if (params.newSearch) {
        const newMaxPage = Math.ceil(result.count / 20);
        setMaxPage(newMaxPage);
        setPages(
          Array.from({ length: Math.min(newMaxPage, 4) }, (_, i) => i + 1)
        );
      }
    } else {
      handleSetInformation("No listings found");
    }
    setParams(params);
  };

  const handleSetInformation = (info) => {
    setInformation(info);
    setLoadedListings([]);
    setListingCount(0);
    setIsLoading(false);
  };

  useEffect(() => {
    if (params) {
      setParams((prev) => {
        let newParams = prev;
        newParams.activePage = activePage - 1;
        newParams.newSearch = false;
        handleSearchHotels(newParams);
        return newParams;
      });
    }
  }, [activePage]);

  return (
    <div className="flex flex-col items-center px-20 max-sm:px-6 py-6">
      <div>
        <h1 className="text-primary-900 text-2xl max-xl:text-xl max-md:text-base font-semibold ease-in-out duration-300">
          Accommodation
        </h1>
      </div>
      <div className="">
        <Filters
          handleSearchHotels={handleSearchHotels}
          handleSetInformation={handleSetInformation}
        />
      </div>

      {loadedListings.length > 0 ? (
        loadedListings.map((listing, index) => (
          <div className="w-1/2 max-2xl:w-3/4 max-lg:w-full">
            <Listing id={index} params={listing} filterParams={params} />
          </div>
        ))
      ) : (
        <div className="h-[60vh] w-1/2 max-2xl:w-full">
          {isLoading && (
            <div className="spinner border-4 border-accent-500 border-t-4 border-t-accent-900 w-20 h-20 rounded-full mx-auto"></div>
          )}
          {!isLoading && information.length > 0 && (
            <>
              <div className="font-semibold text-xl max-xl:text-lg max-lg:text-base text-error-900">
                Information:
              </div>
              <div>{information}</div>
            </>
          )}
        </div>
      )}

      {listingCount > 0 && (
        <div className="flex items-center justify-center space-x-2">
          <HiOutlineChevronLeft
            className={`cursor-pointer rounded-full border-2 p-1.5 border-accent-900 text-accent-700 ${
              activePage === 1 ? "invisible" : ""
            }`}
            size={45}
            onClick={() => {
              handlePreviousPageClick();
            }}
          />
          {pages.map((page, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full ${
                page === activePage ? "bg-accent-700" : "bg-background-color"
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}

          <div
            className={`font-medium ${
              activePage === maxPage || pages[pages.length - 1] === maxPage
                ? "invisible"
                : ""
            }`}
          >
            ...
          </div>

          <HiOutlineChevronRight
            className={`cursor-pointer rounded-full border-2 p-1.5 border-accent-900 text-accent-700 ${
              activePage === maxPage ? "invisible" : ""
            }`}
            size={45}
            onClick={() => {
              handleNextPageClick();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Accommodation;
