import React, { useState } from "react";
import { Link } from "react-router-dom";

import { login } from "../../utils/User/loginAPI";

import { ERROR_SIGN_IN } from "../../constants/validationErrorsConstants";
import {
  SIGN_IN_CONSTANT,
  SIGN_UP_CONSTANT,
  COPYRIGHT,
} from "../../constants/mainConstants";

import logo from "../../assets/images/logo.png";

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const Login = () => {
  const [formData, setFormData] = useState({
    email_address: "",
    password: "",
    login_failed: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, login_failed: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email_address, password } = formData;
    if (!formData.login_failed && formData.password !== "") {
      try {
        const result = await login(email_address, password);
        if (result) {
          window.location.href = "/";
        } else {
          setFormData({ ...formData, login_failed: true });
        }
      } catch (error) {
        console.error("Error with login: ", error.message);
      }
    } else {
      setFormData({ ...formData, login_failed: true });
    }
  };
  return (
    <div className="max-w-md mx-auto my-14">
      <div className="flex items-center flex-col bg-white drop-shadow-md rounded-xl border-primary-900 border px-10 pt-0 pb-0 m-4">
        {/* Intro Information */}
        <img
          className="relative z-0 h-16 -top-8 rounded-xl drop-shadow-lg "
          alt="logoImage"
          src={logo}
        />
        <div className="text-center">
          <h1 className="text-primary-900 text-2xl max-2xl:text-xl">
            {SIGN_IN_CONSTANT}
          </h1>
        </div>

        {/* Form for login */}
        <form
          className="flex flex-col gap-2 w-full mt-4"
          onSubmit={handleSubmit}
        >
          {/* Main Errors */}
          <p
            className={`text-error-900 mb-5 ${
              !formData.login_failed ? "hidden" : "text-center"
            }`}
          >
            {ERROR_SIGN_IN}
          </p>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="text"
              name="email_address"
              placeholder="Enter email"
              minLength="3"
              maxLength="100"
              value={formData.email_address}
              onChange={handleChange}
              className="border border-accent-900 text-text-color rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              minLength="8"
              maxLength="30"
              value={formData.password}
              onChange={handleChange}
              className="border border-accent-900 text-text-color rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900"
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-base leading-5 p-3"
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </button>
          </div>

          {/* Link to Sign Up */}
          <div>
            <div>
              <p className="text-center text-sm">
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="text-primary-500 hover:text-primary-900 ease-in-out duration-150 ml-2"
                >
                  {SIGN_UP_CONSTANT}
                </Link>
              </p>
            </div>

            {/* Confirm Button */}
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
            {COPYRIGHT}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
