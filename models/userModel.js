const db = require("../database/database");
const {
  getEmailSQL,
  updateUserSQL,
  checkEmailCountSQL,
  insertUserSQL,
  logoutUserSQL,
} = require("../database/sqlQuery");

const getUserByEmail = (email) => {
  const getUserQuery = getEmailSQL;
  return new Promise((resolve, reject) => {
    db.query(getUserQuery, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const updateUserLoginStatus = (userId) => {
  const updateLoginStatusQuery = updateUserSQL;
  return new Promise((resolve, reject) => {
    db.query(updateLoginStatusQuery, [userId], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const checkEmailExists = (email) => {
  const checkEmailQuery = checkEmailCountSQL;
  return new Promise((resolve, reject) => {
    db.query(checkEmailQuery, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].count > 0);
      }
    });
  });
};

const insertUser = (firstName, lastName, email, hashedPassword) => {
  const insertUserQuery = insertUserSQL;
  const values = [firstName, lastName, email, hashedPassword];

  return new Promise((resolve, reject) => {
    db.query(insertUserQuery, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const logoutUserEmail = (email) => {
  return new Promise((resolve, reject) => {
    const logoutUserQuery = logoutUserSQL;

    db.query(logoutUserQuery, [email], (error) => {
      if (error) {
        console.error("Error during logout:", error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getUserByEmail,
  updateUserLoginStatus,
  checkEmailExists,
  insertUser,
  logoutUserEmail,
};
