const express = require("express");
const app = express();
const todos = require("./api/todos");

app.use(express.json({ extended: false }));

app.use("/api/todos", todos);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
