const mongoose = require("mongoose");

// Answer Schema to be embedded in Discussion Schema
const answerSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }, // Refers to the student answering
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

// Question Schema within Discussion Schema
const questionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }, // Refers to the student asking
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  answers: [answerSchema], // Array of answers
});

// Main Discussion Schema
const discussionSchema = new mongoose.Schema({
  question: questionSchema,
  tags: [{ type: String }], // Tags for categorization (e.g., "SQL", "Joins", "Indexing")
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Discussion", discussionSchema);
