import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import { login } from "../../utils/User/loginAPI";

import { copyright } from "../../constants/main";

const Login = () => {
  const [formData, setFormData] = useState({
    email_address: "",
    password: "",
    login_failed: false,
  });

  const isLogin = localStorage.getItem("isLogin") === "true";
  const navigate = useNavigate();

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
      localStorage.setItem("isLogin", true);
      console.log("SUCCESS");
      navigate(0);
    } else {
      setFormData({ ...formData, login_failed: true });
    }
  };
  return (
    <div className="max-w-md mx-auto my-14">
      <div className="flex items-center flex-col bg-white drop-shadow-md rounded-xl border-primary-900 border-2 px-10 pt-0 pb-0 m-4">
        <img
          className="relative z-0 h-16 -top-8 rounded-xl drop-shadow-lg "
          alt="logoImage"
          src={logo}
        />
        <div className="text-center">
          <h1 className="text-primary-900 text-2xl max-2xl:text-xl font-bold">
            SIGN UP
          </h1>
        </div>
        <form
          className="flex flex-col gap-2 w-full mt-4"
          onSubmit={handleSubmit}
        >
          <p
            className={`text-error-900 mb-5 ${
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
              className="border-2 border-accent-900 text-text-color rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900"
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
              className="border-2 border-accent-900 text-text-color rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900"
            />
          </div>

          <div>
            <div>
              <p className="text-center text-sm">
                Don't have an account?
                <a
                  href="/login"
                  className="text-primary-500 hover:text-primary-900 ease-in-out duration-150 ml-2"
                >
                  Sign In Here
                </a>
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-primary-900 w-full hover:bg-primary-700 text-background-color py-2 px-4 text-lg max-2xl:text-base rounded-lg ease-in-out duration-150 focus:drop-shadow-sm-primary-900 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Confirm
              </button>
            </div>
          </div>
        </form>
        <div className="mt-2">
          <p className="text-center text-sm max-2xl:text-xs mb-8 mt-4">
            {copyright}
          </p>
        </div>
      </div>
      <>{isLogin && <Navigate to="/" />}</>
    </div>
  );
};

export default Login;
