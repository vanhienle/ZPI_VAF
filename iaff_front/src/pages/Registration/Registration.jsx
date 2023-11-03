import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { copyright } from "../../constants/main";
import {
  haveAnAccountMessage,
  errorNameValidation,
  errorEmailValidation,
  errorPasswordValidation,
  errorMatchPasswordValidation,
  errorFormRequest,
  errorFormValidation,
} from "../../constants/signUp";

import { signup } from "../../utils/User/signupAPI";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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
        name: errorNameValidation,
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
        email: errorEmailValidation,
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
        password: errorPasswordValidation,
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
        repeatPassword: errorMatchPasswordValidation,
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
          navigate("/survey");
        } else {
          console.log("Sign Up failed!");
          setErrors((prevErrors) => ({
            ...prevErrors,
            form: errorFormValidation,
          }));
        }
      } catch (error) {
        console.error("Error: ", error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: errorFormRequest,
        }));
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: errorFormValidation,
      }));
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
          <div>
            <input
              className={`border-2 ${
                errors.name
                  ? "border-error-900 text-error-900"
                  : "border-accent-900 text-text-color"
              } rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900`}
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
            {errors.name && (
              <p className="text-error-900 text-base max-2xl:text-sm mb-0 text-center">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <input
              className={`border-2 ${
                errors.email
                  ? "border-error-900 text-error-900"
                  : "border-accent-900 text-text-color"
              } rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900`}
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
            {errors.email && (
              <p className="text-error-900 text-base max-2xl:text-sm mb-0 text-center">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <input
              className={`border-2 ${
                errors.password
                  ? "border-error-900 text-error-900"
                  : "border-accent-900 text-text-color"
              } rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900`}
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
            {errors.password && (
              <p className="text-error-900 text-base max-2xl:text-sm mb-0 text-center">
                {errors.password}
              </p>
            )}
          </div>
          <div>
            <input
              className={`border-2 ${
                errors.repeatPassword
                  ? "border-error-900 text-error-900"
                  : "border-accent-900 text-text-color"
              } rounded-lg w-full py-2 px-4 text-lg max-2xl:text-base leading-tight focus:outline-none focus:border-primary-900`}
              id="password"
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
            {errors.repeatPassword && (
              <p className="text-error-900 text-base max-2xl:text-sm mb-0 text-center">
                {errors.repeatPassword}
              </p>
            )}
          </div>
          <div>
            <div>
              <p className="text-center text-sm">
                {haveAnAccountMessage}
                <a
                  href="/login"
                  className="text-primary-500 hover:text-primary-900 ease-in-out duration-150"
                >
                  Sign In Here
                </a>
              </p>
            </div>
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
        <div className="mt-2">
          <p className="text-center text-sm max-2xl:text-xs mb-8 mt-6">
            {copyright}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
