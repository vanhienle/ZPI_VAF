export const signUp = async (data) => {
  try {
    const response = await fetch("http://91.195.53.69:5000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
