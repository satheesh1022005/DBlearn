const Discussion = require("../models/Discussion"); // Import the Discussion model
const Student = require("../models/Student");
const mongoose = require("mongoose");

const createDiscussion = async (req, res) => {
  try {
    const { studentId, title, content, tags } = req.body;

    const question = {
      student: studentId,
      title,
      content,
      createdAt: new Date(),
    };

    const newDiscussion = new Discussion({
      question,
      tags,
    });

    await newDiscussion.save();
    res.status(201).json({
      message: "Question posted successfully",
      discussion: newDiscussion,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to post question", details: error.message });
  }
};

const addAnswer = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { studentId, content } = req.body;

    const answer = {
      student: studentId,
      content,
      createdAt: new Date(),
    };

    const discussion = await Discussion.findById(discussionId);
    if (!discussion)
      return res.status(404).json({ error: "Discussion not found" });

    discussion.question.answers.push(answer);
    discussion.updatedAt = new Date(); // Update timestamp

    await discussion.save();
    res.status(201).json({ message: "Answer added successfully", discussion });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add answer", details: error.message });
  }
};

const vote = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { targetType, targetId, voteType } = req.body; // targetType: 'question' or 'answer', voteType: 'upvote' or 'downvote'

    const discussion = await Discussion.findById(discussionId);
    if (!discussion)
      return res.status(404).json({ error: "Discussion not found" });

    if (targetType === "question") {
      // Upvote or downvote the question
      discussion.question[voteType === "upvote" ? "upvotes" : "downvotes"] += 1;
    } else if (targetType === "answer") {
      // Find the answer and upvote/downvote it
      const answer = discussion.question.answers.id(targetId);
      if (!answer) return res.status(404).json({ error: "Answer not found" });

      answer[voteType === "upvote" ? "upvotes" : "downvotes"] += 1;
    }

    await discussion.save();
    res.json({ message: "Vote updated successfully", discussion });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update vote", details: error.message });
  }
};

const getDiscussion = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const discussions = await Discussion.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }); // Sort by newest

    res.json({ discussions });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch discussions", details: error.message });
  }
};
const getDiscussionById = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const discussion = await Discussion.findById(discussionId).populate(
      "question.student question.answers.student"
    );

    if (!discussion)
      return res.status(404).json({ error: "Discussion not found" });

    res.json({ discussion });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch discussion", details: error.message });
  }
};
module.exports = {
  createDiscussion,
  addAnswer,
  vote,
  getDiscussion,
  getDiscussionById,
};
