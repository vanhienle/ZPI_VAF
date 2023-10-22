export const sendSurveyAPI = async (surveyData) => {
  try {
    const response = await fetch("http://91.195.53.69:5000/survey/add_survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surveyData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Network Error: ${error.message}`);
  }
};
