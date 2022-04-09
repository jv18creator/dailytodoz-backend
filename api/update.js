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

const updateSelectedTodo = async (res, update) => {
  try {
    console.log("update is", update._id);
    const findDoc = await client
      .db("sample_todo")
      .collection("todos")
      .findOne({ description: update.description });
    console.log("found here", findDoc);
    const result = await client
      .db("sample_todo")
      .collection("todos")
      .updateOne({ description: update.description }, { $set: update });
    // const result = await client
    //   .db("sample_todo")
    //   .collection("todos")
    //   .updateOne({ description: update.description }, { $set: update });
    console.log("UPDATE result are", result);
    if (result) {
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {}
};

router.get("/", async (req, res) => {
  console.log("req.body", req.body);
  try {
    updateSelectedTodo(res, req.body);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

main();

module.exports = router;
