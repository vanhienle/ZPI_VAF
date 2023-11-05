export async function changeProfile(name, email, password) {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/change_account",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email, name, password }),
      }
    );

    if (response.status === 200) {
      return true;
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
