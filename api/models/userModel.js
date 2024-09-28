import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    unique: [true, "this user name is exists "],
    required: [true, "user name  can't be empty"],
  },
  email: {
    type: String,
    unique: [true, "this email is already in use in this site "],
    required: [true, "email can't be empty"],
  },
  password: {
    type: String,
    required: [true, "password can't be empty"],
    min: [8, "password must have length at least 8 "],
  },
  createOn: {
    type: Date,
    default: new Date().getTime(),
  },
});
export const User = mongoose.model("User", userSchema);
