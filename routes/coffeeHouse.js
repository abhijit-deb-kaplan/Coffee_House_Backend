const express = require("express")
const mysql = require('mysql2')
const db = require('../database'); // Adjust the path accordingly


const router = express.Router()


// Get all the coffee menu
router.get('/menu', (req, res) => {
    const sql = "SELECT * FROM MENU"
    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error querying the database: ", err);
        }
        console.log("Data retrieved successfully:", data);
        return res.json(data);
    });
});



module.exports = router