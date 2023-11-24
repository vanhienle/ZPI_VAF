import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { getDocumentsByName } from "../../utils/Documents/getDocumentsByNameAPI";
import accommodation from "../../assets/images/accomodation.jpg";
import Loading from "../Spinner/Loading";

const SearchDocuments = () => {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchRef = useRef();

  const handleSearchText = (value) => {
    setSearchText(value);
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (isOpen && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    setSearchLoading(true);
    const fetchData = async () => {
      try {
        const results = await getDocumentsByName(searchText);
        setArticles(results);
        setSearchLoading(false);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    };

    setTimeout(() => {
      if (searchText.trim() !== "" && searchText.length > 3) {
        fetchData();
      } else {
        setArticles([]);
        setSearchLoading(false);
      }
    }, 500);
  }, [searchText]);

  return (
    <div ref={searchRef} className="relative">
      <div className="flex w-full items-center border-2 rounded-md p-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full outline-none px-2 max-md:text-sm max-sm:text-xs "
          // Add your search functionality onChange
          onChange={(e) => handleSearchText(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        <FaSearch className="text-gray-500" />
      </div>
      {isOpen ? (
        <div className="absolute z-10 w-full mt-4 flex flex-col space-y-6 p-3 items-start justify-center border-2 border-text-color rounded-md bg-accent-500 bg-opacity-90">
          {searchLoading ? (
            <div className="h-44 w-full flex items-center justify-center">
              <Loading />
            </div>
          ) : articles && articles.length !== 0 ? (
            <div className="overflow-y-auto h-96 w-full">
              {articles.map((item) => (
                <a
                  key={item.id}
                  href={`documents/${item.id}`}
                  className="flex justify-between items-center p-3 rounded-md hover:bg-accent-900 hover:scale-95 hover:bg-opacity-60 w-full cursor-pointer ease-in-out duration-300"
                >
                  <div className="w-1/4 max-2xl:w-1/2 max-xl:w-1/4 max-lg:w-1/2 flex">
                    <img
                      src={accommodation}
                      alt="document"
                      className="w-40 h-40 rounded-md"
                    />
                  </div>
                  <div className="w-3/4 max-2xl:w-1/2 max-xl:w-3/4 max-lg:w-1/2 flex max-2xl:flex-col max-xl:flex-row max-lg:flex-col justify-around max-2xl:items-center max-2xl:justify-center max-xl:items-start max-xl:justify-around max-lg:items-center max-lg:justify-center">
                    <div className="w-full flex flex-col text-center">
                      <h1 className="text-primary-900 font-bold text-lg">
                        {item.title}
                      </h1>
                      <p className="font-bold">{item.category}</p>
                    </div>
                    <p className="text-base text-center max-sm:hidden">
                      {item.short}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <h1 className="h-44 w-full flex items-center justify-center text-xl">
              No results or search is empty!
            </h1>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchDocuments;
