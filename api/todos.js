const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const dotenv = require("dotenv");
dotenv.config();

const uri = `mongodb+srv://jv20:${process.env.PASSWORD_MONGODB}@cluster0.ndfhw.mongodb.net/sample_todo?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
  } catch (error) {}
}

main();

const fetchAllTodos = async (res) => {
  const result = await client
    .db("sample_todo")
    .collection("todos")
    .find({})
    .toArray();
  // make sure to add .toArray() method for getting every document from the collection
  if (result) {
    res.json({
      status: 200,
      message: "Fetched Successfully",
      todos: result,
      success: true,
    });
  } else {
    res.json({
      status: 200,
      message: "Fetched Successfully",
      todos: result,
      success: false,
    });
  }
};

const insertTodo = async (todo, res) => {
  const result = await client
    .db("sample_todo")
    .collection("todos")
    .insertOne(todo);
  if (result) {
    res.json({
      status: 200,
      message: "Updated Successfully",
      success: true,
    });
  } else {
    res.json({
      status: 200,
      message: "Updated Successfully",
      success: false,
    });
  }
};

router.get("/", async (req, res) => {
  //   console.log("req are", req.params);
  try {
    fetchAllTodos(res);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

router.get("/add", async (req, res) => {
  // console.log("req are", req.body);
  try {
    if (req.body) {
      insertTodo(req.body, res);
    }
  } catch (error) {}
});

module.exports = router;
