import React from "react";
import { useNavigate } from "react-router-dom";
import accomodation from "../../assets/images/accomodation.jpg";
import survey from "../../assets/images/survey.jpg";
import documents from "../../assets/images/documents.jpg";
import assistant from "../../assets/images/assistant.jpg";
import signImage from "../../assets/images/signin.jpg";
import mapImage from "../../assets/images/map.jpg";

const DocumentsByCategory = () => {
  const navigate = useNavigate();

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

  return (
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
              className="w-full h-60 object-cover rounded-md"
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
  );
};

export default DocumentsByCategory;
