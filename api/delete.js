const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

const dotenv = require("dotenv");
dotenv.config();

const uri = `mongodb+srv://jv20:${process.env.PASSWORD_MONGODB}@cluster0.ndfhw.mongodb.net/sample_todo?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
  } catch (error) {}
}

const deleteSelectedTodo = async (update, res) => {
  console.log("update DELETE", update);
  try {
    const result = await client
      .db("sample_todo")
      .collection("todos")
      .deleteOne({ _id: ObjectId(update._id) });
    console.log("result are noe", result);
    if (result) {
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

router.delete("/", async (req, res) => {
  console.log("DELETE req.body", req.body);
  try {
    deleteSelectedTodo(req.body, res);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

main();

module.exports = router;
