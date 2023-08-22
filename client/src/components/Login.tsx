import React, { useState } from "react";
import { URL_POST_USER_LOGIN } from "../assets/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserCredentials } from "../redux/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear loginError when input fields are changed
    setLoginError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response= await axios.post(URL_POST_USER_LOGIN, formData);
      console.log("response",response);
      const userCredentials = { userUuid:response.data.data.userUuid, username:response.data.data.username};
      dispatch(addUserCredentials(userCredentials));
      navigate("/home");
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
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
              className={`form-control ${loginError ? "is-invalid" : ""}`}
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
              className={`form-control ${loginError ? "is-invalid" : ""}`}
            />
            {loginError && (
              <div className="invalid-feedback">Please check your credentials</div>
            )}
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
