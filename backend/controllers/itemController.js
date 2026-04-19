const db = require("../config/db");

// CREATE ITEM
exports.createItem = async (req, res) => {
  try {
    const { title, description } = req.body;

    await db.query(
      "INSERT INTO items (user_id,title,description) VALUES (?,?,?)",
      [req.user.id, title, description]
    );

    res.send("Item created");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// GET ALL ITEMS
exports.getItems = async (req, res) => {
  try {
    const [items] = await db.query(
      "SELECT * FROM items WHERE user_id = ?",
      [req.user.id]
    );

    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// GET SINGLE ITEM
exports.getItem = async (req, res) => {
  try {
    const [item] = await db.query(
      "SELECT * FROM items WHERE id=? AND user_id=?",
      [req.params.id, req.user.id]
    );

    res.json(item[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// UPDATE ITEM
exports.updateItem = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    await db.query(
      "UPDATE items SET title=?, description=?, status=? WHERE id=? AND user_id=?",
      [title, description, status, req.params.id, req.user.id]
    );

    res.send("Item updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// DELETE ITEM
exports.deleteItem = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM items WHERE id=? AND user_id=?",
      [req.params.id, req.user.id]
    );

    res.send("Item deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// GET STATS
exports.getStats = async (req, res) => {
  try {
    const [stats] = await db.query(
      `SELECT 
        COUNT(*) as total,
        SUM(status='active') as active,
        SUM(status='pending') as pending,
        SUM(status='completed') as completed
       FROM items WHERE user_id=?`,
      [req.user.id]
    );

    res.json(stats[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};