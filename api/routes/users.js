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

router.post("/register", async function register_user(req, res) {
  
  try{
    const new_user = new User(req.body);
    await new_user.save()
    res.status(200).json({ msg: "user created successfully" });
  }
  catch(error){
    console.log('couldnt register user, error: ', error);
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

export default router;
