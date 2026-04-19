const express = require("express");
const itemRoutes = require("./routes/itemRoutes");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// error handler (LAST)
app.use(errorHandler);

// start server
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});