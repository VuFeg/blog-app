const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/user.model.js");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://admin:mq9VZKP4ePKvv85e@cluster0.qmx88.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// register a user
const salt = bcrypt.genSaltSync(10);

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(200).json(userDoc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// login a user
const secret = "asdshdiaosdkncsohioasdho";

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const check = bcrypt.compareSync(password, userDoc.password);

    if (check) {
      jwt.sign({ username, id: userDoc._id }, secret, (err, token) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.cookie("token", token).json({ message: "Login success", token });
        }
      });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
