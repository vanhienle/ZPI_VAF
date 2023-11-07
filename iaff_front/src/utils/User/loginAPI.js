export async function login(email, password) {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
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
