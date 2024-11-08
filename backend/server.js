const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const contestRoutes = require("./routes/contest");
const challengeRoutes = require("./routes/challenge");
const InterviewRoutes = require("./routes/InterviewRoutes");
const uploadExcelRoutes = require("./routes/uploadExcel");
const discussionRoutes = require("./routes/discussionRoutes");
const dbConnect = require("./database/database");
dbConnect();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/contest", contestRoutes);
app.use("/api/challenge", challengeRoutes);
app.use("/api", uploadExcelRoutes);
app.use("/api", userRoutes);
app.use("/task", taskRoutes);
app.use("/api/", InterviewRoutes);
app.use("/api/", discussionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
