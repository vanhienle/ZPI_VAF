import React, { useEffect, useState } from "react";

import { getRecommendations } from "../../utils/Documents/getRecommendationAPI";

import Loading from "../../components/Spinner/Loading";
import TextLoading from "../../components/Spinner/TextLoading";

import {
  SIGN_IN_CONSTANT,
  SIGN_UP_CONSTANT,
} from "../../constants/mainConstants";
import {
  SIGN_IN_DESCRIPTION,
  SURVEY_DESCRIPTION,
} from "../../constants/homeConstants";

import signInImage from "../../assets/images/signin.jpg";
import surveyImage from "../../assets/images/survey.jpg";

const DocumentsRecommendation = ({ isLogin, isSurvey }) => {
  const [recommendedDocuments, setRecommendedDocuments] = useState([]);
  const [isLoadingVariants, setIsLoadingVariants] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(true);

  useEffect(() => {
    const getRecommendation = async () => {
      try {
        const result = await getRecommendations();
        setIsLoadingRecommendations(false);
        setRecommendedDocuments(result);
      } catch (error) {
        console.error("Error with getting recommendations: " + error.message);
      }
    };

    if (isLogin) {
      if (isSurvey) {
        getRecommendation();
      }
    }

    setTimeout(() => {
      setIsLoadingVariants(false);
    }, 1000);
  }, [isLogin, isSurvey]);

  return (
    <>
      {isLoadingVariants ? (
        <div>
          <Loading />
        </div>
      ) : isLogin ? (
        isSurvey ? (
          <div className="w-3/4 max-2xl:w-full max-xl:w-3/4 max-lg:w-full max-md:w-3/4 max-sm:w-full flex flex-col items-center">
            {/* Recommendations Block */}
            <h1 className="text-primary-900 text-2xl max-xl:text-xl max-md:text-base font-semibold animate-fade-in">
              Recommended for you:
            </h1>
            {isLoadingRecommendations ? (
              <TextLoading />
            ) : (
              <div className="flex flex-wrap w-full ease-in-out duration-150">
                {recommendedDocuments.map((item) => (
                  <a
                    className="w-1/3 max-xl:w-1/2 max-md:w-full p-8 cursor-pointer animate-fade-in ease-in-out duration-150"
                    href={`documents/${item.id}`}
                    key={item.id}
                  >
                    <div className="flex flex-col w-full h-full items-center space-y-2 border-2 shadow-md rounded-md border-solid border-accent-900 hover:scale-105 ease-in-out duration-150 p-4">
                      <img
                        src={item.image}
                        alt="document"
                        className="w-full h-60 max-md:h-56 object-cover rounded-md ease-in-out duration-150"
                      ></img>
                      <h1 className="text-primary-900 text-center text-xl max-xl:text-lg max-md:text-base ease-in-out duration-200">
                        {item.title}
                      </h1>
                      <p className="text-center max-md:text-sm max-sm:text-xs ease-in-out duration-200">
                        {item.short}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex justify-center mt-44 animate-fade-in">
            {/* Fill Survey Block */}
            <div
              className="bg-no-repeat bg-center bg-cover w-1/2 max-xl:w-3/4 rounded-md my-6 max-sm:my-4"
              style={{ backgroundImage: `url(${surveyImage})` }}
            >
              <div className="bg-secondary-300 text-center bg-opacity-50 flex flex-col justify-between rounded-md p-8">
                <div>
                  <h2 className="text-xl max-xl:text-base font-semibold">
                    Recommendation System
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
                    Fill Survey
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="w-full flex justify-center mt-44 animate-fade-in">
          {/* Sign In | Sign Up Block */}
          <div
            className="bg-no-repeat bg-center bg-cover w-1/2 max-xl:w-3/4 rounded-md my-6 max-sm:my-4"
            style={{ backgroundImage: `url(${signInImage})` }}
          >
            <div className="bg-accent-900 text-center bg-opacity-80 flex flex-col justify-between rounded-md p-8">
              <div>
                <h2 className="text-xl max-xl:text-base font-semibold">
                  Join Us
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
    </>
  );
};

export default DocumentsRecommendation;
