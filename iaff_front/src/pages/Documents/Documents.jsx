import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchDocuments from "../../components/SearchDocuments/SearchDocuments";
import DocumentsByCategory from "../../components/DocumentsByCategory/DocumentsByCategory";
import accomodation from "../../assets/images/accomodation.jpg";
import survey from "../../assets/images/survey.jpg";
import documents from "../../assets/images/documents.jpg";
import assistant from "../../assets/images/assistant.jpg";
import signImage from "../../assets/images/signin.jpg";
import mapImage from "../../assets/images/map.jpg";

import { getRecommendations } from "../../utils/Documents/getRecommendationAPI";
import { getCategories } from "../../utils/Documents/getAllCategoriesAPI";

const Documents = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const dataCategory = [
    { id: 1, name: "PESEL" },
    { id: 2, name: "Cards" },
    { id: 3, name: "Residence" },
    { id: 4, name: "Job" },
    { id: 5, name: "Student" },
    { id: 6, name: "Refugee" },
    { id: 7, name: "Insurence" },
    { id: 8, name: "For Parents" },
  ];

  const mapData = [
    {
      id: 1,
      title: "One Document",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" +
        "nisi ut aliquip ex ea commodo consequat.",
      image: accomodation,
    },
    {
      id: 2,
      title: "Two Document",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" +
        "nisi ut aliquip ex ea commodo consequat.",
      image: survey,
    },
    {
      id: 3,
      title: "Three Document",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" +
        "nis ut aliquip ex ea commodo consequat.",
      image: documents,
    },
    {
      id: 4,
      title: "Four Document",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" +
        "nisi ut aliquip ex ea commodo consequat.",
      image: signImage,
    },
    {
      id: 5,
      title: "Five Document",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" +
        "nisi ut aliquip ex ea commodo consequat.",
      image: assistant,
    },
    {
      id: 6,
      title: "Six Document",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" +
        "nisi ut aliquip ex ea commodo consequat.",
      image: mapImage,
    },
  ];

  useEffect(() => {
    const getFetchRecommendation = async () => {
      try {
        const result = await getRecommendations();
        console.log(result);
      } catch (error) {
        console.log("error");
      }
    };

    getFetchRecommendation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getCategories();
        setCategories(results);
        console.log(results);
      } catch (error) {
        // Handle errors if necessary
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

      {/** Recommended sections */}
      <div className="w-3/4 flex flex-col items-center mt-44">
        <h1 className="text-primary-900 text-2xl max-xl:text-xl max-md:text-base font-semibold ease-in-out duration-300">
          Recommended for you:
        </h1>
        <div className="flex flex-wrap w-full">
          {mapData.map((item) => (
            <div
              className="w-1/3 max-xl:w-1/2 max-md:w-full p-8 cursor-pointer"
              onClick={() => {
                navigate(0);
              }}
              key={item.id}
            >
              <div className="flex flex-col items-center space-y-2 border-2 shadow-md rounded-md border-solid border-accent-900 hover:scale-105 ease-in-out duration-150 p-4">
                <img
                  src={item.image}
                  alt="document"
                  className="w-full h-60 object-cover rounded-md max-sm:hidden"
                ></img>
                <h1 className="text-center text-xl max-2xl:text-lg max-lg:text-base ease-in-out duration-200 text-primary-900 hover:text-primary-700">
                  {item.title}
                </h1>
                <p className="w-3/4 text-center text-base max-xl:text-sm max-lg:text-xs ease-in-out duration-200 hover:text-primary-700">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/** All Documents */}
      <div className="w-3/4 flex flex-col items-center">
        <div className="w-full flex justify-evenly flex-wrap">
          {categories.map((item) => (
            <p
              className={`${
                item.id === 3
                  ? `bg-secondary-300 hover:bg-secondary-500`
                  : `hover:bg-secondary-300`
              } 
             p-2 m-2 rounded-lg text-lg max-lg:text-base ease-in-out duration-200 cursor-pointer px-4`}
              key={item.category}
              onClick={() => setCategory(item.category)}
            >
              {item.category}
            </p>
          ))}
        </div>
        <DocumentsByCategory category={category} />
      </div>
    </div>
  );
};

export default Documents;
