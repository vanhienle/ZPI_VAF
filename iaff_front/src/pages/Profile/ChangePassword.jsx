import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { changePassword } from "../../utils/User/changePasswordAPI";
import { getUserData } from "../../utils/User/getUserDataAPI";
import { isFilledSurvey } from "../../utils/Survey/isFilledSurveyAPI";
import Loading from "../../components/Spinner/Loading";
import {
  ERROR_PASSWORD_VALIDATION,
  ERROR_MATCH_PASSWORD_VALIDATION,
} from "../../constants/signUp";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    repeat_new_password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      getUserData().then((result) => {
        setEmail(result.email);
        setIsLoading(false);
      });
    }, 500);
  }, []);

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        new_password: ERROR_PASSWORD_VALIDATION,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        new_password: "",
      }));
    }
  };

  const validatePasswordMatch = (value) => {
    if (formData.new_password !== value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeat_new_password: ERROR_MATCH_PASSWORD_VALIDATION,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeat_new_password: "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const redirectToSurvey = async () => {
    const result = await isFilledSurvey();
    if (result) {
      navigate("/change-survey");
    } else {
      window.location.href("/survey");
    }
  };

  const validateForm = () => {
    if (
      errors.repeat_new_password === "" &&
      errors.new_password === "" &&
      formData.current_password !== "" &&
      formData.new_password !== "" &&
      formData.repeat_new_password !== ""
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { current_password, new_password } = formData;

    if (validateForm()) {
      try {
        const result = await changePassword(
          email,
          current_password,
          new_password
        );

        if (result) {
          alert("Password changed successfully");
          navigate(0);
        } else {
          alert("Password changed failed! Try Again!");
          navigate(0);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "Please fill all data correctly!",
      }));

      setTimeout(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: "",
        }));
      }, 5000);
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
            <button
              className="py-2 px-6 text-lg max-lg:text-base max-sm:text-xs font-bold bg-primary-900 hover:bg-primary-500 text-background-color rounded-md focus:outline-none focus:shadow-outline ease-in-out duration-200"
              onClick={redirectToSurvey}
            >
              Survey &#8594;
            </button>
          </div>
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-80 m-3">
              <Loading width={80} height={80} radius={12} />
            </div>
          ) : (
            <form className="w-2/3 max-md:w-3/4" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4 mb-3">
                <p
                  className={`text-error-900 w-full text-center ${
                    !errors.form ? "hidden" : ""
                  }`}
                >
                  {errors.form}
                </p>
                <div className="flex flex-col space-y-2">
                  <p className="text-primary-900 font-bold">Current Password</p>
                  <input
                    type="password"
                    name="current_password"
                    value={formData.current_password}
                    onChange={handleChange}
                    className="leading-tight focus:outline-none focus:border-primary-900 text-lg max-2xl:text-base border-2 rounded-lg w-full py-2 px-4 border-accent-700 text-text-color focus:shadow-outline mb-4"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p
                    className={`${
                      errors.new_password
                        ? "text-error-900"
                        : "text-primary-900"
                    } font-bold`}
                  >
                    New Password
                  </p>
                  <input
                    type="password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={(e) => {
                      handleChange(e);
                      if (errors.new_password) {
                        validatePassword(e.target.value);
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.new_password) {
                        validatePassword(e.target.value);
                      }
                    }}
                    className="leading-tight focus:outline-none focus:border-primary-900 text-lg max-2xl:text-base border-2 rounded-lg w-full py-2 px-4 border-accent-700 text-text-color focus:shadow-outline mb-4"
                  />
                </div>
                <p
                  className={`text-error-900 w-full text-center ${
                    !errors.new_password ? "hidden" : ""
                  }`}
                >
                  {errors.new_password}
                </p>
                <div className="flex flex-col space-y-2">
                  <p
                    className={`${
                      errors.repeat_new_password
                        ? "text-error-900"
                        : "text-primary-900"
                    } font-bold`}
                  >
                    Repeat New Password
                  </p>
                  <input
                    type="password"
                    name="repeat_new_password"
                    value={formData.repeat_new_password}
                    onChange={(e) => {
                      handleChange(e);
                      if (errors.repeat_new_password) {
                        validatePasswordMatch(e.target.value);
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.repeat_new_password) {
                        validatePasswordMatch(e.target.value);
                      }
                    }}
                    className="leading-tight focus:outline-none focus:border-primary-900 text-lg max-2xl:text-base border-2 rounded-lg w-full py-2 px-4 border-accent-700 text-text-color focus:shadow-outline mb-4"
                  />
                </div>
                <p
                  className={`text-error-900 w-full text-center ${
                    !errors.repeat_new_password ? "hidden" : ""
                  }`}
                >
                  {errors.repeat_new_password}
                </p>
              </div>
              <button
                className="bg-primary-900 w-full hover:bg-primary-500 text-background-color font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-3 mb-3 ease-in-out duration-200"
                type="submit"
              >
                Change password
              </button>
              <div className="mb-3 flex items-center justify-center">
                <Link
                  to="/change-profile"
                  className="text-primary-500 text-center w-full hover:text-primary-900 ease-in-out duration-200"
                >
                  Return to Account Settings
                </Link>
              </div>
            </form>
          )}
        </div>
        <div className="text-center text-accent-900 mb-3">
          Copyright @ Politechnika Wrocławska
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
