import React, { useState } from "react";
import { signUp } from "../../utils/User/signUpApi";
import logo from "../../assets/images/logo.png";
import {
  haveAnAccountMessage,
  errorNameValidation,
  errorEmailValidation,
  errorPasswordValidation,
  errorMatchPasswordValidation,
  errorFormRequest,
  errorFormValidation,
} from "../../constants/signUp";
import { copyright } from "../../constants/main";

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
    const pattern = /^[A-Za-z\-]+$/;
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
        const response = await signUp(data);

        console.log("Sign Up success", response);
      } catch (error) {
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
    <div className="max-w-lg mx-auto mt-14">
      <div className="flex items-center flex-col bg-white drop-shadow-md rounded-xl border-primary-900 border-2 px-14 pt-0 pb-0 m-4">
        <img
          className="relative z-0 h-16 w-52 -top-8 rounded-xl drop-shadow-lg "
          alt="logoImage"
          src={logo}
        />
        <div className="text-center text-text-color">
          <h3 className="text-primary-900">SIGN UP</h3>
          {errors.form && (
            <p className="text-error-900 text-sm text-center">{errors.form}</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div>
            <input
              className={`border-2 ${
                errors.name
                  ? "border-error-900 text-error-900"
                  : "border-accent-900 text-text-color"
              } rounded-lg w-full py-2 px-4 leading-tight focus:outline-none focus:border-primary-900`}
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
              <p className="text-error-900 text-xs mb-0 text-center">
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
              } rounded-lg w-full py-2 px-4 leading-tight focus:outline-none focus:border-primary-900`}
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
              <p className="text-error-900 text-xs mb-0 text-center">
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
              } rounded-lg w-full py-2 px-4 leading-tight focus:outline-none focus:border-primary-900`}
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
              <p className="text-error-900 text-xs mb-0 text-center">
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
              } rounded-lg w-full py-2 px-4 leading-tight focus:outline-none focus:border-primary-900`}
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
              <p className="text-error-900 text-xs mb-0 text-center">
                {errors.repeatPassword}
              </p>
            )}
          </div>
          <div>
            <div>
              <p className="text-center">
                {haveAnAccountMessage}
                <a href="/login">Sign In Here</a>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-primary-900 w-full hover:bg-primary-700 text-background-color py-2 px-4 rounded-lg focus:drop-shadow-sm-primary-900 focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </form>
        <div className="mt-2">
          <p className="text-center text-xs">{copyright}</p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
