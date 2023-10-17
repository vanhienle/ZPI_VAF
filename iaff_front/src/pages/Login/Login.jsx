import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { login } from "../../utils/User/loginAPI";

const Login = () => {
  const [formData, setFormData] = useState({
    email_address: "",
    password: "",
    login_failed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, login_failed: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email_address, password } = formData;
    if (
      !formData.login_failed &&
      formData.password !== "" &&
      (await login(email_address, password))
    ) {
      alert("Login successful");
    } else {
      setFormData({ ...formData, login_failed: true });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center pt-4 mb-6">
      <div className="flex flex-col items-center justify-center border-2 rounded-md border-solid border-primary-900 p-18 mt-10">
        <img
          className="relative z-0 -top-7 h-16 border-2 rounded-md border-solid border-accent-500 "
          alt="logoImage"
          src={logo}
        />
        <form className="p-12 pt-0" onSubmit={handleSubmit}>
          <p className="text-text-color text-center mb-6 font-bold text-xl">
            SIGN IN
          </p>
          <p
            className={`text-red mb-5 ${
              !formData.login_failed ? "hidden" : ""
            }`}
          >
            Email or password is not correct!
          </p>
          <div className="mb-4">
            <input
              type="text"
              name="email_address"
              placeholder="Enter email"
              minLength="3"
              maxLength="100"
              value={formData.email_address}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              minLength="8"
              maxLength="30"
              value={formData.password}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex text-center mb-5">
            <p>Have not got an account? &nbsp;</p>
            <a className="text-primary-700" href="/registration">
              Sign Up here
            </a>
          </div>
          <button
            className="bg-primary-900 w-full hover:bg-primary-500 text-background-color font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            type="submit"
          >
            Log In
          </button>
          <div className="text-center text-accent-900">
            Copyright @ Politechnika Wrocławska
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
