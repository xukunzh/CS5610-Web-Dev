import React, { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const LoginPage = () => {
  const { login, error, setError } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!usernameInput || !passwordInput) {
      setError("Please fill in both fields");
      return;
    }
    try {
      const loginSuccess = await login(usernameInput, passwordInput);
      if (loginSuccess) {
        navigate("/talktown");
      }
    } catch (e) {
      console.error("Login error:", e);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
