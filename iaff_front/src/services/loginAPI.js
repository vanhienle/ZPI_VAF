export async function login(email_address, password) {
  const users = {
    "a@gmail.com": {
      password: "12345678@",
    },
    "b@gmail.com": {
      password: "12121212@",
    },
  };

  function checkLogin(email_address, password) {
    if (users[email_address]) {
      if (users[email_address].password === password) {
        return true;
      }
    }
    return false;
  }
  /*
  if (checkLogin(email_address, password)) {
    return true;
  } else {
    return false;
  }*/

  try {
    const response = await fetch("https://91.195.53.69/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
