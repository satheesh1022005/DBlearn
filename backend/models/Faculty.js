const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  role: { type: String, default: "faculty" },
  password: { type: String },
  college: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
  maxStudentAccounts: { type: Number }, // Limit on student accounts
  contest: [
    {
      id: { type: String },
      name: { type: String },
      type: { type: String },
      description: { type: String },
    },
  ],
  tasks: [
    {
      id: { type: String },
      title: { type: String },
      description: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Reference to student accounts
  createdAt: { type: Date, default: Date.now },
});

// Export the College model
module.exports = mongoose.model("Faculty", facultySchema);
