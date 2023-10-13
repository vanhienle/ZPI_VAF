import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../../assets/images/logo.png";
import { login } from "../../services/loginAPI";

const Login = () => {
  const [formData, setFormData] = useState({
    email_address: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email_address, password } = formData;
    if (await login(email_address, password)) {
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <div className="d-flex flex-col justify-content-center align-items-center p-18 border-2 rounded-md border-solid border-primary-900 mt-12">
        <img
          className="relative z-0 -top-7 h-14 border-2 rounded-md border-solid border-accent-500 "
          alt="logoImage"
          src={logo}
        />
        <Form className="p-14 pt-0" onSubmit={handleSubmit}>
          <h3 className="d-flex justify-content-center text-text-color mb-6 font-bold">
            SIGN IN
          </h3>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="email_address"
              placeholder="Enter email"
              minLength={3}
              maxLength={100}
              value={formData.email_address}
              onChange={handleChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              minLength={8}
              maxLength={30}
              value={formData.password}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="valid">
              Wrong password{" "}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Text className="d-flex justify-content-center">
            <p>Have not got an account? &nbsp;</p>
            <a href="/registration">Sign Up here</a>
          </Form.Text>
          <Button className="w-100 mb-2" variant="primary" type="submit">
            SIGN IN
          </Button>
          <Form.Text className="d-flex justify-content-center">
            <p className="font-bold">Copyright @ Politechnika Wrocławska</p>
          </Form.Text>
        </Form>
      </div>
    </div>
  );
};

export default Login;
