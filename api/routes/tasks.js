import express from "express";
import passport from "passport";
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

router.post(
  "/search",
  passport.authenticate("user", { session: false }),
  async function (req, res) {
    let query = {};
    console.log("got search: ", req.body.user);
    if (req.body.user) {
      let user = req.body.user;
      query.people = { $in: [user._id] };
    }
    console.log("query: ", query);

    let tasks = await Task.find(query);
    console.log("found tasks", tasks);
    res.status(200).json({ tasks });
  },
);

router.post(
  "/",
  passport.authenticate("user", { session: false }),
  async function (req, res) {
    console.log("got task creation req with body: ", req.body.task);
    try {
      if (req.body.task) {
        let task = new Task(req.body.task);
        await task.save();
        return res.status(200).json({ msg: "created  task successfully" });
      }
      return res.status(300).json({ msg: "bad task creation request" });
    } catch (error) {
      return res.status(500).json({ msg: "server error" });
    }
  },
);

router.put(
  "/:id",
  passport.authenticate("user", { session: false }),
  async function (req, res) {
    console.log("got task update req with body: ", req.body.status);

    try {
      let task = await Task.findOne({ _id: req.params.id });
      console.log(task);
      task.status = req.body.status;
      console.log(task);
      await task.save();
      return res
        .status(200)
        .json({ msg: `task updated successfully to: ${req.body.status}` });
    } catch (error) {
      return res.status(500).json({ msg: "server error" });
    }
  },
);

router.delete(
  "/:id",
  passport.authenticate("user", { session: false }),
  async function (req, res) {
    console.log("got task delete req");

    try {
      await Task.deleteOne({ _id: req.params.id });
      return res.status(200).json({ msg: "task deleted successfully" });
    } catch (error) {
      return res.status(500).json({ msg: "server error" });
    }
  },
);
export default router;
