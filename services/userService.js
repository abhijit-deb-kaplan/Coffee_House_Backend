const { createToken } = require("../helpers/tokenGeneration");
const {
  getUserByEmail,
  updateUserLoginStatus,
  checkEmailExists,
  insertUser,
  logoutUserEmail,
} = require("../models/userModel");
const bcrypt = require("bcrypt");

const loginService = async (email, password) => {
  try {
    // Get user by email
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email");
    }

    // Compare the provided password with the hashed password in the db
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Wrong password");
    }

    // Passwords match, update the is_loggedin column
    await updateUserLoginStatus(user.id);

    const token = createToken(user.email);

    return {
      success: true,
      user: {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      },
      token: token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const signupService = async (firstName, lastName, email, password) => {
  try {
    // Check if the email already exists
    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      throw new Error("Email already exists");
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // If email is unique, proceed with insertion
    await insertUser(firstName, lastName, email, hashedPassword);
  } catch (error) {
    throw new Error(error.message);
  }
};

const logoutService = async (email) => {
  try {
    await logoutUserEmail(email);
  } catch (error) {
    throw new Error("Ineternal Server error");
  }
};

const loggedInUserService = async (email) => {
  const user = await getUserByEmail(email);
  return user;
};

module.exports = {
  loginService,
  signupService,
  logoutService,
  loggedInUserService,
};
