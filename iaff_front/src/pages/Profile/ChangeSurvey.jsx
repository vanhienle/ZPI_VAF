import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { changeSurvey } from "../../utils/Survey/changeSurveyAPI.js";
import { getSurveyData } from "../../utils/Survey/getSurveyDataAPI.js";

import Loading from "../../components/Spinner/Loading";

import { ERROR_SURVEY_MESSAGE } from "../../constants/validationErrorsConstants.js";
import { COPYRIGHT } from "../../constants/mainConstants.js";
import {
  CHANGE_SURVEY_FAILED,
  CHANGE_SURVEY_SUCCESSFUL,
} from "../../constants/alertMessagesConstants.js";
import {
  DOCUMENTS_LIST,
  KIDS_QUESTION,
  HOW_OLD_KIDS_QUESTION,
  ACCOMMODATION_QUESTION,
  INSURANCE_QUESTION,
  TARGET_QUESTION,
  CHANGE_TARGETS_LIST,
} from "../../constants/surveyConstants";

const ChangeSurvey = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    age: 18,
    kids: false,
    baby: false,
    teen: false,
    adult: false,
    accom: false,
    insure: false,
    study: false,
    job: false,
    live: false,
    refugee: false,
    other: false,
    documenttype: "None",
  });

  const getSurveyFromAPI = (result) => {
    const surveyData = {
      age: result.age,
      kids: result.kids === "1",
      baby: result.baby === "1",
      teen: result.teen === "1",
      adult: result.adult === "1",
      accom: result.accom === "1",
      insure: result.insure === "1",
      study: result.study === "1",
      job: result.job === "1",
      live: result.live === "1",
      refugee: result.refugee === "1",
      other: result.other === "1",
      documenttype: result.documenttype,
    };

    return surveyData;
  };

  useEffect(() => {
    setTimeout(() => {
      getSurveyData().then((result) => {
        const data = getSurveyFromAPI(result);
        setFormData(data);
        setIsLoading(false);
      });
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === "true",
      }));
    } else if (type === "number") {
      const cleanedValue = value.replace(/\D/g, "");
      console.log(cleanedValue);
      setFormData({ ...formData, [name]: cleanedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const getChangedSurveyDataForSending = () => {
    const surveyData = {
      age: formData.age,
      kids: formData.kids ? "1" : "0",
      baby: formData.baby ? "1" : "0",
      teen: formData.teen ? "1" : "0",
      adult: formData.adult ? "1" : "0",
      accom: formData.accom ? "1" : "0",
      insure: formData.insure ? "1" : "0",
      study: formData.study ? "1" : "0",
      job: formData.job ? "1" : "0",
      live: formData.live ? "1" : "0",
      refugee: formData.refugee ? "1" : "0",
      other: formData.other ? "1" : "0",
      documenttype: formData.documenttype,
    };

    return surveyData;
  };

  const handleSubmit = async () => {
    if (formData.age === "" || formData.documenttype === "") {
      setError(true);
      return;
    } else {
      const surveyData = getChangedSurveyDataForSending();

      try {
        const result = await changeSurvey(surveyData);
        if (result) {
          alert(CHANGE_SURVEY_SUCCESSFUL);
          navigate(0);
        } else {
          alert(CHANGE_SURVEY_FAILED);
          navigate(0);
        }
      } catch (error) {
        console.error("Error with changing survey data:", error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6 mx-6 transition-all ease-in-out duration-300">
      <div className="flex flex-col border rounded-md border-accent-900 w-fit mt-6 transition-all ease-in-out duration-300">
        <div className="flex flex-col items-center justify-center transition-all ease-in-out duration-300">
          {/* Header for Change Survey */}
          <div className="flex items-center justify-between w-full px-6 pt-6 border-b mb-4">
            <p className="text-2xl text-primary-500 m-4 max-lg:text-lg">
              Survey Settings
            </p>
            <Link
              className="py-2 px-6 text-lg max-lg:text-base max-sm:text-xs font-bold bg-primary-900 hover:bg-primary-500 text-background-color rounded-md focus:outline-none focus:shadow-outline ease-in-out duration-200"
              to="/change-profile"
            >
              Profile &#8594;
            </Link>
          </div>

          {/* Main Error Message */}
          {error && (
            <p className="text-error-900 font-bold text-lg my-4">
              {ERROR_SURVEY_MESSAGE}
            </p>
          )}
          {isLoading ? (
            <div className="flex flex-col justify-center items-center w-96 max-md:w-40 max-sm:w-20 h-40 m-40">
              <Loading width={80} height={80} radius={12} widthContainer={96} />
            </div>
          ) : (
            <>
              <form className="w-fit flex-col ps-6 pe-6 pb-4 space-y-10">
                <div className="flex max-md:flex-col justify-between space-x-10 max-md:space-x-0 space-y-6">
                  {/* First Block of Survey */}
                  <div className="flex flex-col space-y-6">
                    {/* Age and Document Input */}
                    <div className="flex justify-between w-full">
                      {/* Age Input */}
                      <div className="flex flex-col space-y-4">
                        <label className="text-base max-md:text-sm max-sm:text-xs">
                          Your Age:
                          <span className="text-error-900">*</span>
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="text-base max-md:text-sm max-sm:text-xs border-accent-900 text-text-color border rounded-lg w-3/4 py-2 px-4 leading-tight focus:outline-none focus:border-primary-900"
                        />
                      </div>

                      {/* Document Select List */}
                      <div className="flex flex-col space-y-4">
                        <label className="text-base max-md:text-sm max-sm:text-xs">
                          Your Document:
                          <span className="text-error-900">*</span>
                        </label>
                        <select
                          name="documenttype"
                          value={formData.documenttype}
                          onChange={handleChange}
                          className="text-base max-md:text-sm max-sm:text-xs bg-background-color border-accent-900 text-text-color border rounded-lg w-full py-2 px-4 leading-tight focus:outline-none focus:border-primary-900"
                        >
                          {DOCUMENTS_LIST.map((item) => (
                            <option value={item.value} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Kids Block */}
                    <label className="text-base max-md:text-sm max-sm:text-xs">
                      {KIDS_QUESTION}
                      <span className="text-error-900">*</span>
                    </label>

                    {/* Kids Yes Radio */}
                    <div className="flex justify-between w-1/2">
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          name="kids"
                          value="true"
                          onChange={handleChange}
                          className="form-radio w-6 h-6"
                          checked={formData.kids === true}
                        />
                        <p className="text-base max-md:text-sm max-sm:text-xs">
                          Yes
                        </p>
                      </div>

                      {/* Kids No Radio */}
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          name="kids"
                          value="false"
                          onChange={handleChange}
                          className="form-radio w-6 h-6"
                          checked={formData.kids === false}
                        />
                        <p className="text-base max-md:text-sm max-sm:text-xs">
                          No
                        </p>
                      </div>
                    </div>

                    {/* How Old Kids Block */}
                    {formData.kids ? (
                      <>
                        <label className="text-base max-md:text-sm max-sm:text-xs">
                          {HOW_OLD_KIDS_QUESTION}
                        </label>

                        {/* Baby Kids Radio */}
                        <div className="flex justify-between w-3/4 items-center">
                          <input
                            type="checkbox"
                            name="baby"
                            onChange={handleChange}
                            className="w-6 h-6"
                            checked={formData.baby}
                          />
                          <p className="text-base max-md:text-sm max-sm:text-xs">
                            &lt; 7 &lt;
                          </p>

                          {/* Teen Kids Radio */}
                          <input
                            type="checkbox"
                            name="teen"
                            onChange={handleChange}
                            className="w-6 h-6"
                            checked={formData.teen}
                          />
                          <p className="text-base max-md:text-sm max-sm:text-xs">
                            &lt; 18 &lt;
                          </p>

                          {/* Adult Kids Radio */}
                          <input
                            type="checkbox"
                            name="adult"
                            onChange={handleChange}
                            className="w-6 h-6"
                            checked={formData.adult}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/*  Accommodation Block */}
                    <label className="text-base max-md:text-sm max-sm:text-xs">
                      {ACCOMMODATION_QUESTION}
                      <span className="text-error-900">*</span>
                    </label>

                    {/* Accommodation Yes Radio */}
                    <div className="flex justify-between w-1/2">
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          name="accom"
                          value="true"
                          onChange={handleChange}
                          className="form-radio w-6 h-6"
                          checked={formData.accom === true}
                        />
                        <p className="text-base max-md:text-sm max-sm:text-xs">
                          Yes
                        </p>
                      </div>

                      {/* Accommodation No Radio */}
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          name="accom"
                          value="false"
                          onChange={handleChange}
                          className="form-radio w-6 h-6"
                          checked={formData.accom === false}
                        />
                        <p className="text-base max-md:text-sm max-sm:text-xs">
                          No
                        </p>
                      </div>
                    </div>

                    {/* Insurance Block */}
                    <label className="text-base max-md:text-sm max-sm:text-xs">
                      {INSURANCE_QUESTION}
                      <span className="text-error-900">*</span>
                    </label>

                    {/* Insurance Yes Radio */}
                    <div className="flex justify-between w-1/2">
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          name="insure"
                          value="true"
                          onChange={handleChange}
                          className="form-radio w-6 h-6"
                          checked={formData.insure === true}
                        />
                        <p className="text-base max-md:text-sm max-sm:text-xs">
                          Yes
                        </p>
                      </div>

                      {/* Insurance No Radio */}
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          name="insure"
                          value="false"
                          onChange={handleChange}
                          className="form-radio w-6 h-6"
                          checked={formData.insure === false}
                        />
                        <p className="text-base max-md:text-sm max-sm:text-xs">
                          No
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Targets Block */}
                  <div className="flex flex-col items-start text-lg space-y-6">
                    <label className="text-base max-md:text-sm max-sm:text-xs">
                      {TARGET_QUESTION}
                    </label>

                    {/* Targets Checkboxes */}
                    {CHANGE_TARGETS_LIST.map((item) => (
                      <div
                        className="flex justify-between w-1/2 max-md:w-1/3 items-center"
                        key={item.id}
                      >
                        <p className="text-base max-md:text-sm max-sm:text-xs">
                          {item.title}:
                        </p>
                        <input
                          type="checkbox"
                          name={item.value}
                          onChange={handleChange}
                          checked={formData[item.value]}
                          className="w-6 h-6"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confirm Button */}
                <p
                  className="bg-primary-900 w-full py-3 px-4 mb-4 text-lg text-center max-md:text-base max-sm:text-sm hover:bg-primary-500 text-background-color font-bold rounded-lg focus:outline-none focus:shadow-outline ease-in-out duration-200 cursor-pointer"
                  onClick={handleSubmit}
                >
                  Update survey
                </p>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-accent-700 mb-4">{COPYRIGHT}</div>
      </div>
    </div>
  );
};

export default ChangeSurvey;
