import express from "express";
import passport from 'passport';
import Task from "../database/models/taskSchema.js";
var router = express.Router();

router.get("/", async function get_task(req, res) {
  try {
    let tasks = await Task.find({}).limit(20).exec();
    res.status(200).json({ tasks });
  } catch (err) {
    console.log("error querying database");
    res.status(500);
  }
});

router.get("/:taskId", async function get_tasks(req, res) {
  try {
    let task = await Task.findOne({ _id: req.params.taskId });
    res.status(200).json({ task });
  } catch (err) {
    console.log("error querying database");
    res.status(500);
  }
});

router.post('/search', passport.authenticate('user', {session: false}), async function (req, res){
  let query = {};
  console.log('got search: ', req.body.user)
  if(req.body.user){
    let user = req.body.user;
    query.people={$in: [user._id]}
  }
  console.log('query: ', query)

  let tasks = await Task.find(query);
  console.log('found tasks', tasks)
  res.status(200).json({tasks});

});

export default router;