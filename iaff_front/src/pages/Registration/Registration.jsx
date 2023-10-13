import React, { useState } from "react";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Validate Name
    if (formData.name.length < 2 || formData.name.length > 100) {
      newErrors.name = "Name must be between 2 and 100 characters.";
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      formData.email.length < 3 ||
      formData.email.length > 50 ||
      !emailRegex.test(formData.email)
    ) {
      newErrors.email =
        "Email must be between 3 and 50 characters and have a valid format.";
    }

    // Validate Password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // Validate Repeat Password
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form or perform any other action here
      console.log("Form is valid, data can be submitted.");
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-text-color text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className={`appearance-none border ${
              errors.name ? "border-red" : "border-text-color"
            } rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline`}
            id="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && (
            <p className="text-red text-xs italic">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-text-color text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`appearance-none border ${
              errors.email ? "border-red-500" : "border-text-color"
            } rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-text-color text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`appearance-none border ${
              errors.password ? "border-red" : "border-text-color"
            } rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-red text-xs italic">{errors.password}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-text-color text-sm font-bold mb-2"
            htmlFor="repeatPassword"
          >
            Repeat Password
          </label>
          <input
            className={`appearance-none border ${
              errors.repeatPassword ? "border-red" : "border-text-color"
            } rounded w-full py-2 px-3 text-text-color leading-tight focus:outline-none focus:shadow-outline`}
            id="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            value={formData.repeatPassword}
            onChange={(e) =>
              setFormData({ ...formData, repeatPassword: e.target.value })
            }
          />
          {errors.repeatPassword && (
            <p className="text-red text-xs italic">{errors.repeatPassword}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-primary-900 w-full hover:bg-primary-500 text-background-color font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
