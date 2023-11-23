export const getDocumentsByCategory = async (category) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/documents/get_by_category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include if your API requires credentials
        body: JSON.stringify({
          category: category,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch documents by category");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching documents by category:", error.message);
    throw error;
  }
};
