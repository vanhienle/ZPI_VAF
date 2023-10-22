export const isLogged = async () => {
  try {
    const response = await fetch("http://91.195.53.69:5000/users/is_logged", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Sign-up failed");
    }
  } catch (error) {
    throw error;
  }
};
