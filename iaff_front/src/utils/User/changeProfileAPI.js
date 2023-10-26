export async function changeProfile(name, current_email, new_email, password) {
  try {
    const response = await Promise.race([
      fetch(process.env.REACT_APP_BACK_END_URL + "users/change_account", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, current_email, new_email, password }),
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Profile change request timed out after 3 seconds"));
        }, 3000);
      }),
    ]);
    if (response.ok) {
      const data = await response.json();
      if (data === "True") {
        localStorage.setItem("name", name);
        localStorage.setItem("email", new_email);
        return true;
      } else return false;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
