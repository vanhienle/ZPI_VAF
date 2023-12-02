import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  SIGN_IN_CONSTANT,
  SIGN_UP_CONSTANT,
} from "../../constants/mainConstants";
import {
  INTRODUCTION_TEXT,
  ASSISTANT_DESCRIPTION,
  QUESTIONS,
  MODULES,
  SIGN_IN_DESCRIPTION,
  SURVEY_DESCRIPTION,
} from "../../constants/homeConstants";

import assistantImage from "../../assets/images/assistant.webp";
import signInImage from "../../assets/images/signin.jpg";
import surveyImage from "../../assets/images/survey.jpg";

const Home = ({ isLogin, isSurvey }) => {
  let navigate = useNavigate();
  const [question, setQuestion] = useState("");

  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const askAssistant = (q) => {
    navigate("/assistant", { state: q });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      {/* Info about Application  Block */}
      <div className="text-center w-1/2 max-xl:w-3/4 py-6 max-md:py-4 max-sm:py-2">
        <h1 className="text-primary-900 text-2xl max-xl:text-xl max-md:text-base font-semibold ease-in-out duration-300">
          Intelligent Assistant For Foreigners
        </h1>
        <p className="text-lg max-2xl:text-base max-md:text-sm max-sm:text-xs mt-6 font-semibold ease-in-out duration-300">
          {INTRODUCTION_TEXT}
        </p>
      </div>

      {/* Delimiter */}
      <div className="border-solid border-primary-900 bg-primary-900 border rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />

      {/* Assistant  Block */}
      <div
        className="bg-no-repeat bg-center bg-cover w-1/2 max-xl:w-3/4 rounded-md my-6 max-sm:my-4"
        style={{ backgroundImage: `url(${assistantImage})` }}
      >
        <div className="bg-primary-900 text-center bg-opacity-60 flex justify-between rounded-md p-14 w-full max-md:p-4 max-xl:flex-col max-xl:justify-center">
          <div className="w-1/2 max-xl:w-full">
            <h2 className="text-background-color text-xl max-xl:text-base font-semibold ease-in-out duration-300">
              Intelligent Assistant
            </h2>
            <p className="text-background-color p-2 mt-2 text-base max-md:text-sm max-sm:text-xs font-bold whitespace-pre-line ease-in-out duration-300">
              {ASSISTANT_DESCRIPTION}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2 max-xl:w-full p-6">
            <input
              className="border-box text-base max-md:text-sm max-sm:text-xs px-4 py-2 w-full max-xl:w-3/4 max-lg:w-4/5 max-md:w-full m-4 rounded-md focus:outline-none"
              placeholder="Ask a question..."
              value={question}
              onChange={handleChangeQuestion}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAssistant(question);
                }
              }}
            />
            <button
              onClick={() => askAssistant(question)}
              className="px-4 py-2 text-base max-md:text-sm max-sm:text-xs rounded-md border-none text-primary-900 bg-secondary-300 hover:bg-secondary-500 hover:text-text-color ease-in-out duration-150"
            >
              Ask me
            </button>
          </div>
        </div>
      </div>

      {/* Delimiter */}
      <div className="border-solid border-primary-900 bg-primary-900 border rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />

      {/* Questions and Answers */}
      <div className="w-1/2 max-xl:w-3/4 flex flex-col items-center justify-center my-6 max-sm:my-4">
        <h2 className="text-2xl max-xl:text-xl max-md:text-base text-primary-900">
          Example Questions for Assistant
        </h2>
        <div className="flex flex-wrap justify-center mt-6">
          {QUESTIONS.map((item) => (
            <button
              className="w-1/3 h-32 max-lg:h-24 max-md:h-20 max-sm:h-16 max-lg:w-1/2 max-md:w-full p-2"
              key={item.id}
              onClick={() => askAssistant(item.question)}
            >
              <div className="flex justify-center items-center cursor-pointer ease-in-out duration-150 text-center h-full w-full border-solid border border-accent-900 shadow-lg rounded-md p-2 hover:bg-accent-500">
                <p className="text-primary-900 text-lg max-2xl:text-base max-md:text-sm max-sm:text-xs">
                  {item.question}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Delimiter */}
      <div className="border-solid border-primary-900 bg-primary-900 border rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />

      {/* Modules block */}
      <div className="w-1/2 max-xl:w-3/4 flex flex-col space-y-10 items-center justify-center my-6 max-sm:my-4">
        {MODULES.map((item) => (
          <div
            className="bg-no-repeat bg-center bg-cover rounded-md cursor-pointer hover:scale-105 ease-in-out duration-200"
            style={{ backgroundImage: `url(${item.image})` }}
            onClick={() => {
              window.location.href = item.link;
            }}
            key={item.id}
          >
            <div
              className={`bg-accent-900 hover:bg-secondary-300 hover:bg-opacity-70 ease-in-out duration-300 text-center bg-opacity-70 flex flex-col justify-between rounded-md p-8`}
            >
              <div>
                <h2 className="text-xl max-xl:text-base font-semibold">
                  {item.title}
                </h2>
                <p className="text-base max-md:text-sm max-sm:text-xs px-4 my-6 font-bold">
                  {item.description}
                </p>
              </div>
            </div>
            <div
              className="bg-no-repeat bg-center bg-cover rounded-md"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
          </div>
        ))}
      </div>

      {/* Additional Block for Not-Logged Users */}
      {isLogin ? (
        isSurvey ? (
          <></>
        ) : (
          <>
            {/* Delimiter */}
            <div className="border-solid border-primary-900 bg-primary-900 border rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />

            {/* Survey Block */}
            <div
              className="bg-no-repeat bg-center bg-cover w-1/2 max-xl:w-3/4 rounded-md my-6 max-sm:my-4"
              style={{ backgroundImage: `url(${surveyImage})` }}
            >
              <div className="bg-accent-900 text-center bg-opacity-50 flex flex-col justify-between rounded-md p-8">
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
                    href="/survey"
                    className="bg-primary-900 text-background-color text-xl px-4 py-2 rounded-md hover:bg-primary-700 transition-all duration-200 ease-out"
                  >
                    Fill Survey
                  </a>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <>
          {/* Delimiter */}
          <div className="border-solid border-primary-900 bg-primary-900 border rounded-md w-1/2 max-xl:w-3/4 my-6 max-sm:my-4" />

          {/* SingIn | SignUp */}
          <div
            className="bg-no-repeat bg-center bg-cover w-1/2 max-xl:w-3/4 rounded-md my-6 max-sm:my-4"
            style={{ backgroundImage: `url(${signInImage})` }}
          >
            <div className="bg-accent-900 text-center bg-opacity-70 flex flex-col justify-between rounded-md p-8">
              <div>
                <h2 className="text-xl max-xl:text-base font-semibold">
                  Join Us
                </h2>
                <p className="text-base max-md:text-sm max-sm:text-xs px-4 my-6 font-semibold">
                  {SIGN_IN_DESCRIPTION}
                </p>
              </div>
              <div className="flex justify-evenly">
                <Link
                  to="/login"
                  className="bg-secondary-300 text-primary-900 text-base max-md:text-sm max-sm:text-xs px-4 py-2 rounded-md hover:bg-secondary-500  hover:text-text-color transition-all duration-200 ease-out"
                >
                  {SIGN_IN_CONSTANT}
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-primary-900 text-base max-md:text-sm max-sm:text-xs px-4 py-2 text-background-color rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out"
                >
                  {SIGN_UP_CONSTANT}
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
