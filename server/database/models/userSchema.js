const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const {Schema} = mongoose;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    description: String,
});

const User = mongoose.model("User", UserSchema)
module.exports = User;