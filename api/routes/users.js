import express from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/userSchema.js";
import { secret } from "../configs/environement.js";
import passport from "passport";

var router = express.Router();

router.get("/", async function get_users(req, res) {
  try {
    let users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    console.log("error querying database");
    res.status(500);
  }
});

router.post("/register", async function register_user(req, res) {
  try {
    const new_user = new User(req.body);
    await new_user.save();
    res.status(200).json({ msg: "user created successfully" });
  } catch (error) {
    console.log("couldnt register user, error: ", error);
    res.status(500);
  }
});

router.post("/login", async function login_user(req, res) {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ msg: "no such user" });
    }
    if (user.password != req.body.password) {
      return res.status(403).json({ msg: "password is incorrect" });
    }
    console.log("user authenticated correctly");
    let token = jwt.sign({ _id: user._id }, secret);
    res.cookie("token", token, { sameSite: "none", secure: true });
    res.status(200).json({ token, user, msg: "user created successfully" });
  } catch (error) {
    console.log("couldnt login user, error: ", error);
    res.status(500);
  }
});

router.patch("/", async function update_user(req, res) {
  try {
    let users = req.body.users;

    for (let i = 0; i < users.length; i++) {
      let user = await User.findOneAndUpdate({ _id: users[i]._id }, users[i]);
      console.log("updated user: ", user);
    }

    res.status(200);
  } catch (err) {
    console.log("error querying database");
    res.status(500);
  }
});

router.get(
  "/test",
  passport.authenticate("user", { session: false }),
  function (req, res) {
    console.log("got to test");
    console.log(req.user);
    res.status(200).json({ msg: "test success" });
  },
);

router.get(
  "/token",
  passport.authenticate("user", { session: false }),
  async function (req, res) {
    if (req.cookies.token) {
      res.status(200).json({ token: req.cookies.token, user: req.user });
    } else {
      res.status(401).json({ msg: "Invalid token" });
    }
  },
);

router.post(
  "/logout",
  passport.authenticate("user", { session: false }),
  async function (req, res) {
    res.clearCookie("token");
    res.status(200).json({ msg: "logged out" });
  },
);

export default router;
