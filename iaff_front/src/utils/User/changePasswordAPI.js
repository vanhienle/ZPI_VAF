export async function changePassword(email, password, newPassword) {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/change_password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email, password, newpassword: newPassword }),
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
