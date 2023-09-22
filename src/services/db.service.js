const fs = require("fs");
const path = require("path");
const db = require("../db/index.json");

const addToDB = async (name, email, message) => {
  const updateMessage = [...db];
  updateMessage.push({ name, email, message });
  await fs.writeFileSync(
    path.join(__dirname, "../db/index.json"),
    JSON.stringify(updateMessage, null, 2)
  );
};

const getAllMessages = async () => {
  try {
    const messages = await fs.readFileSync(
      path.join(__dirname, "../db/index.json"),
      "utf8"
    );
    return JSON.parse(messages);
    // return db;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { addToDB, getAllMessages };
