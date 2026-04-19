const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  getStats
} = require("../controllers/itemController");

const auth = require("../middleware/auth");

// ⚠️ ORDER IS IMPORTANT
router.get("/stats", auth, getStats);   // FIRST
router.get("/", auth, getItems);
router.get("/:id", auth, getItem);
router.post("/", auth, createItem);
router.put("/:id", auth, updateItem);
router.delete("/:id", auth, deleteItem);

module.exports = router;