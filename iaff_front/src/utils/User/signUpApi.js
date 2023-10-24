export const signUp = async (data) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Sign-up failed");
    }
  } catch (error) {
    throw error;
  }
};
