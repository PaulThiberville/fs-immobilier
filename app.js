const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//Routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const imageRoutes = require("./routes/image");

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

// enable CORS
app.use(cors());

//API routes
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/image", imageRoutes);

module.exports = app;
