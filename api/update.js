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

const updateSelectedTodo = async (res, update) => {
  try {
    const result = await client
      .db("sample_todo")
      .collection("todos")
      .updateOne(
        { _id: ObjectId(update._id) },
        {
          $set: {
            description: update.description,
          },
        }
      );

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

router.post("/", async (req, res) => {
  try {
    updateSelectedTodo(res, req.body);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

main();

module.exports = router;
