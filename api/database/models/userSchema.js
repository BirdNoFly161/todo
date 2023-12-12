import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  image: String,
  description: String,
  folders: { type: [String], default: ["My folder"] },
});

const User = mongoose.model("User", UserSchema);
export default User;
