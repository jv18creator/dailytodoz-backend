const express = require("express");
const router = express.Router();

// GET Todos List and return list | empty

router.get("/", async (req, res) => {
  try {
    res.json({
      statu: 200,
      message: "Fetched Successfully",
    });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
