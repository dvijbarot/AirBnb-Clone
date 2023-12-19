const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.json());

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "eyJhbGciOiJIUz";

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("success");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json("passOk");
          }
        );
      } else {
        res.status(422).json("pass not found");
      }
    }
  } catch (e) {
    res.status(404).json("Not executed");
  }
});
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});