import express from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/userSchema.js";
import { secret, BLOB_READ_WRITE_TOKEN } from "../configs/environement.js";
import passport from "passport";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { put } from "@vercel/blob";
import { MULTER_UPLOAD } from "../configs/environement.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const upload = multer({ dest: MULTER_UPLOAD });

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

router.post(
  "/register",
  upload.single("profile"),
  async function register_user(req, res) {
    try {
      const new_user = new User(req.body);
      console.log("sign up body : ", req.body);
      console.log("parsed file: ", req.file);

      if (req.file) {
        const { url } = await put(
          "user/image",
          fs.readFileSync(path.join("temp/", req.file.filename)),
          { access: "public", token: BLOB_READ_WRITE_TOKEN },
        );

        new_user.image = url;
      }

      await new_user.save();
      res.status(200).json({ msg: "user created successfully" });
    } catch (error) {
      console.log("couldnt register user, error: ", error);
      res.status(500);
    }
  },
);

router.post("/login", async function login_user(req, res) {
  try {
    let user = await User.findOne({ username: req.body.username });
    console.log("get user query returned: ", req.body);
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

router.post(
  "/search",
  passport.authenticate("user", { session: false }),
  async function (req, res) {
    let query = {};

    if (req.body.keyword) {
      query.username = { $regex: req.body.keyword, $options: "i" };
    }
    console.log("query: ", query);

    let users = await User.find(query);
    console.log("found users", users);
    res.status(200).json({ users });
  },
);

export default router;
