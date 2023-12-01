import React, { useState } from "react";
import { Link } from "react-router-dom";

import { signup } from "../../utils/User/signupAPI";

import {
  COPYRIGHT,
  SIGN_IN_CONSTANT,
  SIGN_UP_CONSTANT,
} from "../../constants/mainConstants";
import {
  ERROR_NAME_VALIDATION,
  ERROR_EMAIL_VALIDATION,
  ERROR_PASSWORD_VALIDATION,
  ERROR_MATCH_PASSWORD_VALIDATION,
  ERROR_FORM_VALIDATION,
  ERROR_SIGN_UP,
} from "../../constants/validationErrorsConstants";

import logo from "../../assets/images/logo.png";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});

  const isFieldsFilledValidate = () => {
    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.repeatPassword
    ) {
      return false;
    } else if (
      name === "" ||
      email === "" ||
      password === "" ||
      repeatPassword === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const validateName = (value) => {
    const pattern = /^[A-Za-z-]+$/;
    if (value.length < 2 || value.length > 100 || !pattern.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: ERROR_NAME_VALIDATION,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "",
      }));
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length < 3 || value.length > 50 || !emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: ERROR_EMAIL_VALIDATION,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: ERROR_PASSWORD_VALIDATION,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  const validatePasswordMatch = (value) => {
    if (password !== value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeatPassword: ERROR_MATCH_PASSWORD_VALIDATION,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeatPassword: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFieldsFilledValidate()) {
      const data = {
        name,
        email,
        password,
      };

      try {
        const result = await signup(data);
        if (result) {
          window.location.href = "/survey";
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            form: ERROR_FORM_VALIDATION,
          }));
        }
      } catch (error) {
        console.error("Error with registration: ", error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: ERROR_SIGN_UP,
        }));
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: ERROR_FORM_VALIDATION,
      }));
    }
  };

  return (
    <div className="max-w-md mx-auto my-14">
      <div className="flex items-center flex-col bg-white drop-shadow-md rounded-xl border-primary-900 border px-10 pt-0 pb-0 m-4">
        {/* Header for Sign Up */}
        <img
          className="relative z-0 h-16 -top-8 rounded-xl drop-shadow-lg "
          alt="logoImage"
          src={logo}
        />
        <div className="text-center">
          <h1 className="text-primary-900 text-2xl max-2xl:text-xl">
            {SIGN_UP_CONSTANT}
          </h1>

          {/* Main Error Message */}
          {errors.form && (
            <p className="text-error-900 text-base max-2xl:text-sm text-center mt-2">
              {errors.form}
            </p>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full mt-4"
        >
          {/* Name Input */}
          <div>
            <input
              className={`${
                errors.name
                  ? "border-error-900 text-error-900"
                  : "border-accent-900 text-text-color"
              } border rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900`}
              id="name"
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => {
                let inputValue = e.target.value;
                setName(inputValue);
                if (errors.name) {
                  validateName(inputValue);
                }
              }}
              onBlur={(e) => {
                let inputValue = e.target.value;
                if (!errors.name) {
                  validateName(inputValue);
                }
              }}
            />

            {/* Name Error */}
            {errors.name && (
              <p className="text-error-900 text-base max-2xl:text-sm mb-0 text-center">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <input
              className={`${
                errors.email
                  ? "border-error-900 text-error-900"
                  : "border-accent-900 text-text-color"
              } border  rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900`}
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => {
                let inputValue = e.target.value;
                setEmail(inputValue);
                if (errors.email) {
                  validateEmail(inputValue);
                }
              }}
              onBlur={(e) => {
                let inputValue = e.target.value;
                if (!errors.email) {
                  validateEmail(inputValue);
                }
              }}
            />

            {/* Email Error */}
            {errors.email && (
              <p className="text-error-900 text-base max-2xl:text-sm mb-0 text-center">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              className={`${
                errors.password
                  ? "border-error-900 text-error-900"
                  : "border-accent-900 text-text-color"
              } border rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900`}
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                let inputValue = e.target.value;
                setPassword(inputValue);
                if (errors.password) {
                  validatePassword(inputValue);
                }
              }}
              onBlur={(e) => {
                let inputValue = e.target.value;
                if (!errors.password) {
                  validatePassword(inputValue);
                }
              }}
            />

            {/* Password Error */}
            {errors.password && (
              <p className="text-error-900 text-base max-2xl:text-sm mb-0 text-center">
                {errors.password}
              </p>
            )}
          </div>

          {/* Repeat Password Input */}
          <div>
            <input
              className={`${
                errors.repeatPassword
                  ? "border-error-900 text-error-900"
                  : "border-accent-900 text-text-color"
              } border rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900`}
              id="repeat-password"
              type="password"
              placeholder="Repeat Password"
              required
              value={repeatPassword}
              onChange={(e) => {
                let inputValue = e.target.value;
                setRepeatPassword(inputValue);
                if (errors.repeatPassword) {
                  validatePasswordMatch(inputValue);
                }
              }}
              onBlur={(e) => {
                let inputValue = e.target.value;
                if (!errors.repeatPassword) {
                  validatePasswordMatch(inputValue);
                }
              }}
            />

            {/* Repeat Password Error */}
            {errors.repeatPassword && (
              <p className="text-error-900 text-base max-2xl:text-sm mb-0 text-center">
                {errors.repeatPassword}
              </p>
            )}
          </div>

          {/* Submit Block */}
          <div>
            {/* Link to Sign In */}
            <div>
              <p className="text-center text-sm">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primary-500 hover:text-primary-900 ease-in-out duration-150 ml-2"
                >
                  {SIGN_IN_CONSTANT}
                </Link>
              </p>
            </div>

            {/* Confirm Button */}
            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-primary-900 w-full hover:bg-primary-700 text-background-color py-2 px-4 text-lg max-2xl:text-base rounded-lg ease-in-out duration-150 focus:drop-shadow-sm-primary-900 focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-2">
          <p className="text-center text-sm max-2xl:text-xs mb-8 mt-6">
            {COPYRIGHT}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
