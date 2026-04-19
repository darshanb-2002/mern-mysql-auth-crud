const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // validate input
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // check duplicate email
    const [existing] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // insert user
    await db.query(
      "INSERT INTO users (name,email,phone,password) VALUES (?,?,?,?)",
      [name, email, phone, hashed]
    );

    return res.status(201).json({ message: "User Registered Successfully" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};


/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const [user] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};


/* ================= GET USER ================= */
exports.getMe = async (req, res) => {
  try {
    const [user] = await db.query(
      "SELECT id,name,email FROM users WHERE id=?",
      [req.user.id]
    );

    res.json(user[0]);

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};


/* ================= FORGOT PASSWORD ================= */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [user] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await db.query(
      "UPDATE users SET reset_token=?, reset_token_expiry=DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email=?",
      [token, email]
    );

    res.json({
      message: "Reset token generated",
      token
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};


/* ================= RESET PASSWORD ================= */
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const [user] = await db.query(
      "SELECT * FROM users WHERE reset_token=? AND reset_token_expiry > NOW()",
      [token]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET password=?, reset_token=NULL, reset_token_expiry=NULL WHERE id=?",
      [hashed, user[0].id]
    );

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};