import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  type: String,
  started: Date,
  deadline: Date,
  people: [{ type: Schema.Types.ObjectId, ref: "User" }],
  description: String,
  folder: String,
  status: {
    type: String,
    enum: ["Completed", "In progress", "Uncompleted"],
  },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
