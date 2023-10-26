export const login = async (email, password) => {
  try {
    const response = await Promise.race([
      fetch(process.env.REACT_APP_BACK_END_URL + "users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Login request timed out after 3 seconds"));
        }, 5000);
      }),
    ]);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
