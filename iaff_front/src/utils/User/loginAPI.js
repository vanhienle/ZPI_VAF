export async function login(email, password) {
  try {
    const response = await Promise.race([
      fetch(window.env.BACK_END_URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Login request timed out after 3 seconds"));
        }, 3000);
      }),
    ]);
    if (response.ok) {
      const data = await response.json();
      if (data === "False") {
        return false;
      } else {
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", data.name);
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
