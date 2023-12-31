import axios, { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { URL_POST_USER_SIGNUP, URL_GET_BOOKS } from "../assets/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserCredentials } from "../redux/userSlice";
import { loadCatalog } from "../redux/booksSlice";

import "./SignUp.css";
const SignUP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL_GET_BOOKS);
        const fetchedBooks = response.data.data;
        console.log("Fetched books", fetchedBooks);
        dispatch(loadCatalog(fetchedBooks));
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    lastName: "",
  });

  const [usernameExistsError, setUsernameExistsError] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUsernameExistsError(false); // Reset the error when input changes
  };
  const isButtonDisabled: boolean =
    formData.username === "" ||
    formData.password === "" ||
    formData.name === "" ||
    formData.lastName === "";
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const response = await axios.post(URL_POST_USER_SIGNUP, formData);
      const userCredentials = {
        userUuid: response.data.data.userUuid,
        username: response.data.data.username,
      };
      dispatch(addUserCredentials(userCredentials));
      navigate("/home");
    } catch (error: AxiosError | any) {
      if (error.response.status === 400) {
        setUsernameExistsError(true);
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center main">
      <div className="row">
        <h3>Sign Up!</h3>
        <p>It's quick and easy.</p>
        <form onSubmit={handleSubmit}>
          <div className={`mb-3 ${usernameExistsError ? "has-error" : ""}`}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
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

export default SignUP;
