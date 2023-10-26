export const isFilledSurvey = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "surveys/is_filled_survey",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed checking is the User filled survey!");
    }
  } catch (error) {
    throw error;
  }
};
