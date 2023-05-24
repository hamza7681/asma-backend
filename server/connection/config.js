const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const connection = async () => {
  await mongoose
    .connect(DB_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((e) => console.log("Connection Failed", e));
};

module.exports = connection;
