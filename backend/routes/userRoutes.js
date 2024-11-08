const express = require("express");
const {
  register,
  login,
  createFaculty,
  createStudent,
  assignTasks,
  viewTasks,
} = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");
const {
  getContest,
  getChallenge,
} = require("../controllers/contestController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/createFaculty", auth, createFaculty);
router.post("/createStudent", auth, createStudent);
router.post("/assignTask", auth, assignTasks);
router.get("/getAll", auth, viewTasks);
router.get("/getContest", auth, getContest);
router.get("/getChallenge/:id", getChallenge);

module.exports = router;
