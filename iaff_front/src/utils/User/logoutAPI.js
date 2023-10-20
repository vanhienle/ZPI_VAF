export async function logout() {
  return true;
  try {
    const response = await Promise.race([
      fetch(window.env.BACK_END_URL + "/users/logout", {
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
