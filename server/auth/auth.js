// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// require("dotenv").config();

// // Generate a JWT token
// const generateToken = (userId, isAdmin) => {
//   const payload = { userId, isAdmin };
//   const secret = process.env.JWT_SECRET;
//   const options = { expiresIn: "1h" };

//   return jwt.sign(payload, secret, options);
// };

// // Hash a password using bcrypt
// const hashPassword = async (password) => {
//   const saltRounds = 10;
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   return hashedPassword;
// };

// // Compare a password with a hashed password
// const comparePasswords = async (password, hashedPassword) => {
//   const isMatch = await bcrypt.compare(password, hashedPassword);
//   return isMatch;
// };

// module.exports = { generateToken, hashPassword, comparePasswords };
