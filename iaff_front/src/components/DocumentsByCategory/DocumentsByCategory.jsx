import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import survey from "../../assets/images/survey.jpg";
import Loading from "../../components/Spinner/Loading";

import { getDocumentsByCategory } from "../../utils/Documents/getDocumentsByCategoryAPI";

const DocumentsByCategory = ({ category }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await getDocumentsByCategory(category);
        setIsLoading(false);
        setArticles(result);
      } catch (error) {
        console.error("Error: " + error);
      }
    };

    if (category !== "") {
      setTimeout(() => {
        fetchData();
      }, 500);
    }
  }, [category]);

  return (
    <div className="flex flex-wrap w-full">
      {isLoading ? (
        <div className="w-full flex flex-col items-center justify-center h-96">
          <Loading height={150} width={150} />
        </div>
      ) : articles ? (
        articles.map((item) => (
          <div
            className="w-1/3 max-xl:w-1/2 max-md:w-full p-8 cursor-pointer animate-fade-in"
            onClick={() => {
              navigate(0);
            }}
            key={item.id}
          >
            <div className="flex flex-col w-full h-full items-center space-y-2 border-2 shadow-md rounded-md border-solid border-accent-900 hover:scale-105 ease-in-out duration-150 p-4">
              <img
                src={survey}
                alt="document"
                className="w-full h-60 object-cover rounded-md"
              ></img>
              <h1 className="text-center text-xl max-2xl:text-lg max-lg:text-base ease-in-out duration-200 text-primary-900 hover:text-primary-700">
                {item.title}
              </h1>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default DocumentsByCategory;
