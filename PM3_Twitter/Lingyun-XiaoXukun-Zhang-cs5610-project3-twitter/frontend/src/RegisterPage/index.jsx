import React, { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const RegisterPage = () => {
  const { login, error } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nicknameInput, setNicknameInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const maxLength = 200;
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (passwordInput !== confirmPasswordInput) {
      alert("Passwords do not match");
      return;
    }

    if (descriptionInput.length > maxLength) {
      alert("Description cannot be longer than 200 characters");
      return;
    }

    try {
      const response = await axios.post("/api/users/register", {
        username: usernameInput,
        nickname: nicknameInput,
        password: passwordInput,
        avatar: avatarInput || undefined,
        description: descriptionInput,
      });
      // If registration is successful, log the user in and redirect to the TalkTown page
      if (response.status === 200) {
        await login(usernameInput, passwordInput);
        navigate("/talktown");
      }
    } catch (e) {
      console.log("Registration failed", e);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create Your Account</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Nickname</label>
            <input
              type="text"
              placeholder="Enter your nickname"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="(Optional) Add a brief description about yourself"
              value={descriptionInput}
              onChange={(e) => {
                if (e.target.value.length <= maxLength) {
                  setDescriptionInput(e.target.value);
                }
              }}
              maxLength={maxLength}
            />
            <div className="char-count">
              {descriptionInput.length}/{maxLength}
            </div>
          </div>
          <div className="form-group">
            <label>Avatar URL</label>
            <input
              type="text"
              placeholder="(Optional) If you want to add an avatar, enter the URL here"
              value={avatarInput}
              onChange={(e) => setAvatarInput(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}{" "}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
