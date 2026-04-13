const db = require("../config/db");

// CREATE ITEM
exports.createItem = async (req, res) => {
  const { title, description } = req.body;

  await db.query(
    "INSERT INTO items (user_id,title,description) VALUES (?,?,?)",
    [1, title, description] // temporary user_id
  );

  res.send("Item created");
};

// GET ALL ITEMS
exports.getItems = async (req, res) => {
  const [items] = await db.query("SELECT * FROM items");
  res.json(items);
};