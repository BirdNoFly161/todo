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
});

const User = mongoose.model("User", UserSchema);
export default User;
