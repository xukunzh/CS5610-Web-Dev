import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // user object
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/api/users/isLoggedIn");
        if (response.data.user) {
          setCurrentUser(response.data.user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        console.log("Current User is logged in:", response.data.user);
      } catch (e) {
        console.error("Error checking login status", e);
      }
    };
    checkLoggedIn();
  }, [isLoggedIn]);

  // return a boolean indicating whether the user is logged in
  const login = async (username, password) => {
    try {
      const response = await axios.post("/api/users/login", {
        username,
        password,
      });
  
      if (response.data.user) {
        setCurrentUser(response.data.user);
        setIsLoggedIn(true);
        setError("");
        return true;
      }
    } catch (e) {
      setError("Login failed");
      setIsLoggedIn(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/users/logOut");
      setCurrentUser(null);
      setIsLoggedIn(false);
      setError("");
    } catch (e) {
      console.error("Error during logout", e);
    }
  };

  return (
    <UserContext.Provider
      value={{ currentUser, login, logout, error, isLoggedIn, setError }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
