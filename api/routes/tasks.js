import express from "express";
import passport from "passport";
import Task from "../database/models/taskSchema.js";
import Folder from "../database/models/FolderSchema.js";

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
    let task = await Task.findOne({ _id: req.params.taskId }).populate(
      "people",
    );
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
    if (req.body.folder) {
      query.folder = req.body.folder;
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
    console.log("got task update req with body: ", req.body);

    try {
      let task = await Task.findOne({ _id: req.params.id });
      console.log(task);
      if (req.body.status) {
        task.status = req.body.status;
      }
      if (req.body.people) {
        task.people = req.body.people;
      }
      console.log(task);
      await task.save();

      task = await Task.findOne({ _id: task._id }).populate("people");
      return res.status(200).json({
        msg: `task updated successfully to: ${req.body.status}`,
        task,
      });
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

router.post(
  "/folder",
  passport.authenticate("user", { session: false }),
  async function (req, res) {
    console.log("got request to create new folder with data: ", req.body);
    try {
      let folder = {};
      if (req.body.title) {
        folder.title = req.body.title;
      }
      if (req.body.tasks) {
        folder.tasks = req.body.tasks;
      } else {
        folder.tasks = [];
      }

      let new_folder = new Folder(folder);
      await new_folder.save();
      return res.status(200).json({ msg: "Folder created successfuly" });
    } catch (error) {
      return res.status(500).json({ msg: "server error" });
    }
  },
);

router.put(
  "/folder",
  passport.authenticate("user", { session: false }),
  async function (req, res) {
    console.log("got request to add task to folder with data: ", req.body);
    try {
      //TODO
      return res.status(200).json({ msg: "Folder created successfuly" });
    } catch (error) {
      return res.status(500).json({ msg: "server error" });
    }
  },
);

export default router;
