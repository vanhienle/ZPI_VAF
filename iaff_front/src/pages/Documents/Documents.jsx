import React, { useEffect, useState } from "react";
import SearchDocuments from "../../components/SearchDocuments/SearchDocuments";
import DocumentsByCategory from "../../components/DocumentsByCategory/DocumentsByCategory";
import DocumentsRecommendation from "../../components/DocumentsRecommendation/DocumentsRecommendation";
import TextLoading from "../../components/Spinner/TextLoading";

import { getCategories } from "../../utils/Documents/getAllCategoriesAPI";
import Loading from "../../components/Spinner/Loading";

const Documents = ({ isLogin }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Residency Cards");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="flex flex-col items-center justify-center mt-6 space-y-12">
      {/** Info about module section */}
      <div className="w-1/2 text-center flex flex-col items-center justify-center space-y-4">
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
      <div className="w-1/2">
        <SearchDocuments />
      </div>
      ()
      {/** Recommended sections */}
      <DocumentsRecommendation isLogin={isLogin} />
      {/** All Documents */}
      <div className="w-3/4 flex flex-col items-center">
        <div className="w-full flex justify-evenly flex-wrap">
          {isLoadingCategories ? (
            <div>
              <TextLoading width={50} height={50} radius={9} />
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
