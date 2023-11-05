import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchDocuments = () => {
  return (
    <div className="flex w-full items-center border-2 rounded-md p-2">
      <input
        type="text"
        placeholder="Search..."
        className="w-full outline-none px-2 "
        // Add your search functionality onChange
      />
      <FaSearch className="text-gray-500" />
    </div>
  );
};

export default SearchDocuments;
