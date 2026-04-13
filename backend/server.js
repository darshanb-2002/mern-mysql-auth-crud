const express = require("express");
const itemRoutes = require("./routes/itemRoutes");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});