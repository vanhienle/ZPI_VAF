export const getCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}documents/get_categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include if your API requires credentials
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};
