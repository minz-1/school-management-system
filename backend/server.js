const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/schoolDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  class: String,
  attendance: Number
});

const Student = mongoose.model("Student", studentSchema);

// Get Students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Add Student
app.post("/students", async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json({ message: "Student Added", data: newStudent });
});

// Delete Student
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
