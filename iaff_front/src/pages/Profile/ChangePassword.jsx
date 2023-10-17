import React, { useState } from "react";
import { login } from "../../services/loginAPI";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    repeat_new_password: "",
    change_failed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, change_failed: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email_address, password } = formData;
    if (
      !formData.change_failed &&
      formData.password !== "" &&
      formData.new_password !== "" &&
      formData.repeat_new_password !== "" &&
      formData.new_password === formData.repeat_new_password &&
      (await login(email_address, password))
    ) {
      alert("Password changed successful");
    } else {
      setFormData({ ...formData, change_failed: true });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="flex flex-col border-2 rounded-md border-solid border-accent-900 mt-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex w-full px-6 pt-6 border-b mb-4">
            <p className="grow text-xl text-primary-500 mb-4">
              Change Password
            </p>
            <a
              className="w-18 h-8 p-1 text-base font-bold bg-secondary-300 hover:bg-secondary-900 text-text-color rounded focus:outline-none focus:shadow-outline"
              href="/#"
            >
              Survey &#8594;
            </a>
          </div>
          <div className="px-16">
            <form className="" onSubmit={handleSubmit}>
              <p className="mb-2">Current Password</p>
              <div className="mb-4">
                <input
                  type="password"
                  name="current_password"
                  placeholder=""
                  minLength="8"
                  maxLength="30"
                  value={formData.current_password}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                <p className="mb-2">New Password</p>
                <div className="mb-4">
                  <input
                    type="password"
                    name="new_password"
                    placeholder=""
                    minLength="8"
                    maxLength="30"
                    value={formData.new_password}
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <p className="mb-2">Repeat New Password</p>
                <div className="mb-2">
                  <input
                    type="password"
                    name="repeat_new_password"
                    placeholder=""
                    minLength="8"
                    maxLength="30"
                    value={formData.repeat_new_password}
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline mb-4"
                  />
                </div>
              </div>
              <p
                className={`text-red mb-5 ${
                  !formData.change_failed ? "hidden" : ""
                }`}
              >
                New Password and Repeat New Password must match!
              </p>
              <button
                className="bg-primary-900 w-full hover:bg-primary-500 text-background-color font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                type="submit"
              >
                Change password
              </button>
              <div className="mb-2 flex items-center justify-center">
                <a className="text-primary-700" href="/changeprofile">
                  Return to Account Settings
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center text-accent-900 mb-4">
          Copyright @ Politechnika Wrocławska
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
