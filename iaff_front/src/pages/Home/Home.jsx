import React from "react";
import { Link } from "react-router-dom";

import {
  appTitle,
  appDescription,
  assistantTitle,
  assistantDescription,
  qAndATitle,
  qAndA,
  modulesInfo,
  signInTitle,
  signInDescription,
} from "../../constants";

import assistantImage from "../../assets/images/assistant.jpg";
import signInImage from "../../assets/images/signin.jpg";

const Home = () => {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <div className="text-center w-1/2 p-6">
        <h3 className="text-primary-900 mb-0">{appTitle}</h3>
        <p className="mb-0 text-lg p-4">{appDescription}</p>
      </div>

      <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-1/2 mt-0 mb-6" />

      <div
        className="bg-no-repeat bg-center bg-cover w-1/2 rounded-md mt-0 mb-6"
        style={{ backgroundImage: `url(${assistantImage})` }}
      >
        <div className="bg-primary-900 text-center bg-opacity-80 flex justify-between rounded-md p-8">
          <div className="w-1/2">
            <h3 className="text-background-color">{assistantTitle}</h3>
            <p className="text-background-color p-4 text-lg">
              {assistantDescription}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2">
            <input className="p-1 w-100 m-4 rounded-md" />
            <Link
              to="/assistant"
              className="px-4 py-2 rounded-md border-none text-primary-900 bg-secondary-300 hover:bg-secondary-500 hover:text-text-color ease-in-out duration-150"
            >
              Ask me
            </Link>
          </div>
        </div>
      </div>

      <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-1/2 mt-0 mb-6" />

      <div
        className="bg-no-repeat bg-center bg-cover w-1/2 rounded-md mt-0 mb-6"
        style={{ backgroundImage: `url(${signInImage})` }}
      >
        <div className="bg-accent-900 text-center bg-opacity-80 flex flex-col justify-between rounded-md p-8">
          <div>
            <h2 className="">{signInTitle}</h2>
            <p className="text-lg p-4">{signInDescription}</p>
          </div>
          <div className="flex justify-evenly">
            <Link
              to="/login"
              className="bg-secondary-300 text-primary-900 text-md px-4 py-2 rounded-md hover:bg-secondary-500  hover:text-text-color transition-all duration-200 ease-out"
            >
              Sign In
            </Link>
            <Link
              to="/registration"
              className="bg-primary-900 text-md px-4 py-2 text-background-color rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
