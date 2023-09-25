import express from "express";
import User from "../database/models/userSchema.js";

var router = express.Router();

router.get("/", async function get_users(req, res) {
  try {
    let users = await User.find({});
    console.log(users);
    res.status(200).json({ users });
  } catch (err) {
    console.log("error querying database");
    res.status(500);
  }
});

router.post("/", async function register_user(req, res) {
  console.log("working on register logic... ");
  res.status(200).json({ msg: "user created successfully" });
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

export default router;
