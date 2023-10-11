const db = require("../database/database");
const { getAllMenuSQL } = require("../database/sqlQuery");

const coffeeMenuService = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const sql = `${getAllMenuSQL} LIMIT ${pageSize} OFFSET ${offset}`;

    const data = await query(sql);
    return data;
  } catch (error) {
    throw new Error("Internal Service Error");
  }
};

const query = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { coffeeMenuService };
