const jwt = require("jsonwebtoken");

const createToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "3d" });
};

module.exports = { createToken };
