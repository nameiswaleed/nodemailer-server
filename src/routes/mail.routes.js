const express = require("express");
const router = express.Router();
const { addToDB, getAllMessages } = require("../services/db.service");
const { mailSender } = require("../services/nodemailer.service");
const validator = require("validator");
router.get("/", async (req, res) => {
  try {
    const messages = await getAllMessages();
    // console.log(messages);
    res.status(200).json(messages);
  } catch (error) {
    console.log(err.message);
    res.status(404).send(err.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = await req.body;
    if (!validator.isEmail(email)) throw new Error("Invalid email");
    await addToDB(name, email, message);
    await mailSender(name, email, message);
    res.sendStatus(200);
  } catch (err) {
    console.log("[ERR]:", err.message);
    res.status(400).json({ error: err.message, status: 404 });
  }
});

module.exports = router;
