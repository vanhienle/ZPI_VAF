import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeProfile } from "../../utils/User/changeProfileAPI";
import { getUserData } from "../../utils/User/getUserDataAPI";

const ChangeProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    password: "",
    change_failed: false,
  });

  useEffect(() => {
    getUserData().then((result) => {
      setFormData({
        ...formData,
        name: result.name,
        email_address: result.email,
      });
    });
  }, []);

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
      <div className="flex flex-col border-2 rounded-md border-solid border-accent-900 w-2/5 max-xl:w-3/5 max-lg:w-3/4 mt-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full px-6 pt-6 border-b mb-4">
            <p className="text-2xl text-primary-500 m-4 max-lg:text-lg">
              Account Settings
            </p>
            <a
              className="py-2 px-6 text-lg max-lg:text-base max-sm:text-xs font-bold bg-primary-900 hover:bg-primary-500 text-background-color
              rounded-md
              focus:outline-none
              focus:shadow-outline
              ease-in-out
              duration-200"
              href="/survey"
            >
              Survey &#8594;
            </a>
          </div>
          <form className="w-2/3 max-md:w-3/4" onSubmit={handleSubmit}>
            <p className="mb-2 text-primary-900 font-bold">Your name</p>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder=""
                minLength="1"
                maxLength="30"
                value={formData.name}
                onChange={handleChange}
                className="leading-tight focus:outline-none focus:border-primary-900 text-lg max-2xl:text-base border rounded-lg w-full py-2 px-4 border-accent-700 text-text-color focus:shadow-outline mb-4"
              />
              <p className="mb-2 text-primary-900 font-bold">Your email</p>
              <div className="mb-4">
                <input
                  type="text"
                  name="email_address"
                  placeholder="actionboyvn@gmail.com"
                  minLength="3"
                  maxLength="100"
                  value={formData.email_address}
                  onChange={handleChange}
                  className="leading-tight focus:outline-none focus:border-primary-900 text-lg max-2xl:text-base border rounded-lg w-full py-2 px-4 border-accent-700 text-text-color focus:shadow-outline mb-4"
                />
              </div>
              <p className="mb-2 text-primary-900 font-bold">
                Current password
              </p>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder=""
                  minLength="8"
                  maxLength="100"
                  value={formData.password}
                  onChange={handleChange}
                  className="leading-tight focus:outline-none focus:border-primary-900 text-lg max-2xl:text-base border rounded-lg w-full py-2 px-4 border-accent-700 text-text-color focus:shadow-outline mb-4"
                />
              </div>
              <p
                className={`text-error-900 mb-5 w-full text-center${
                  !formData.change_failed ? "hidden" : ""
                }`}
              >
                Current password is incorrect!
              </p>
            </div>
            <div className="flex text-center mb-5">
              <a
                className="text-primary-500 text-center w-full hover:text-primary-900 ease-in-out duration-200"
                href="/changepassword"
              >
                Change password here
              </a>
            </div>
            <button
              className="bg-primary-900 w-full hover:bg-primary-500 text-background-color font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline mb-4 ease-in-out duration-200"
              type="submit"
            >
              Update profile
            </button>
          </form>
        </div>
        <div className="text-center text-accent-700 mb-4">
          Copyright @ Politechnika Wrocławska
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
