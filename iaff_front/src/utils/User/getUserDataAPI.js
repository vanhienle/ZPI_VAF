export const getUserData = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/get_user_data",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed getting the user data!");
    }
  } catch (error) {
    throw error;
  }
};
