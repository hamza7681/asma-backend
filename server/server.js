require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const connection = require("./connection/config");

connection()

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "Hello Server" });
});

app.use(require("./routes/router"));

app.listen(port, () => {
  console.log("Server is running on port", port);
});
