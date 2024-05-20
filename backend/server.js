require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//
const PORT = process.env.PORT || 5000;
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/todo";

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.json({ message: "Api running successfully" });
});

app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
