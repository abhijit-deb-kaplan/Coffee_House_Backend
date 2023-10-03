require('dotenv').config()
const express = require("express")
const cors = require('cors');

const coffeeRoutes = require('./routes/coffeeHouse')
const userRoutes = require('./routes/user')

// Express app
const app = express()


// Middleware
app.use(cors())
app.use(express.json()); 

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})


// Routes
app.use('/coffeehouse', coffeeRoutes)
app.use('/coffeehouse/user', userRoutes)

// Listen to request
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})