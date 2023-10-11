const {
  loginService,
  signupService,
  logoutService,
  loggedInUserService,
} = require("../services/userService");
const { isValidEmail } = require("../helpers/emailValidation");

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !isValidEmail(email)) {
      throw new Error("error");
    }

    if (!password) {
      throw new Error("error");
    }

    const result = await loginService(email, password);

    if (result.success) {
      return res.json({
        success: result.success,
        user: {
          id: result.user.id,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email,
        },
        token: result.token,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
      throw new Error("Enter the First Name");
    }

    if (!lastName) {
      throw new Error("Enter the Last Name");
    }

    if (!email || !isValidEmail(email)) {
      throw new Error("Enter a valid email");
    }

    if (!password) {
      throw new Error("Enter the password");
    }

    await signupService(firstName, lastName, email, password);

    res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// logout user
const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Perform logout
    await logoutService(email);

    res.status(200).json({ success: true, message: "Logout successful." });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// loggedIn user details
const loggedInUserDetails = async (req, res) => {
  const userData = await loggedInUserService(req.user.email);
  res.status(200).json({ success: true, message: "fetched", data: userData });
};

module.exports = { loginUser, signupUser, logoutUser, loggedInUserDetails };
