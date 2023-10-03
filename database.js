const mysql = require('mysql2')

// Create a onnection with MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Kaplan@1999', 
    database: 'coffee_house', 
})

db.connect(function (error){
    if (error){
        console.log("error", error)
    }
    else{
        console.log("Successfully connected to db")
    }
})


module.exports = db;