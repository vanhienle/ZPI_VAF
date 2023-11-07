import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  appTitle,
  appDescription,
  assistantTitle,
  assistantDescription,
  qAndATitle,
  qAndA,
  modulesTitle,
  modulesInfo,
  signInTitle,
  signInDescription,
  surveyTitle,
  surveyDescription,
} from "../../constants/home";

import assistantImage from "../../assets/images/assistant.jpg";
import signInImage from "../../assets/images/signin.jpg";
import surveyImage from "../../assets/images/survey.jpg";

import { isFilledSurvey } from "../../utils/Survey/isFilledSurveyAPI";

const Home = ({ isLogin }) => {
  const [isSurvey, setIsSurvey] = useState(false);

  useEffect(() => {
    async function fetchIsFilledSurvey() {
      try {
        const resultSurvey = await isFilledSurvey();
        if (resultSurvey) {
          setIsSurvey(true);
          console.log("Survey is filled");
        } else {
          console.log("Survey is not filled");
        }
      } catch (error) {
        console.error("Error: " + error.message);
      }
    }
    if (isLogin) {
      fetchIsFilledSurvey();
    }
  }, [isLogin]);

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      {/* Application  Block */}
      <div className="text-center w-1/2 max-2xl:w-3/4 py-6 max-md:py-4 max-sm:py-2">
        <h1 className="text-primary-900 text-2xl max-xl:text-xl max-md:text-base font-semibold ease-in-out duration-300">
          {appTitle}
        </h1>
        <p className="text-lg max-2xl:text-base max-md:text-sm max-sm:text-xs mt-6 font-semibold ease-in-out duration-300">
          {appDescription}
        </p>
      </div>

      {/* Delimiter */}
      <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />

      {/* Assistant  Block */}
      <div
        className="bg-no-repeat bg-center bg-cover w-1/2 max-2xl:w-3/4 rounded-md my-6 max-sm:my-4"
        style={{ backgroundImage: `url(${assistantImage})` }}
      >
        <div className="bg-primary-900 text-center bg-opacity-80 flex justify-between rounded-md p-14 w-full max-md:p-4 max-xl:flex-col max-xl:justify-center">
          <div className="w-1/2 max-xl:w-full">
            <h2 className="text-background-color text-xl max-xl:text-base font-semibold ease-in-out duration-300">
              {assistantTitle}
            </h2>
            <p className="text-background-color p-2 mt-2 text-base max-md:text-sm max-sm:text-xs font-semibold whitespace-pre-line ease-in-out duration-300">
              {assistantDescription}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2 max-xl:w-full p-6">
            <input
              className="border-box text-base max-md:text-sm max-sm:text-xs px-4 py-2 w-full max-xl:w-3/4 max-lg:w-4/5 max-md:w-full m-4 rounded-md focus:outline-none"
              placeholder="Ask a question..."
            />
            <Link
              to="/assistant"
              className="px-4 py-2 text-base max-md:text-sm max-sm:text-xs rounded-md border-none text-primary-900 bg-secondary-300 hover:bg-secondary-500 hover:text-text-color ease-in-out duration-150"
            >
              Ask me
            </Link>
          </div>
        </div>
      </div>

      {/* Delimiter */}
      <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />

      {/* Questions and Answers */}
      <div className="w-1/2 max-2xl:w-3/4 flex flex-col items-center justify-center my-6 max-sm:my-4">
        <h2 className="text-2xl max-xl:text-xl max-md:text-base text-primary-900">
          {qAndATitle}
        </h2>
        <div className="flex flex-wrap justify-center mt-6">
          {qAndA.map((item) => (
            <div
              className="w-1/3 h-32 max-lg:h-24 max-md:h-20 max-sm:h-16 max-lg:w-1/2 max-md:w-full p-2"
              key={item.id}
            >
              <div className="flex justify-center items-center cursor-pointer ease-in-out duration-150 text-center h-full w-full border-solid border-2 border-accent-900 bg-accent-500 rounded-md p-2 hover:bg-accent-900">
                <p className="text-primary-900 text-lg max-2xl:text-base max-md:text-sm max-sm:text-xs">
                  {item.question}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delimiter */}
      <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />

      {/* Modules block */}
      <div className="w-1/2 max-2xl:w-3/4 flex flex-col space-y-6 items-center justify-center my-6 max-sm:my-4">
        <h2 className="text-2xl max-xl:text-xl max-md:text-base text-primary-900">
          {modulesTitle}
        </h2>
        {modulesInfo.map((item) => (
          <div
            className="bg-no-repeat bg-center bg-cover rounded-md"
            style={{ backgroundImage: `url(${item.image})` }}
            key={item.id}
          >
            <div
              className={`bg-accent-900 hover:bg-secondary-300 hover:bg-opacity-50 ease-in-out duration-300 text-center bg-opacity-70 flex flex-col justify-between rounded-md p-8`}
            >
              <div>
                <h2 className="text-xl max-xl:text-base font-semibold">
                  {item.title}
                </h2>
                <p className="text-base max-md:text-sm max-sm:text-xs px-4 my-6 font-semibold">
                  {item.description}
                </p>
              </div>
              <div className="flex justify-evenly">
                <Link
                  to={item.link}
                  className="bg-primary-900 text-background-color text-base max-md:text-sm max-sm:text-xs px-4 py-2 rounded-md hover:bg-primary-500 transition-all duration-200 ease-out"
                >
                  Try It!
                </Link>
              </div>
            </div>
            <div
              className="bg-no-repeat bg-center bg-cover rounded-md"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
          </div>
        ))}
      </div>

      {isLogin ? (
        isSurvey ? (
          <>
            {" "}
            {/* Delimiter */}
            <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />
            {/* Survey Block */}
            <div
              className="bg-no-repeat bg-center bg-cover w-1/2 max-xl:w-3/4 rounded-md my-6 max-sm:my-4"
              style={{ backgroundImage: `url(${surveyImage})` }}
            >
              <div className="bg-secondary-300 text-center bg-opacity-50 flex flex-col justify-between rounded-md p-8">
                <div>
                  <h2 className="text-xl max-xl:text-base font-semibold">
                    {surveyTitle}
                  </h2>
                  <p className="text-base max-md:text-sm max-sm:text-xs px-4 my-6 font-semibold">
                    {surveyDescription}
                  </p>
                </div>
                <div className="flex justify-center">
                  <Link
                    to="/login"
                    className="bg-primary-900 text-background-color text-xl px-4 py-2 rounded-md hover:bg-primary-700 transition-all duration-200 ease-out"
                  >
                    Fill Survey
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )
      ) : (
        <>
          {/* Delimiter */}
          <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />

          {/* SingIn / SignUp Block */}
          <div
            className="bg-no-repeat bg-center bg-cover w-1/2 max-xl:w-3/4 rounded-md my-6 max-sm:my-4"
            style={{ backgroundImage: `url(${signInImage})` }}
          >
            <div className="bg-accent-900 text-center bg-opacity-80 flex flex-col justify-between rounded-md p-8">
              <div>
                <h2 className="text-xl max-xl:text-base font-semibold">
                  {signInTitle}
                </h2>
                <p className="text-base max-md:text-sm max-sm:text-xs px-4 my-6 font-semibold">
                  {signInDescription}
                </p>
              </div>
              <div className="flex justify-evenly">
                <Link
                  to="/login"
                  className="bg-secondary-300 text-primary-900 text-base max-md:text-sm max-sm:text-xs px-4 py-2 rounded-md hover:bg-secondary-500  hover:text-text-color transition-all duration-200 ease-out"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-900 text-base max-md:text-sm max-sm:text-xs px-4 py-2 text-background-color rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
