import React, { useState } from "react";

import { sendSurvey } from "../../utils/Survey/sendSurveyAPI";

import { ERROR_SURVEY_MESSAGE } from "../../constants/validationErrorsConstants";
import { SURVEY_FAILED } from "../../constants/alertMessagesConstants";
import {
  WELCOME_SURVEY_MESSAGE,
  DOCUMENTS_LIST,
  KIDS_QUESTION,
  HOW_OLD_KIDS_QUESTION,
  ACCOMMODATION_QUESTION,
  INSURANCE_QUESTION,
  TARGET_QUESTION,
  TARGETS_LIST,
} from "../../constants/surveyConstants";

function SurveyForm() {
  const [step, setStep] = useState(1);
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

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (formData.age === "") {
    }
    if (formData.documents === "") {
      setError(true);
      handleBack();
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
      const result = await sendSurvey(surveyData);
      if (result) {
        window.location.href = "/";
      } else {
        alert(SURVEY_FAILED);
      }
    } catch (error) {
      console.error("Error with saving survey:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-fit pt-6 px-6">
      <div className="max-w-lg mx-auto bg-background-color rounded-md shadow-lg border-accent-900 border px-16 max-md:px-6 py-10">
        {/* Welcome Block */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-primary-900 text-2xl max-xl:text-xl max-lg:text-lg font-semibold mb-4">
              Recommendation Survey
            </h2>
            <div className="border-solid border-primary-900 bg-primary-900 border rounded-md w-full my-4" />
            <p className="my-4 text-lg max-lg:text-base max-md:text-sm p-3">
              {WELCOME_SURVEY_MESSAGE}
            </p>

            {/* Footer */}
            <div className="flex justify-between">
              <a
                href="/"
                className="text-lg max-md:text-base text-primary-500 hover:text-primary-900 ease-in-out duration-150 py-2 px-4"
              >
                Fill Later
              </a>
              <button
                className="rounded-md bg-primary-900 py-2 px-4 text-lg max-md:text-base text-background-color hover:bg-primary-700 ease-in-out duration-150"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* About Me Block */}
        {step === 2 && (
          <div>
            <div className="text-center">
              <h2 className="text-primary-900 text-2xl max-xl:text-xl max-lg:text-lg font-semibold mb-4">
                Survey : About Me
              </h2>
              <div className="border-solid border-primary-900 bg-primary-900 border rounded-md w-full my-4" />
            </div>

            {/* Main Error Message */}
            <div className="flex flex-col text-lg max-lg:text-base max-md:text-sm gap-2">
              {error ? (
                <p className="text-center text-error-900">
                  {ERROR_SURVEY_MESSAGE}
                </p>
              ) : (
                <></>
              )}

              {/* Age and Document Block */}
              <div className="flex justify-between w-full">
                {/* Age Input */}
                <div className="flex flex-col gap-2">
                  <label>
                    Your Age:
                    <span className="text-error-900">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className=" border-accent-900 text-text-color border rounded-lg w-3/4 py-2 px-4 leading-tight focus:outline-none focus:border-primary-900"
                  />
                </div>

                {/* Document Select List */}
                <div className="flex flex-col gap-2">
                  <label>
                    Your Document:
                    <span className="text-error-900">*</span>
                  </label>
                  <select
                    name="documents"
                    value={formData.documents}
                    onChange={handleChange}
                    className="bg-background-color border-accent-900 text-text-color border rounded-lg w-full py-2 px-4 leading-tight focus:outline-none focus:border-primary-900"
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
              <label>
                {KIDS_QUESTION}
                <span className="text-error-900">*</span>
              </label>

              {/* Kids Yes Radio */}
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
                  <p>Yes</p>
                </div>

                {/* Kids No Radio */}
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="hasKids"
                    value="false"
                    onChange={handleChange}
                    className="form-radio w-6 h-6"
                    checked={formData.hasKids === false}
                  />
                  <p>No</p>
                </div>
              </div>

              {/* How Old Kids Block */}
              {formData.hasKids ? (
                <>
                  <label>{HOW_OLD_KIDS_QUESTION}</label>

                  {/* Baby Radio */}
                  <div className="flex justify-between w-3/4 items-center">
                    <input
                      type="checkbox"
                      name="hasBaby"
                      onChange={handleChange}
                      className="w-6 h-6"
                      checked={formData.hasBaby}
                    />
                    <p>&lt; 7 &lt;</p>

                    {/* Teen Radio */}
                    <input
                      type="checkbox"
                      name="hasTeen"
                      onChange={handleChange}
                      className="w-6 h-6"
                      checked={formData.hasTeen}
                    />
                    <p>&lt; 18 &lt;</p>

                    {/* Adult Radio */}
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

              {/* Accommodation Block */}
              <label>
                {ACCOMMODATION_QUESTION}
                <span className="text-error-900">*</span>
              </label>

              <div className="flex justify-between w-1/2">
                {/* Accommodation Yes Radio */}
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="hasAccommodation"
                    value="true"
                    onChange={handleChange}
                    className="form-radio w-6 h-6"
                    checked={formData.hasAccommodation === true}
                  />
                  <p>Yes</p>
                </div>

                {/* Accommodation No Radio */}
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="hasAccommodation"
                    value="false"
                    onChange={handleChange}
                    className="form-radio w-6 h-6"
                    checked={formData.hasAccommodation === false}
                  />
                  <p>No</p>
                </div>
              </div>

              {/* Insurance Block */}
              <label>
                {INSURANCE_QUESTION}
                <span className="text-error-900">*</span>
              </label>
              <div className="flex justify-between w-1/2">
                {/* Insurance Yes Radio */}
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="needsInsurance"
                    value="true"
                    onChange={handleChange}
                    className="form-radio w-6 h-6"
                    checked={formData.needsInsurance === true}
                  />
                  <p>Yes</p>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Insurance No Radio */}
                  <input
                    type="radio"
                    name="needsInsurance"
                    value="false"
                    onChange={handleChange}
                    className="form-radio w-6 h-6"
                    checked={formData.needsInsurance === false}
                  />
                  <p>No</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between mt-4">
                <button
                  className="rounded-md bg-accent-900 py-2 px-4 text-lg max-md:text-base text-primary-900 hover:bg-accent-500 ease-in-out duration-150"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  className="rounded-md bg-primary-900 py-2 px-4 text-lg max-md:text-base text-background-color hover:bg-primary-700 ease-in-out duration-150"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Targets Block */}
        {step === 3 && (
          <div>
            <div className="text-center">
              <h2 className="text-primary-900 text-2xl max-xl:text-xl max-lg:text-lg font-semibold mb-4">
                Survey : Your Targets
              </h2>
              <div className="border-solid border-primary-900 bg-primary-900 border rounded-md w-full my-4" />
            </div>
            <div className="flex flex-col text-lg gap-2 pt-6 px-6">
              <label className="mb-6 max-md:text-sm">{TARGET_QUESTION}</label>

              {/* Targets Checkboxes */}
              {TARGETS_LIST.map((item) => (
                <div
                  className="flex justify-between w-1/2 items-center max-md:text-sm"
                  key={item.id}
                >
                  <p>{item.title}:</p>
                  <input
                    type="checkbox"
                    name={item.value}
                    onChange={handleChange}
                    checked={formData[item.value]}
                    className="w-6 h-6"
                  />
                </div>
              ))}

              {/* Footer */}
              <div className="flex justify-between w-full mt-16">
                <button
                  className="rounded-md bg-accent-900 py-2 px-4 text-lg text-primary-900 hover:bg-accent-500 ease-in-out duration-150"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary-900 py-2 px-4 text-lg text-background-color hover:bg-primary-700 ease-in-out duration-150"
                  onClick={handleSubmit}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SurveyForm;
