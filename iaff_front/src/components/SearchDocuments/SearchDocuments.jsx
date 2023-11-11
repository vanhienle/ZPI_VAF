import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getDocumentsByName } from "../../utils/Documents/getDocumentsByNameAPI";

const SearchDocuments = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchText = (value) => {
    setSearchText(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getDocumentsByName(searchText);
        // Handle the fetched results, e.g., update the state or perform other actions
        console.log(results);
      } catch (error) {
        // Handle errors if necessary
        console.error(error);
      }
    };
    // Only trigger the API call if the search text is not empty
    if (searchText.trim() !== "") {
      fetchData();
    }
  }, [searchText]);

  return (
    <div className="flex w-full items-center border-2 rounded-md p-2">
      <input
        type="text"
        placeholder="Search..."
        className="w-full outline-none px-2 "
        // Add your search functionality onChange
        onChange={(e) => handleSearchText(e.target.value)}
      />
      <FaSearch className="text-gray-500" />
    </div>
  );
};

export default SearchDocuments;
