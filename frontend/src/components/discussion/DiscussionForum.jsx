import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DiscussionForm.css";
import {
  IconButton,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Dialog, 
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";

const DiscussionForum = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [newAnswer, setNewAnswer] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const studentId = currentUser?._id;

  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (searchQuery) {
      // Split search query into individual words
      const searchWords = searchQuery.toLowerCase().split(" ");

      setFilteredQuestions(
        questions.filter((question) => {
          const title = question.title?.toLowerCase() || ""; // Ensures title is a string
          const content = question.content?.toLowerCase() || ""; // Ensures content is a string

          // Check if all words in the search query are included in the title or content
          const isMatch = searchWords.every((word) => {
            return title.includes(word) || content.includes(word);
          });

          // Log "ok" if the question matches the search query
          if (isMatch) {
            console.log("ok"); // Log "ok" when the condition is met
          }

          return isMatch; // Return whether the question matches
        })
      );
    } else {
      setFilteredQuestions(questions); // If no search query, show all questions
    }
    console.log(filteredQuestions);
  }, [searchQuery, questions]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/discussions?page=1&limit=10"
      );
      setQuestions(response.data.discussions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAddQuestion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/discussions",
        {
          studentId: studentId,
          title: newQuestion.title,
          content: newQuestion.content,
          tags: newQuestion.tags.split(",").map((tag) => tag.trim()),
        }
      );
      setQuestions([response.data.discussion, ...questions]);
      setNewQuestion({ title: "", content: "", tags: "" });
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleVote = async (
    discussionId,
    targetType,
    targetId = null,
    voteType = "upvote"
  ) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/discussions/${discussionId}/vote`,
        {
          targetType,
          targetId,
          voteType,
        }
      );
      fetchQuestions(); // Refresh questions list
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  };

  const openQuestionDialog = (question) => {
    setSelectedQuestion(question);
    setOpenDialog(true);
  };
  // Handle adding an answer
  const handleAddAnswer = async () => {
    if (!selectedQuestion) return;

    try {
      const response = await axios.post(
        `http://localhost:3000/api/discussions/${selectedQuestion._id}/answers`,
        {
          studentId: studentId,
          content: newAnswer,
        }
      );
      setSelectedQuestion(response.data.discussion); // Update selected question with new answer
      setNewAnswer(""); // Clear the answer input field
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedQuestion(null);
  };

  return (
    <div className="discussion-forum">
      <h2>Discussion Forum</h2>
      <TextField
        label="Search Questions"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        style={{ position: "fixed", top: "10px", right: "10px" }}
      >
        New Question
      </Button>

      {/* List of Question Slides */}
      <div
        className="questions-list  "
        style={{ display: "flex", flexDirection: "column", overflowX: "auto" }}
      >
        {questions.map((question) => (
          <>
          <Card
            key={question._id}
            style={{ minWidth: "300px", margin: "0px" }}
            className="question-card bg-light"
          >
            <div className="w-100 ">
            <CardContent>
              <Typography variant="h6">{question.question.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {question.question.content}
                {console.log(question.question.answer)}
              </Typography>
            </CardContent>
            </div>
            <div className="discussion-question  w-100">
            <CardActions>
              <IconButton
                onClick={() =>
                  handleVote(question._id, "question", null, "upvote")
                }
              >
                <ThumbUpIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  handleVote(question._id, "question", null, "downvote")
                }
              >
                <ThumbDownIcon />
              </IconButton>
              <IconButton onClick={() => openQuestionDialog(question)}>
                <CommentIcon />
              </IconButton>
            </CardActions>
            </div>
          </Card>
          {/* <div>
          {question.question.answers?.map((answer) => (
            <div className="discussion-answer">|- {answer.content}</div>
          ))}
        </div> */}
        </>
        ))}
      </div>

      {/* Question Details and Comment Dialog */}
      <Dialog open={openDialog} onClose={closeDialog} fullWidth>
        <DialogTitle>
          {selectedQuestion ? selectedQuestion.question.title : "New Question"}
        </DialogTitle>
        <DialogContent>
          {selectedQuestion ? (
            <>
              <Typography variant="body1">
                {selectedQuestion.question.content}
              </Typography>
              <div style={{ marginTop: "20px" }}>
                <Typography variant="h6">Answers:</Typography>
                {selectedQuestion.question.answers?.map((answer) => (
                  <div key={answer._id} style={{ marginBottom: "10px" }}>
                    <Typography variant="body2">{answer.content}</Typography>
                    <IconButton
                      onClick={() =>
                        handleVote(
                          selectedQuestion._id,
                          "answer",
                          answer._id,
                          "upvote"
                        )
                      }
                    >
                      <ThumbUpIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleVote(
                          selectedQuestion._id,
                          "answer",
                          answer._id,
                          "downvote"
                        )
                      }
                    >
                      <ThumbDownIcon fontSize="small" />
                    </IconButton>
                  </div>
                ))}
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Your Answer"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Title"
                value={newQuestion.title}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, title: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Content"
                multiline
                rows={4}
                value={newQuestion.content}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, content: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Tags (comma separated)"
                value={newQuestion.tags}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, tags: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={selectedQuestion ? handleAddAnswer : handleAddQuestion}
            color="primary"
          >
            {selectedQuestion ? "Add Answer" : "Add Question"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DiscussionForum;
