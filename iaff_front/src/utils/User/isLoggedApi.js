export const getIsLogged = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/is_logged",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
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
