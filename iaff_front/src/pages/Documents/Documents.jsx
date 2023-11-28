import React, { useEffect, useState } from "react";
import SearchDocuments from "../../components/SearchDocuments/SearchDocuments";
import DocumentsByCategory from "../../components/DocumentsByCategory/DocumentsByCategory";
import DocumentsRecommendation from "../../components/DocumentsRecommendation/DocumentsRecommendation";

import { getCategories } from "../../utils/Documents/getAllCategoriesAPI";
import Loading from "../../components/Spinner/Loading";

const Documents = ({ isLogin }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Cards");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getCategories();
        setCategories(results);
        setIsLoadingCategories(false);
        console.log(results);
      } catch (error) {
        console.error("Error in Documents: " + error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-6 space-y-12 max-md:space-y-6">
      {/** Info about module section */}
      <div className="w-1/2 max-md:w-3/4 max-sm:w-full max-sm:px-6 text-center flex flex-col items-center justify-center space-y-4">
        <h1 className="text-primary-900 text-2xl max-xl:text-xl max-md:text-base font-semibold ease-in-out duration-300">
          Documents Page
        </h1>
        <p className="text-lg max-2xl:text-base max-md:text-sm max-sm:text-xs mt-6 font-semibold ease-in-out duration-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      {/** Search of all documents section */}
      <div className="w-1/2 max-xl:w-3/4 max-md:w-full px-6">
        <SearchDocuments />
      </div>

      {/* Delimiter */}
      <div className="border-solid border-text-color bg-text-color border rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />

      {/** Recommended sections */}
      <DocumentsRecommendation isLogin={isLogin} />

      {/* Delimiter */}
      <div className="border-solid border-text-color bg-text-color border rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />

      {/** All Documents */}
      <div className="w-3/4 max-2xl:w-full max-xl:w-3/4 max-lg:w-full max-md:w-3/4 max-sm:w-full flex flex-col items-center">
        <div className="w-full flex justify-evenly flex-wrap">
          {isLoadingCategories ? (
            <div>
              <Loading width={80} height={80} radius={9} />
            </div>
          ) : (
            categories.map((item) => (
              <p
                className={`${
                  item.category === category
                    ? `bg-secondary-300 hover:bg-secondary-500`
                    : `hover:bg-secondary-300`
                } 
             p-2 m-2 shadow-md rounded-lg text-lg max-lg:text-base ease-in-out duration-200 cursor-pointer px-4 animate-fade-in`}
                key={item.category}
                onClick={() => setCategory(item.category)}
              >
                {item.category}
              </p>
            ))
          )}
        </div>
        <DocumentsByCategory category={category} />
      </div>
    </div>
  );
};

export default Documents;
