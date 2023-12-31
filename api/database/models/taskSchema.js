import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  type: String,
  started: Date,
  deadline: Date,
  people: [String],
  description: String,
  status: {
    type: String,
    enum: ["completed", "inProgress", "uncompleted"],
  },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
