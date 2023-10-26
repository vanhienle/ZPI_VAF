export const signup = async (data) => {
  try {
    const response = await Promise.race([
      fetch(process.env.REACT_APP_BACK_END_URL + "users/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Sign up request timed out after 5 seconds"));
        }, 5000);
      }),
    ]);
    if (response.ok) {
      const dataFromRequest = response.json();
      localStorage.setItem("token", dataFromRequest.token);
      return dataFromRequest;
    } else {
      throw new Error("Sign-up failed!");
    }
  } catch (error) {
    throw error;
  }
};
