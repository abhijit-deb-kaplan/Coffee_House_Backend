const getAllMenuSQL = "SELECT * FROM coffee_menu";
const getEmailSQL = "SELECT * FROM users WHERE email = ?";
const updateUserSQL = "UPDATE users SET is_loggedin = true WHERE id = ?";
const checkEmailCountSQL = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
const insertUserSQL = "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
const logoutUserSQL = "UPDATE users SET is_loggedin = FALSE WHERE email = ?";


module.exports = {getAllMenuSQL, getEmailSQL, updateUserSQL, checkEmailCountSQL, insertUserSQL, logoutUserSQL}