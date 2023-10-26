export const changeProfile = async (
  name,
  current_email,
  new_email,
  password
) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/change_account",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        body: JSON.stringify({ name, current_email, new_email, password }),
      }
    );
    if (response.ok) {
      //const data = response.json();
      return true;
    } else {
      throw new Error("Failed to change user data!");
    }
  } catch (error) {
    return false;
  }
};
