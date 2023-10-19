export async function login(email, password) {
  try {
    const response = await Promise.race([
      fetch("http://91.195.53.69:5000/users/login", {
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
      if (data === "True") return true;
      else return false;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
