export const getRecommendations = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}documents/get_recommendations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
        credentials: "include", // Include if your API requires credentials
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    throw error;
  }
};
