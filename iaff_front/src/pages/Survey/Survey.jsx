import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendSurvey } from "../../utils/Survey/sendSurveyAPI";

import {
  WELCOME_DESCRIPTION,
  SURVEY_TITLE,
  SURVEY_ABOUT_ME_TITLE,
  SURVEY_YOUR_AGE,
  SURVEY_DOCUMENTS,
  SURVEY_VARIANTS_OF_DOCUMENTS,
  SURVEY_EU_CITIZEN,
  SURVEY_KIDS,
  SURVEY_HOW_OLD_KIDS,
  SURVEY_KIDS_AGE_MIN,
  SURVEY_KIDS_AGE_MAX,
  SURVEY_TARGET,
  SURVEY_TARGET_QUESTION,
  TARGETS,
  ERROR_SURVEY,
  CONFIRM,
  BACK,
  NEXT,
  FILL_LATER,
  YES,
  NO,
  SURVEY_ACCOMMODATION,
  SURVEY_INSURANCE,
} from "../../constants/survey";

function SurveyForm() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
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
    if (formData.age === "" || formData.documents === "") {
      console.log("Please fill in all required fields.");
      setError(true);
      handleBack();
      return;
    }

    const surveyData = {
      age: formData.age,
      kids: formData.hasKids,
      baby: formData.hasBaby,
      teen: formData.hasTeen,
      adult: formData.hasAdult,
      accom: formData.hasAccommodation,
      insure: formData.needsInsurance,
      study: formData.isTargetStudy,
      job: formData.isTargetJob,
      live: formData.isTargetLive,
      refugee: formData.isTargetRefugee,
      other: formData.isTargetOther,
      documenttype: formData.documents,
    };

    try {
      const result = await sendSurvey(surveyData);
      if (result) {
        console.log("Survey addition successful");
        window.location.href = "/";
      } else {
        console.log("Survey addition failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-1/2">
      <div className="max-w-md mx-auto bg-background-color rounded-md shadow border-accent-900 border-solid border-2 m-16 p-6">
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-primary-900 text-2xl font-semibold mb-4">
              {SURVEY_TITLE}
            </h2>
            <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-full my-4" />
            <p className="my-4 text-lg">{WELCOME_DESCRIPTION}</p>
            <div className="flex justify-around">
              <a
                href="/"
                className="text-lg text-primary-500 hover:text-primary-900 ease-in-out duration-150 py-2 px-4"
              >
                {FILL_LATER}
              </a>
              <button
                className="rounded-md bg-primary-900 py-2 px-4 text-lg text-background-color hover:bg-primary-700 ease-in-out duration-150"
                onClick={handleNext}
              >
                {NEXT}
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="text-center">
              <h2 className="text-primary-900 text-2xl font-semibold mb-4">
                {SURVEY_ABOUT_ME_TITLE}
              </h2>
              <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-full my-4" />
            </div>
            <div className="flex flex-col text-lg gap-2">
              {error ? (
                <p className="text-center text-error-900">{ERROR_SURVEY}</p>
              ) : (
                <></>
              )}
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <label>
                    {SURVEY_YOUR_AGE}
                    <span className="text-error-900">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="border-accent-900 text-text-color border-2 rounded-lg w-3/4 py-2 px-4 leading-tight focus:outline-none focus:border-primary-900"
                  />
                </div>
                <div className="flex flex-col">
                  <label>
                    {SURVEY_DOCUMENTS}
                    <span className="text-error-900">*</span>
                  </label>
                  <select
                    name="documents"
                    value={formData.documents}
                    onChange={handleChange}
                    className="bg-background-color border-accent-900 text-text-color border-2 rounded-lg w-full py-2 px-4 leading-tight focus:outline-none focus:border-primary-900"
                  >
                    {SURVEY_VARIANTS_OF_DOCUMENTS.map((item) => (
                      <option value={item.value} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label>
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
                  <p>{YES}</p>
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
                  <p>{NO}</p>
                </div>
              </div>
              {formData.hasKids ? (
                <>
                  <label>{SURVEY_HOW_OLD_KIDS}</label>
                  <div className="flex justify-between w-3/4 items-center">
                    <input
                      type="checkbox"
                      name="hasBaby"
                      onChange={handleChange}
                      className="w-6 h-6"
                      checked={formData.hasBaby}
                    />
                    <p>&lt; {SURVEY_KIDS_AGE_MIN} &lt;</p>
                    <input
                      type="checkbox"
                      name="hasTeen"
                      onChange={handleChange}
                      className="w-6 h-6"
                      checked={formData.hasTeen}
                    />
                    <p>&lt; {SURVEY_KIDS_AGE_MAX} &lt;</p>
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

              <label>
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
                  <p>{YES}</p>
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
                  <p>{NO}</p>
                </div>
              </div>
              <label>
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
                  <p>{YES}</p>
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
                  <p>{NO}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="rounded-md bg-accent-900 py-2 px-4 text-lg text-primary-900 hover:bg-accent-500 ease-in-out duration-150"
                  onClick={handleBack}
                >
                  {BACK}
                </button>
                <button
                  className="rounded-md bg-primary-900 py-2 px-4 text-lg text-background-color hover:bg-primary-700 ease-in-out duration-150"
                  onClick={handleNext}
                >
                  {NEXT}
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="text-center">
              <h2 className="text-primary-900 text-2xl font-semibold mb-4">
                {SURVEY_TARGET}
              </h2>
              <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-full my-4" />
            </div>
            <div className="flex flex-col text-lg gap-2">
              <label>{SURVEY_TARGET_QUESTION}</label>
              {TARGETS.map((item) => (
                <div
                  className="flex justify-between w-1/2 items-center"
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
              <div className="flex justify-between mt-4">
                <button
                  className="rounded-md bg-accent-900 py-2 px-4 text-lg text-primary-900 hover:bg-accent-500 ease-in-out duration-150"
                  onClick={handleBack}
                >
                  {BACK}
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary-900 py-2 px-4 text-lg text-background-color hover:bg-primary-700 ease-in-out duration-150"
                  onClick={handleSubmit}
                >
                  {CONFIRM}
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
