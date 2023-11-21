export async function getUserData() {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/get_user_data",
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
      return data;
    } else if (response.status === 401) {
      const error = await response.json();
      throw new Error(error.Error);
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    throw error;
  }
}
