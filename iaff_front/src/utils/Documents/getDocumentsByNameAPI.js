export const getDocumentsByName = async (name) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}documents/get_by_name`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include if your API requires credentials
        body: JSON.stringify({
          name: name,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch documents by name");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching documents by name:", error.message);
    throw error;
  }
};
