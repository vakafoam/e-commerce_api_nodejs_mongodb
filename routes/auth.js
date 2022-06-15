const router = require("express").Router();
const CryptoJs = require("crypto-js");

const User = require("../models/User");

// REGISTER
router.post("/register", async (req, resp) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    resp.status(201).json(user);
  } catch (e) {
    resp.status(500).json(e);
  }
});

// LOGIN
router.post("/login", async (req, resp) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      resp.status(401).json("Username not found");
    }
    const hashedPass = CryptoJs.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const pass = hashedPass.toString(CryptoJs.enc.Utf8);
    if (pass !== req.body.password) {
      resp.status(401).json("Wrong password");
    } else {
      const { password, ...others } = user._doc; // MongoDB object specifics _doc
      resp.status(200).json(others);
    }
  } catch (e) {
    resp.status(500).json(e);
  }
});

module.exports = router;
