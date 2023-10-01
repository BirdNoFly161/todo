import express from "express";
import jwt from 'jsonwebtoken';
import User from "../database/models/userSchema.js";
import { secret } from "../configs/environement.js";

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

router.post("/login", async function login_user(req, res) {
  
  try{
    console.log('got login request with data: ', req.body);
    let user = await User.findOne({username: req.body.username});
    console.log('user: ', user);
    if(user.password != req.body.password){
      return res.status(403).json({msg: "password is incorrect"});
    }
    console.log('user authenticated correctly');
    let token = jwt.sign({_id: user._id}, secret)
    res.cookie('token', token);
    res.status(200).json({ token, user, msg: "user created successfully" });
  }
  catch(error){
    console.log('couldnt login user, error: ', error);
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
