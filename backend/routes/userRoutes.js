const express = require("express");
const {
  register,
  login,
  createFaculty,
  createStudent,
  assignTasks,
  viewTasks,
  setStudentInfo,
  setTaskSubmitted,
  getMe,
  getStudentTasks,
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
router.post("/getContest", auth, getContest);
router.post("/setTaskCompleted", auth,setTaskSubmitted);
router.get("/getChallenge/:id", getChallenge);
router.get("/me",auth,getMe);
router.post("/setInfo", auth, setStudentInfo);
router.post("/getStudentTask",getStudentTasks);

module.exports = router;
