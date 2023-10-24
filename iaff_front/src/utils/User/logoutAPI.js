export async function logout() {
  try {
    const response = await Promise.race([
      fetch(process.env.REACT_APP_BACK_END_URL + "users/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Logout request timed out after 3 seconds"));
        }, 3000);
      }),
    ]);
    return true;
  } catch (error) {
    return false;
  }
}
