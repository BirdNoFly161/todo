import mongoose from "mongoose";

const { Schema } = mongoose;

const FolderSchema = new Schema({
  title: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  description: String,
});

const Folder = mongoose.model("Folder", FolderSchema);
export default Folder;
