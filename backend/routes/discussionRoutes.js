const express = require("express");
const router = express.Router();
const {
  createDiscussion,
  addAnswer,
  vote,
  getDiscussion,
  getDiscussionById,
} = require("../controllers/discussionController");
// POST /api/discussions
// Route to create a new question in the discussion forum
router.post("/discussions", createDiscussion);

// POST /api/discussions/:discussionId/answers
// Route to add an answer to a specific question
router.post("/discussions/:discussionId/answers", addAnswer);
// PATCH /api/discussions/:discussionId/vote
// Route to upvote/downvote a question or answer
router.patch("/discussions/:discussionId/vote", vote);
// GET /api/discussions
// Route to get all discussions with pagination
router.get("/discussions", getDiscussion);
// GET /api/discussions/:discussionId
// Route to get a specific discussion with all answers
router.get("/discussions/:discussionId", getDiscussionById);

module.exports = router;
