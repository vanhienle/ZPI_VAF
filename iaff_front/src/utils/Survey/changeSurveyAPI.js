export const changeSurvey = async (data) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/signup",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      const dataFromRequest = response.json();
      return dataFromRequest;
    } else {
      throw new Error("Failed changing survey!");
    }
  } catch (error) {
    throw error;
  }
};
