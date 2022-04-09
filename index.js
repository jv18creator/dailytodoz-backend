const express = require("express");
const app = express();
const todos = require("./api/todos");
const updateTodos = require("./api/update");
const deleteTodo = require("./api/delete");

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json({ extended: false }));

app.use("/api/todos", todos);
app.use("/api/todos/update", updateTodos);
app.use("/api/todos/delete", deleteTodo);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
