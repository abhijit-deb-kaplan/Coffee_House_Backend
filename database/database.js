const mysql = require("mysql2");

// Create a onnection with MySQL
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect(function (error) {
  if (error) {
    console.log("error", error);
  } else {
    console.log("Successfully connected to db");
  }
});

module.exports = db;
