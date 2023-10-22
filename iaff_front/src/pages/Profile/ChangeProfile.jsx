import React, { useState } from "react";
import { login } from "../../utils/User/loginAPI";

const ChangeProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
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
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="flex flex-col border-2 rounded-md border-solid border-accent-900 mt-8">
        <div className="flex px-6 pt-6 border-b">
          <p className="grow text-xl text-primary-500 mb-4">Account Settings</p>
          <a
            className="w-18 h-8 p-1 text-base font-bold bg-secondary-300 hover:bg-secondary-900 text-text-color rounded focus:outline-none focus:shadow-outline"
            href="/#"
          >
            Survey &#8594;
          </a>
        </div>
        <div className="grid grid-cols-7 p-6">
          <div className="col-span-2 flex flex-col items-center ">
            <img
              className="relative z-0 h-20 w-20 border-2 rounded-full border-solid border-accent-900"
              alt="logoImage"
              src="data:image/png;base64,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"
            />
            <a className="text-primary-700" href="/#">
              Change avatar
            </a>{" "}
          </div>
          <div className="col-span-5">
            <form className="px-4" onSubmit={handleSubmit}>
              <p className="mb-2">Your name</p>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Hien"
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
        </div>
        <div className="text-center text-accent-900 mb-4">
          Copyright @ Politechnika Wrocławska
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
