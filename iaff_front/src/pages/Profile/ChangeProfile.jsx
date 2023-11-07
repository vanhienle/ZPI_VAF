import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { changeProfile } from "../../utils/User/changeProfileAPI";

const ChangeProfile = () => {
  const [formData, setFormData] = useState({
    name: localStorage.getItem("name"),
    email_address: localStorage.getItem("email"),
    password: "",
    change_failed: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, change_failed: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email_address, password } = formData;
    if (!formData.change_failed && formData.password !== "") {
      try {
        const result = await changeProfile(name, email_address, password);
        if (result) {
          alert("Profile updated successfully");
          navigate(0);
        } else {
          console.log("Account change failed!");
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    } else {
      console.log("failed");
      setFormData({ ...formData, change_failed: true });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="flex flex-col border-2 rounded-md border-solid border-accent-900 w-2/5 max-sm:w-3/4 mt-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex w-full px-6 pt-6 border-b mb-4">
            <p className="grow text-xl text-primary-500 mb-4">
              Account Settings
            </p>
            <a
              className="w-18 h-8 p-1 text-base font-bold bg-primary-900 hover:bg-primary-500 text-background-color rounded focus:outline-none focus:shadow-outline"
              href="/survey"
            >
              Survey &#8594;
            </a>
          </div>
          <form className="w-1/2 max-sm:w-3/4" onSubmit={handleSubmit}>
            <p className="mb-2">Your name</p>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder=""
                minLength="1"
                maxLength="30"
                value={formData.name}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
              <p className="mb-2">Your email</p>
              <div className="mb-4">
                <input
                  type="text"
                  name="email_address"
                  placeholder="actionboyvn@gmail.com"
                  minLength="3"
                  maxLength="100"
                  value={formData.email_address}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <p className="mb-2">Current password</p>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder=""
                  minLength="8"
                  maxLength="100"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <p
                className={`text-error-900 mb-5 ${
                  !formData.change_failed ? "hidden" : ""
                }`}
              >
                Current password is incorrect!
              </p>
            </div>
            <div className="flex text-center mb-5">
              <a className="text-primary-700" href="/changepassword">
                Change password here
              </a>
            </div>
            <button
              className="bg-primary-900 w-full hover:bg-primary-500 text-background-color font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              type="submit"
            >
              Update profile
            </button>
          </form>
        </div>
        <div className="text-center text-accent-900 mb-4">
          Copyright @ Politechnika Wrocławska
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
