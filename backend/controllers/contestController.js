const College = require("../models/College");
const Faculty = require("../models/Faculty");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const Challenge = require("../models/Challenge");
const Contest = require("../models/Contest");

exports.getContest = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    const faculty = await Faculty.findById(student.faculty);
    const {type}=req.body;
    res
      .status(201)
      .json({
        message: "User registered successfully!",
        contest: faculty?.contest.filter((c) => c.type === type),
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getChallenge = async (req, res) => {
  try {
    const id = req.params.id;
    const contest = await Contest.findById(id);
    console.log(contest);
    if (contest) {
      const challenges = await Challenge.findById(contest.challenges);
      return res
        .status(201)
        .json({ message: "User registered successfully!", challenges });
    }
    console.log(id);
    res.status(201).json({ message: "User registered successfully!", contest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
