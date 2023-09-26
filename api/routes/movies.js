import express from "express";
import Task from "../database/models/taskSchema.js";
var router = express.Router();

router.get("/", async function get_movie(req, res) {
  try {
    let tasks = await Task.find({}).limit(20).exec();
    res.status(200).json({ tasks });
  } catch (err) {
    console.log("error querying database");
    res.status(500);
  }
});

router.get("/:taskId", async function get_movies(req, res) {
  try {
    let task = await Task.findOne({ _id: req.params.taskId });
    res.status(200).json({ task });
  } catch (err) {
    console.log("error querying database");
    res.status(500);
  }
});

export default router;
