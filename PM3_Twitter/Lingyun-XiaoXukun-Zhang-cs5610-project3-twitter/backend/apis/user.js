const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserModel = require("../db/user/user.model");
const { findUserByUsername } = require("../db/user/user.model");
const { updateUserDescription } = require("../db/user/user.model");
const { updatePassword } = require("../db/user/user.model");
const { findAllUsers } = require("../db/user/user.model");
const { deleteUserByUsername } = require("../db/user/user.model");
const { deletePostsByUsername } = require("../db/post/post.model");
const { comparePassword } = require("../db/user/user.model");

router.get("/", async function (request, response) {
  try {
    const allUsers = await findAllUsers();
    response.send(allUsers);
    console.log("All users:", allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    response.status(500).send("Error fetching users");
  }
});

router.post("/", async function (request, response) {
  const body = request.body;
  const newUserResponse = await UserModel.createUser(body);
  response.send("Created new user!");
});

router.post("/login", async function (req, res) {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ 
        message: "User not found" 
      });
    }

    // Compare password with hashed password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ 
        message: "Invalid password" 
      });
    }

    const token = jwt.sign(username, "HUNTERS_PASSWORD");

    res.cookie("username", token);
    
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    
    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword
    });
  } catch (e) {
    return res.status(500).json({ 
      message: "Internal server error" 
    });
  }
});

router.post("/register", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const avatar = req.body.avatar; // undefined or a string
  const description = req.body.description;

  try {
    if (!username || !password || !nickname) {
      return res.status(409).send("Missing username, nickname or password");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createUserResponse = await UserModel.createUser({
      username: username,
      nickname: nickname,
      password: hashedPassword,
      avatar: avatar,
      description: description || "",
    });

    const token = jwt.sign(username, "HUNTERS_PASSWORD");

    res.cookie("username", token);

    return res.send("User created successfully");
  } catch (e) {
    res.status(401).send("Error: username already exists");
  }
});

// Check if the user is logged in and return the user data
router.get("/isLoggedIn", async function (req, res) {
  const username = req.cookies.username;

  if (!username) {
    return res.send({ user: null });
  }

  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
  } catch (e) {
    console.error("Error verifying token:", e);
    return res.send({ user: null });
  }

  // Find the user in the database
  try {
    const user = await findUserByUsername(decryptedUsername);
    if (!user) {
      return res.send({ user: null });
    }
    console.log("Found user:", user);
    return res.send({ user });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).send({ user: null });
  }
});

router.post("/logOut", async function (req, res) {
  res.cookie("username", "", {
    maxAge: 0,
  });

  res.send(true);
});

router.get("/:username", async function (req, res) {
  const username = req.params.username;

  const userData = await UserModel.findUserByUsername(username);

  return res.send(userData); // return user object
});

// Update user description in userProfilePage
router.put("/update/description", async function (req, res) {
  const { username, description } = req.body;
  
  if (description && description.length > 200) {
    return res.status(400).send("Description cannot be longer than 200 characters");
  }
  
  try {
    const updatedUser = await updateUserDescription(username, description);
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    
    console.log("Description updated successfully:", updatedUser);
    return res.send(updatedUser);
  } catch (error) {
    console.error("Error updating description:", error);
    return res.status(500).send("Error updating description");
  }
});

// Change user password
router.put("/change-password", async function (req, res) {
  const { username, currentPassword, newPassword } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Verify current hashed password
    const isPasswordValid = await comparePassword(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(403).send("Current password is incorrect");
    }
    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    const updatedUser = await updatePassword(username, hashedNewPassword);
    
    if (!updatedUser) {
      return res.status(404).send("Failed to update password");
    }

    console.log("Password updated successfully");
    return res.send("Password updated successfully");
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).send("Error updating password");
  }
});

// Delete account
router.delete("/delete/:username", async function (req, res) {
  const { username } = req.params;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Delete all posts from this user
    console.log("Deleting posts for user:", username);
    await deletePostsByUsername(username);

    // Delete this user account
    console.log("Deleting user account:", username);
    const deletedUser = await deleteUserByUsername(username);
    if (!deletedUser) {
      return res.status(404).send("Failed to delete user");
    }
    // cleanup cookie
    res.cookie("username", "", { maxAge: 0,});
    console.log("Account deleted successfully");
    return res.send("Account and all associated posts deleted successfully");
  } catch (error) {
    console.error("Error deleting account:", error);
    return res.status(500).send(`Error deleting account: ${error.message}`);
  }
});

module.exports = router;
