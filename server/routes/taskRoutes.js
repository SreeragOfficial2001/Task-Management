const express = require("express");
const { getTasks, addTask } = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", auth, getTasks);
router.post("/", auth, addTask);

module.exports = router;
