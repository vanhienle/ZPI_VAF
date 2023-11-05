export async function isLogged() {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/is_logged",
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
      if (data === "true") {
        return true;
      } else {
        return false;
      }
    } else if (response.status === 401) {
      return false;
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    throw error;
  }
}
