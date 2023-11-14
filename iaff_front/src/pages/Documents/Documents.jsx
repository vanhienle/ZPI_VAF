import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchDocuments from "../../components/SearchDocuments/SearchDocuments";
import DocumentsByCategory from "../../components/DocumentsByCategory/DocumentsByCategory";
import documents from "../../assets/images/documents.jpg";
import TextLoading from "../../components/Spinner/TextLoading";

import {
  SIGN_IN_TITLE,
  SIGN_IN_DESCRIPTION,
  SURVEY_TITLE,
  SURVEY_DESCRIPTION,
  SURVEY_BUTTON,
} from "../../constants/home";

import { SIGN_IN_CONSTANT, SIGN_UP_CONSTANT } from "../../constants/main";

import signInImage from "../../assets/images/signin.jpg";
import surveyImage from "../../assets/images/survey.jpg";

import { getRecommendations } from "../../utils/Documents/getRecommendationAPI";
import { getCategories } from "../../utils/Documents/getAllCategoriesAPI";
import { isFilledSurvey } from "../../utils/Survey/isFilledSurveyAPI";
import Loading from "../../components/Spinner/Loading";

const Documents = ({ isLogin }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("cards");
  const [recommended, setRecommended] = useState([]);
  const [isSurvey, setIsSurvey] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getFetchRecommendation = async () => {
      try {
        const result = await getRecommendations();
        setRecommended(result);
        setIsLoadingRecommendations(false);
        console.log(result);
      } catch (error) {
        console.log("error");
      }
    };

    async function fetchIsFilledSurvey() {
      try {
        const resultSurvey = await isFilledSurvey();
        if (resultSurvey) {
          setIsSurvey(true);
          console.log("Survey is filled");
          return true;
        } else {
          console.log("Survey is not filled");
          return false;
        }
      } catch (error) {
        console.error("Error: " + error.message);
      }
    }

    if (isLogin) {
      if (fetchIsFilledSurvey())
        setTimeout(() => getFetchRecommendation(), 500);
    }
    setTimeout(() => setIsLoadingRecommendations(false), 500);
  }, [isLogin]);

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
      {/** Recommended sections */}
      {isLoadingRecommendations ? (
        <div>
          <Loading />
        </div>
      ) : isLogin ? (
        isSurvey ? (
          <div className="w-3/4 flex flex-col items-center mt-44">
            <h1 className="text-primary-900 text-2xl max-xl:text-xl max-md:text-base font-semibold animate-fade-in">
              Recommended for you:
            </h1>
            <div className="flex flex-wrap w-full">
              {recommended.map((item) => (
                <div
                  className="w-1/3 max-xl:w-1/2 max-md:w-full p-8 cursor-pointer animate-fade-in"
                  onClick={() => {
                    navigate(0);
                  }}
                  key={item.id}
                >
                  <div className="flex flex-col items-center space-y-2 border-2 shadow-md rounded-md border-solid border-accent-900 hover:scale-105 ease-in-out duration-150 p-4">
                    <img
                      src={documents}
                      alt="document"
                      className="w-full h-60 object-cover rounded-md max-sm:hidden"
                    ></img>
                    <h1 className="text-center text-xl max-2xl:text-lg max-lg:text-base ease-in-out duration-200 text-primary-900 hover:text-primary-700">
                      {item.title}
                    </h1>
                    <p className="w-3/4 text-center text-base max-xl:text-sm max-lg:text-xs ease-in-out duration-200 hover:text-primary-700">
                      {/** Short Description */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center mt-44 animate-fade-in">
            <div
              className="bg-no-repeat bg-center bg-cover w-1/2 max-xl:w-3/4 rounded-md my-6 max-sm:my-4"
              style={{ backgroundImage: `url(${surveyImage})` }}
            >
              <div className="bg-secondary-300 text-center bg-opacity-50 flex flex-col justify-between rounded-md p-8">
                <div>
                  <h2 className="text-xl max-xl:text-base font-semibold">
                    {SURVEY_TITLE}
                  </h2>
                  <p className="text-base max-md:text-sm max-sm:text-xs px-4 my-6 font-semibold">
                    {SURVEY_DESCRIPTION}
                  </p>
                </div>
                <div className="flex justify-center">
                  <a
                    href="/change-survey"
                    className="bg-primary-900 text-background-color text-xl px-4 py-2 rounded-md hover:bg-primary-700 transition-all duration-200 ease-out"
                  >
                    {SURVEY_BUTTON}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="w-full flex justify-center mt-44 animate-fade-in">
          <div
            className="bg-no-repeat bg-center bg-cover w-1/2 max-xl:w-3/4 rounded-md my-6 max-sm:my-4"
            style={{ backgroundImage: `url(${signInImage})` }}
          >
            <div className="bg-accent-900 text-center bg-opacity-80 flex flex-col justify-between rounded-md p-8">
              <div>
                <h2 className="text-xl max-xl:text-base font-semibold">
                  {SIGN_IN_TITLE}
                </h2>
                <p className="text-base max-md:text-sm max-sm:text-xs px-4 my-6 font-semibold">
                  {SIGN_IN_DESCRIPTION}
                </p>
              </div>
              <div className="flex justify-evenly">
                <a
                  href="/login"
                  className="bg-secondary-300 text-primary-900 text-base max-md:text-sm max-sm:text-xs px-4 py-2 rounded-md hover:bg-secondary-500  hover:text-text-color transition-all duration-200 ease-out"
                >
                  {SIGN_IN_CONSTANT}
                </a>
                <a
                  href="/sign-up"
                  className="bg-primary-900 text-base max-md:text-sm max-sm:text-xs px-4 py-2 text-background-color rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out"
                >
                  {SIGN_UP_CONSTANT}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
             p-2 m-2 rounded-lg text-lg max-lg:text-base ease-in-out duration-200 cursor-pointer px-4 animate-fade-in`}
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
