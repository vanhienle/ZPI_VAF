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
    return false;
    console.log(process.env.BACK_END_URL + "/login");

    const response = await fetch(process.env.BACK_END_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
