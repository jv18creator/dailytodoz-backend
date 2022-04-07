const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://jv20:${process.env.PASSWORD_MONGODB}@cluster0.ndfhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
  } catch (error) {}
}

main();

const fetchAllTodos = async (res) => {
  const result = await client.db("sample_todo").collection("todos").find();
  console.log("result are", result);
  //   res.json({
  //     statu: 200,
  //     message: "Fetched Successfully",
  //     todos: result,
  //   });
};

// GET Todos List and return list | empty

router.get("/", async (req, res) => {
  //   console.log("req are", req.params);
  try {
    fetchAllTodos(res);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
