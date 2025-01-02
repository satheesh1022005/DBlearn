const express = require("express");
const router = express.Router();
const Contest = require("../models/Contest");
const { auth } = require("../middleware/authMiddleware");
const Faculty = require("../models/Faculty");
router.post("/create", auth, async (req, res) => {
  try {
    const { contestName, description, startTime, endTime,type } = req.body;

    // Create a new contest
    const newContest = new Contest({
      type,
      contestName,
      description,
      startTime,
      challenges: "",
      endTime,
    });
    // Find the faculty document
    const faculty = await Faculty.findById(req.user.id);
    console.log(faculty);
    // Push the new contest into the faculty's contests array
    faculty.contest.push({
      id: newContest._id,
      name: contestName,
      type:type,
      description,
    });

    // Save the faculty document after updating the contests array
    await faculty.save();

    // Save the new contest
    const savedContest = await newContest.save();

    // Send a response with the contestId and faculty data
    return res.status(201).json({
      contestId: savedContest._id,
      message: "Contest created successfully",
      newContest,
      faculty, // Return the updated faculty with the new contest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating contest", error });
  }
});

module.exports = router;
