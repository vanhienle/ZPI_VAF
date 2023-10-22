import React, { useState } from "react";
import { welcomeDescription, targets } from "../../constants/survey";
import { sendSurveyAPI } from "../../utils/Survey/sendSurveyAPI";

function SurveyForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    documents: "",
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

    if (type === "checkbox" || type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
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
    const surveyData = {
      age: formData.age,
      kids: `${formData.hasKids}`,
      baby: `${formData.hasBaby}`,
      teen: `${formData.hasTeen}`,
      adult: `${formData.hasAdult}`,
      accom: `${formData.hasAccommodation}`,
      insure: `${formData.needsInsurance}`,
      study: `${formData.isTargetStudy}`,
      job: `${formData.isTargetJob}`,
      live: `${formData.isTargetLive}`,
      refugee: `${formData.isTargetRefugee}`,
      other: `${formData.isTargetOther}`,
      documenttype: formData.documents,
    };

    console.log(surveyData);

    try {
      const response = await sendSurveyAPI(surveyData);
      console.log(response);
      console.log("SUCCESS");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-1/2">
      <div className="max-w-md mx-auto bg-background-color rounded-md shadow border-accent-900 border-solid border-2 m-16 p-6">
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-primary-900 text-2xl font-semibold mb-4">
              Survey
            </h2>
            <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-full my-4" />
            <p className="my-4 text-lg">{welcomeDescription}</p>
            <div className="flex justify-around">
              <a
                href="/"
                className="text-lg text-primary-500 hover:text-primary-900 ease-in-out duration-150 py-2 px-4"
              >
                Fill later
              </a>
              <button
                className="rounded-md bg-primary-900 py-2 px-4 text-lg text-background-color hover:bg-primary-700 ease-in-out duration-150"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="text-center">
              <h2 className="text-primary-900 text-2xl font-semibold mb-4">
                Survey : About Me
              </h2>
              <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-full my-4" />
            </div>
            <div className="flex flex-col text-lg gap-2">
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <label>Your age:</label>
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
                    Documents:<span className="text-error-900">*</span>
                  </label>
                  <select
                    name="documents"
                    value={formData.documents}
                    onChange={handleChange}
                    className="bg-background-color border-accent-900 text-text-color border-2 rounded-lg w-full py-2 px-4 leading-tight focus:outline-none focus:border-primary-900"
                  >
                    <option value="VISA">VISA</option>
                    <option value="Polish Card">Polish Card</option>
                    <option value="Stale Live Polish Card">
                      Stale Live Polish Card
                    </option>
                  </select>
                </div>
              </div>
              <label>Do you have kids?</label>
              <div className="flex justify-between w-1/2">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="hasKids"
                    value={true}
                    onChange={handleChange}
                    className="form-radio w-6 h-6"
                    checked={formData.hasKids}
                  />
                  <p>Yes</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="hasKids"
                    value={false}
                    onChange={handleChange}
                    className="form-radio w-6 h-6"
                    checked={formData.hasKids}
                  />
                  <p>No</p>
                </div>
              </div>
              <label>If you have kids, how old are they?</label>
              <div className="flex justify-between w-3/4 items-center">
                <input
                  type="checkbox"
                  name="hasBaby"
                  onChange={handleChange}
                  className="w-6 h-6"
                  checked={formData.hasBaby}
                />
                <p>&lt; 7 &lt;</p>
                <input
                  type="checkbox"
                  name="hasTeen"
                  onChange={handleChange}
                  className="w-6 h-6"
                  checked={formData.hasTeen}
                />
                <p>&lt; 18 &lt;</p>
                <input
                  type="checkbox"
                  name="hasAdult"
                  onChange={handleChange}
                  className="w-6 h-6"
                  checked={formData.hasAdult}
                />
              </div>
              <label>Do you have an accommodation in Poland?</label>
              <div className="flex justify-between w-1/2">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="hasAccommodation"
                    value={true}
                    onChange={handleChange}
                    className="form-radio w-6 h-6"
                    checked={formData.hasAccommodation}
                  />
                  <p>Yes</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="hasAccommodation"
                    value={false}
                    onChange={handleChange}
                    className="form-radio w-6 h-6"
                    checked={formData.hasAccommodation}
                  />
                  <p>No</p>
                </div>
              </div>
              <label>Do you need insurance in Poland?</label>
              <div className="flex justify-between w-1/2">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="needsInsurance"
                    value={true}
                    onChange={handleChange}
                    className="form-radio w-6 h-6"
                    checked={formData.needsInsurance}
                  />
                  <p>Yes</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="needsInsurance"
                    value={false}
                    onChange={handleChange}
                    className="form-radio w-6 h-6"
                    checked={formData.needsInsurance}
                  />
                  <p>No</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="rounded-md bg-accent-900 py-2 px-4 text-lg text-primary-900 hover:bg-accent-500 ease-in-out duration-150"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  className="rounded-md bg-primary-900 py-2 px-4 text-lg text-background-color hover:bg-primary-700 ease-in-out duration-150"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="text-center">
              <h2 className="text-primary-900 text-2xl font-semibold mb-4">
                Survey : Target
              </h2>
              <div className="border-solid border-primary-900 bg-primary-900 border-2 rounded-md w-full my-4" />
            </div>
            <div className="flex flex-col text-lg gap-2">
              <label>Please mark your targets to visit Poland:</label>
              {targets.map((item) => (
                <div
                  className="flex justify-between w-1/2 items-center"
                  key={item.id}
                >
                  <p>{item.title}:</p>
                  <input
                    type="checkbox"
                    name={item.value}
                    value="Study"
                    onChange={handleChange}
                    className="w-6 h-6"
                    checked={formData[item.value]}
                  />
                </div>
              ))}
              <div className="flex justify-between mt-4">
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
