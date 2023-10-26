export const logout = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/logout",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      localStorage.removeItem("token");
      return true;
    } else {
      throw new Error("Logout failed!");
    }
  } catch (error) {
    return false;
  }
};
