const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

dotenv.config();
const connexionString = process.env.DB_CONNEXION_STRING;
mongoose
  .connect(connexionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connexion : Success"))
  .catch(() => console.log("Database Connexion : Failed"));

app.use(express.json());

app.use(cors());

app.use("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
