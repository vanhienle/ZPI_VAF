export const changePassword = async (email, password, newpassword) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/change_password",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email, password, newpassword }),
      }
    );
    if (response.ok) {
      //const data = await response.json();
      return false;
    } else {
      throw new Error("Failed to change user password!");
    }
  } catch (error) {
    return false;
  }
};
