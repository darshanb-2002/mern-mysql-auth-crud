const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name,email,phone,password) VALUES (?,?,?,?)",
      [name, email, phone, hashed]
    );

    res.send("User Registered");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (user.length === 0) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) return res.send("Wrong password");

    const token = jwt.sign(
      { id: user[0].id },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};