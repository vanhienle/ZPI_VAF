export async function getSuggestedQuestions(messages) {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "documents/get_recommendations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return data.results.map((res) => res.title);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    //throw error;
  }
}
