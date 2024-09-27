const express = require("express");
const router = express.Router();

const {
  addTodo,
  getTodos,
  editTodo,
  removeTodo,
} = require("../controllers/todo.controller");

const { authmiddlewear } = require("../middlewears/auth.middlewear");

router.get("/get", authmiddlewear, getTodos);
router.post("/add", authmiddlewear, addTodo);
router.put("/get/:id", authmiddlewear, editTodo);
router.delete("/del/:id", authmiddlewear, removeTodo);

module.exports = router;
