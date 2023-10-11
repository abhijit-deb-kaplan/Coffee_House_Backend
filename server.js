require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/route");

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/v1/coffeehouse", router);

// Listen to request
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
