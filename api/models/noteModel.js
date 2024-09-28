import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "this field is required"],
  },
  content: {
    type: String,
    required: [true, "this field is required"],
  },
  tags: {
    type: [String],
    default: [],
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: true,
  },
  createOn: {
    type: Date,
    default: new Date().getTime(),
  },
});
export const Note = mongoose.model("Note", noteSchema);
