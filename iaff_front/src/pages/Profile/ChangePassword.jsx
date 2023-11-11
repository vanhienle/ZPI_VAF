import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../utils/User/changePasswordAPI";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    repeat_new_password: "",
    password_incorrect: false,
    password_mismatch: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      password_mismatch: false,
      password_incorrect: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { current_password, new_password } = formData;
    if (
      !formData.password_incorrect &&
      formData.current_password !== "" &&
      formData.new_password !== "" &&
      formData.repeat_new_password !== "" &&
      formData.new_password === formData.repeat_new_password
    ) {
      try {
        const result = await changePassword(
          localStorage.getItem("email"),
          current_password,
          new_password
        );

        if (result) {
          alert("Password changed successfully");
          navigate(0);
        } else {
          console.log("Password change failed");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      if (formData.new_password !== formData.repeat_new_password) {
        setFormData({ ...formData, password_mismatch: true });
      } else {
        setFormData({ ...formData, password_incorrect: true });
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="flex flex-col border-2 rounded-md border-solid border-accent-900 w-2/5 max-xl:w-3/5 max-lg:w-3/4 mt-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full px-6 pt-6 border-b mb-4">
            <p className="text-2xl text-primary-500 m-4 max-lg:text-lg">
              Change Password
            </p>
            <a
              className="py-2 px-6 text-lg max-lg:text-base max-sm:text-xs font-bold bg-primary-900 hover:bg-primary-500 text-background-color rounded-md focus:outline-none focus:shadow-outline ease-in-out duration-200"
              href="/change-survey"
            >
              Survey &#8594;
            </a>
          </div>
          <form className="w-2/3 max-md:w-3/4" onSubmit={handleSubmit}>
            <p className="mb-2 text-primary-900 font-bold">Current Password</p>
            <div className="mb-4">
              <input
                type="password"
                name="current_password"
                placeholder=""
                minLength="8"
                maxLength="30"
                value={formData.current_password}
                onChange={handleChange}
                className="leading-tight focus:outline-none focus:border-primary-900 text-lg max-2xl:text-base border rounded-lg w-full py-2 px-4 border-accent-700 text-text-color focus:shadow-outline mb-4"
              />
              <p className="mb-2 text-primary-900 font-bold">New Password</p>
              <div className="mb-4">
                <input
                  type="password"
                  name="new_password"
                  placeholder=""
                  minLength="8"
                  maxLength="30"
                  value={formData.new_password}
                  onChange={handleChange}
                  className="leading-tight focus:outline-none focus:border-primary-900 text-lg max-2xl:text-base border rounded-lg w-full py-2 px-4 border-accent-700 text-text-color focus:shadow-outline mb-4"
                />
              </div>
              <p className="mb-2 text-primary-900 font-bold">
                Repeat New Password
              </p>
              <div className="mb-2">
                <input
                  type="password"
                  name="repeat_new_password"
                  placeholder=""
                  minLength="8"
                  maxLength="30"
                  value={formData.repeat_new_password}
                  onChange={handleChange}
                  className="leading-tight focus:outline-none focus:border-primary-900 text-lg max-2xl:text-base border rounded-lg w-full py-2 px-4 border-accent-700 text-text-color focus:shadow-outline mb-4"
                />
              </div>
            </div>
            <p
              className={`text-error-900 mb-5 w-full text-center ${
                !formData.password_incorrect ? "hidden" : ""
              }`}
            >
              Current Password is incorrect!
            </p>
            <p
              className={`text-error-900 mb-5 w-full text-center ${
                !formData.password_mismatch ? "hidden" : ""
              }`}
            >
              New Password and Repeat New Password must match!
            </p>
            <button
              className="bg-primary-900 w-full hover:bg-primary-500 text-background-color font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline mb-4 ease-in-out duration-200"
              type="submit"
            >
              Change password
            </button>
            <div className="mb-2 flex items-center justify-center">
              <a
                href="/change-profile"
                className="text-primary-500 text-center w-full hover:text-primary-900 ease-in-out duration-200"
              >
                Return to Account Settings
              </a>
            </div>
          </form>
        </div>
        <div className="text-center text-accent-900 mb-4">
          Copyright @ Politechnika Wrocławska
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
