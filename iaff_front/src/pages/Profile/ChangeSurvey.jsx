import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeSurvey } from "../../utils/Survey/changeSurveyAPI.js";
import Loading from "../../components/Spinner/Loading";

import {
  SURVEY_YOUR_AGE,
  SURVEY_DOCUMENTS,
  SURVEY_VARIANTS_OF_DOCUMENTS,
  SURVEY_EU_CITIZEN,
  SURVEY_KIDS,
  SURVEY_HOW_OLD_KIDS,
  SURVEY_KIDS_AGE_MIN,
  SURVEY_KIDS_AGE_MAX,
  SURVEY_TARGET_QUESTION,
  TARGETS,
  ERROR_SURVEY,
  YES,
  NO,
  SURVEY_ACCOMMODATION,
  SURVEY_INSURANCE,
} from "../../constants/survey";

const ChangeSurvey = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    age: "",
    documents: "None",
    hasKids: false,
    hasBaby: false,
    hasTeen: false,
    hasAdult: false,
    hasAccommodation: false,
    needsInsurance: false,
    isTargetStudy: false,
    isTargetJob: false,
    isTargetOther: false,
    isTargetLive: false,
    isTargetRefugee: false,
  });

  useEffect(() => {
    setTimeout(() => {
      //   getUserData().then((result) => {
      //     setFormData({
      //       ...formData,
      //       name: result.name,
      //       email_address: result.email,
      //     });
      //     setIsLoading(false);
      //   });
      setIsLoading(false);
    }, 500);
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
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (formData.age === "" || formData.documents === "") {
      console.log("Please fill in all required fields.");
      setError(true);
      return;
    }

    const surveyData = {
      age: formData.age,
      kids: formData.hasKids ? "1" : "0",
      baby: formData.hasBaby ? "1" : "0",
      teen: formData.hasTeen ? "1" : "0",
      adult: formData.hasAdult ? "1" : "0",
      accom: formData.hasAccommodation ? "1" : "0",
      insure: formData.needsInsurance ? "1" : "0",
      study: formData.isTargetStudy ? "1" : "0",
      job: formData.isTargetJob ? "1" : "0",
      live: formData.isTargetLive ? "1" : "0",
      refugee: formData.isTargetRefugee ? "1" : "0",
      other: formData.isTargetOther ? "1" : "0",
      documenttype: formData.documents,
    };

    try {
      const result = await changeSurvey(surveyData);
      if (result) {
        console.log("Survey change successful");
        window.location.href = "/";
      } else {
        console.log("Survey change failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-6">
      <div className="flex flex-col border-2 rounded-md border-solid border-accent-900 w-fit mt-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full px-6 pt-6 border-b mb-4">
            <p className="text-2xl text-primary-500 m-4 max-lg:text-lg">
              Survey Settings
            </p>
            <a
              className="py-2 px-6 text-lg max-lg:text-base max-sm:text-xs font-bold bg-primary-900 hover:bg-primary-500 text-background-color rounded-md focus:outline-none focus:shadow-outline ease-in-out duration-200"
              href="/change-profile"
            >
              Profile &#8594;
            </a>
          </div>
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-96 m-3">
              <Loading width={80} height={80} radius={12} widthContainer={96} />
            </div>
          ) : (
            <form
              className="w-fit flex-col ps-6 pe-6 pb-4 space-y-10"
              onSubmit={handleSubmit}
            >
              <div className="flex max-md:flex-col justify-between space-x-10 max-md:space-x-0 space-y-6">
                <div className="flex flex-col space-y-6">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col space-y-4">
                      <label className="text-base max-md:text-sm max-sm:text-xs">
                        {SURVEY_YOUR_AGE}
                        <span className="text-error-900">*</span>
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="text-base max-md:text-sm max-sm:text-xs border-accent-900 text-text-color border-2 rounded-lg w-3/4 py-2 px-4 leading-tight focus:outline-none focus:border-primary-900"
                      />
                    </div>
                    <div className="flex flex-col space-y-4">
                      <label className="text-base max-md:text-sm max-sm:text-xs">
                        {SURVEY_DOCUMENTS}
                        <span className="text-error-900">*</span>
                      </label>
                      <select
                        name="documents"
                        value={formData.documents}
                        onChange={handleChange}
                        className="text-base max-md:text-sm max-sm:text-xs bg-background-color border-accent-900 text-text-color border-2 rounded-lg w-full py-2 px-4 leading-tight focus:outline-none focus:border-primary-900"
                      >
                        {SURVEY_VARIANTS_OF_DOCUMENTS.map((item) => (
                          <option value={item.value} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <label className="text-base max-md:text-sm max-sm:text-xs">
                    {SURVEY_KIDS}
                    <span className="text-error-900">*</span>
                  </label>
                  <div className="flex justify-between w-1/2">
                    <div className="flex items-center space-x-4">
                      <input
                        type="radio"
                        name="hasKids"
                        value="true"
                        onChange={handleChange}
                        className="form-radio w-6 h-6"
                        checked={formData.hasKids === true}
                      />
                      <p className="text-base max-md:text-sm max-sm:text-xs">
                        {YES}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="radio"
                        name="hasKids"
                        value="false"
                        onChange={handleChange}
                        className="form-radio w-6 h-6"
                        checked={formData.hasKids === false}
                      />
                      <p className="text-base max-md:text-sm max-sm:text-xs">
                        {NO}
                      </p>
                    </div>
                  </div>
                  {formData.hasKids ? (
                    <>
                      <label className="text-base max-md:text-sm max-sm:text-xs">
                        {SURVEY_HOW_OLD_KIDS}
                      </label>
                      <div className="flex justify-between w-3/4 items-center">
                        <input
                          type="checkbox"
                          name="hasBaby"
                          onChange={handleChange}
                          className="w-6 h-6"
                          checked={formData.hasBaby}
                        />
                        <p className="text-base max-md:text-sm max-sm:text-xs">
                          &lt; {SURVEY_KIDS_AGE_MIN} &lt;
                        </p>
                        <input
                          type="checkbox"
                          name="hasTeen"
                          onChange={handleChange}
                          className="w-6 h-6"
                          checked={formData.hasTeen}
                        />
                        <p className="text-base max-md:text-sm max-sm:text-xs">
                          &lt; {SURVEY_KIDS_AGE_MAX} &lt;
                        </p>
                        <input
                          type="checkbox"
                          name="hasAdult"
                          onChange={handleChange}
                          className="w-6 h-6"
                          checked={formData.hasAdult}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <label className="text-base max-md:text-sm max-sm:text-xs">
                    {SURVEY_ACCOMMODATION}
                    <span className="text-error-900">*</span>
                  </label>
                  <div className="flex justify-between w-1/2">
                    <div className="flex items-center space-x-4">
                      <input
                        type="radio"
                        name="hasAccommodation"
                        value="true"
                        onChange={handleChange}
                        className="form-radio w-6 h-6"
                        checked={formData.hasAccommodation === true}
                      />
                      <p className="text-base max-md:text-sm max-sm:text-xs">
                        {YES}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="radio"
                        name="hasAccommodation"
                        value="false"
                        onChange={handleChange}
                        className="form-radio w-6 h-6"
                        checked={formData.hasAccommodation === false}
                      />
                      <p className="text-base max-md:text-sm max-sm:text-xs">
                        {NO}
                      </p>
                    </div>
                  </div>
                  <label className="text-base max-md:text-sm max-sm:text-xs">
                    {SURVEY_INSURANCE}
                    <span className="text-error-900">*</span>
                  </label>
                  <div className="flex justify-between w-1/2">
                    <div className="flex items-center space-x-4">
                      <input
                        type="radio"
                        name="needsInsurance"
                        value="true"
                        onChange={handleChange}
                        className="form-radio w-6 h-6"
                        checked={formData.needsInsurance === true}
                      />
                      <p className="text-base max-md:text-sm max-sm:text-xs">
                        {YES}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="radio"
                        name="needsInsurance"
                        value="false"
                        onChange={handleChange}
                        className="form-radio w-6 h-6"
                        checked={formData.needsInsurance === false}
                      />
                      <p className="text-base max-md:text-sm max-sm:text-xs">
                        {NO}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start text-lg space-y-6">
                  <label className="text-base max-md:text-sm max-sm:text-xs">
                    {SURVEY_TARGET_QUESTION}
                  </label>
                  {TARGETS.map((item) => (
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
              <button
                className="bg-primary-900 w-full text-lg max-md:text-base max-sm:text-sm hover:bg-primary-500 text-background-color font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline mb-4 ease-in-out duration-200"
                type="submit"
              >
                Update survey
              </button>
            </form>
          )}
        </div>
        <div className="text-center text-accent-700 mb-4">
          Copyright @ Politechnika Wrocławska
        </div>
      </div>
    </div>
  );
};

export default ChangeSurvey;
