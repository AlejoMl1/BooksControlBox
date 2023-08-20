import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    // You can perform further actions like sending data to a server here
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row">
        <h1 className="mb-4">Log in</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
