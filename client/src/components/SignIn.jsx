import axios from "axios";
import React, { useState } from "react";
import { URL_POST_USER } from "../assets/constants";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [usernameExistsError, setUsernameExistsError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUsernameExistsError(false); // Reset the error when input changes
  };
  const isButtonDisabled = formData.username === "" || formData.password === "";
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Form submitted with data:", formData);
    try {
      const response = await axios.post(URL_POST_USER, formData);
      console.log("the response of post is:", response);
    } catch (error) {
      if (error.response.status === 400) {
        setUsernameExistsError(true);
      }
      console.log("error structure", error);
      // console.error("An error occurred:", error);
      // Handle errors that occur during the POST request.
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row">
        <h3>Sign Up!</h3>
        <p>It's quick and easy.</p>
        <form onSubmit={handleSubmit}>
          <div className={`mb-3 ${usernameExistsError ? "has-error" : ""}`}>
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Write your username. Example: alejo1"
              value={formData.username}
              onChange={handleInputChange}
              className={`form-control ${
                usernameExistsError ? "is-invalid" : ""
              }`}
            />
            {usernameExistsError && (
              <p className="text-danger">
                Username already exists. Please choose another one.
              </p>
            )}
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
          <button
            className="btn btn-primary mb-3"
            type="submit"
            disabled={isButtonDisabled}
          >
            Create new user
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
