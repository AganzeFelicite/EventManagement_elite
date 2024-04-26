const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const route = express.Router();
const pool = require("../Db");
const { authenticateToken, isAdmin } = require("../middleware/authorization");
route.use(express.json());

// User registration
route.post("/register", async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    // Check if the username or email already exists
    const checkUserQuery =
      "SELECT * FROM users WHERE username = $1 OR email = $2";
    const checkUserValues = [username, email];
    const checkUserResult = await pool.query(checkUserQuery, checkUserValues);

    if (checkUserResult.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    const insertUserQuery =
      "INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *";
    const insertUserValues = [username, email, hashedPassword, isAdmin];
    const insertUserResult = await pool.query(
      insertUserQuery,
      insertUserValues
    );

    res.status(201).json(insertUserResult.rows[0]);
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User login
route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists in the database
    const checkUserQuery = "SELECT * FROM users WHERE email = $1";
    const checkUserValues = [email];
    const checkUserResult = await pool.query(checkUserQuery, checkUserValues);

    if (checkUserResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = checkUserResult.rows[0];

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign(
      { userId: user.id, isAdmin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware for authenticating and authorizing requests

// Admin-only route example
route.get("/admin/users", authenticateToken, isAdmin, async (req, res) => {
  try {
    const getUsersQuery = "SELECT id, username, email, is_admin FROM users";
    const getUsersResult = await pool.query(getUsersQuery);

    res.json(getUsersResult.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.get("/info", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user details from the database
    const getUserQuery =
      "SELECT id, username, email, is_admin FROM users WHERE id = $1";
    const getUserValues = [userId];
    const userResult = await pool.query(getUserQuery, getUserValues);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];
    res.json(user);
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = route;
