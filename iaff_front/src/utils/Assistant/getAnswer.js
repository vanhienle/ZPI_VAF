export async function getAnswer(messages) {
  try {
    const response = await fetch(
      "http://iaff.westeurope.cloudapp.azure.com:8085/assistant_service/get_response",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          conversation: messages,
          language: localStorage.getItem("lang"),
        }),
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 401) {
      const error = await response.json();
      throw new Error(error.Error);
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    //throw error;
  }
}
