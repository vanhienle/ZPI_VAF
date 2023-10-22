export async function logout() {
  try {
    const response = await Promise.race([
      fetch("http://91.195.53.69:5000/users/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("logout request timed out after 3 seconds"));
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
