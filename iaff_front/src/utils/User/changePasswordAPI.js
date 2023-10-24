export async function changePassword(email, password, newpassword) {
  try {
    const response = await Promise.race([
      fetch(process.env.REACT_APP_BACK_END_URL + "users/change_password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, newpassword }),
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(
            new Error("Password change request timed out after 3 seconds")
          );
        }, 3000);
      }),
    ]);
    if (response.ok) {
      const data = await response.json();
      if (data === "True") {
        return true;
      } else return false;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
