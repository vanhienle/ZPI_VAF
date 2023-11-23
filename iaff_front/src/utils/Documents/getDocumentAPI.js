export const getDocument = async (documentId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/documents/get_document`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include if your API requires credentials
        body: JSON.stringify({
          documentId: documentId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch document");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching document:", error.message);
    throw error;
  }
};
