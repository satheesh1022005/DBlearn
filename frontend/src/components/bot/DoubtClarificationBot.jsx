import React, { useState } from "react";
import styled from "styled-components";
import { FaRobot, FaUser } from "react-icons/fa";
import axios from "axios";

// Styled Components (same as before)

const BotContainer = styled.div`
  width: 400px;
  height: 500px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 999;
`;

const Header = styled.div`
  background-color:rgba(0, 94, 255, 0.82);
  color: white;
  padding: 15px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 80%;
  margin-bottom: 10px;

  &.user {
    align-self: flex-end;
    flex-direction: row-reverse;
  }

  &.bot {
    align-self: flex-start;
    flex-direction: row;
  }
`;

const MessageText = styled.div`
  background-color: ${(props) => (props.isUser ? "#e1f5fe" : "#f1f1f1")};
  color: ${(props) => (props.isUser ? "#000" : "#333")};
  padding: 10px 15px;
  border-radius: 12px;
  font-size: 14px;
  max-width: 80%;
  word-wrap: break-word;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const UserAvatar = styled(FaUser)`
  font-size: 24px;
  color:rgb(0, 141, 241);
`;

const BotAvatar = styled(FaRobot)`
  font-size: 24px;
  color: #2196f3;
`;

const InputContainer = styled.div`
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  resize: none;
  min-height: 60px;
`;

const Button = styled.button`
  padding: 10px;
  background-color:rgb(0, 128, 255);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color:rgb(0, 110, 255);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const DoubtClarificationBot = ({ setShowBot }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    setMessages([...messages, { text: message, isUser: true }]);
    setLoading(true);
    setMessage("");

    try {
      // Send user message to the backend
      const response = await axios.post("http://localhost:5000/process", {
        query: message,
        type: "doubt_clarification",
      });

      // Handle bot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: response.data.output || "Sorry, I could not find an answer.",
          isUser: false,
        },
      ]);
    } catch (err) {
      // Handle error if the API fails
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error communicating with the server.", isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BotContainer>
      <Header>
        <span>Doubt Clarification Bot</span>
        <button
          style={{ background: "transparent", border: "none", color: "white" }}
          onClick={() => setShowBot((prev) => !prev)}
        >
          X
        </button>
      </Header>

      <ChatContainer>
        {messages.map((msg, index) => (
          <Message key={index} className={msg.isUser ? "user" : "bot"}>
            {msg.isUser ? <UserAvatar /> : <BotAvatar />}
            <MessageText isUser={msg.isUser}>{msg.text}</MessageText>
          </Message>
        ))}
      </ChatContainer>

      <InputContainer>
        <Textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Ask your question..."
        />
        <Button type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? "Thinking..." : "Send"}
        </Button>
      </InputContainer>
    </BotContainer>
  );
};

export default DoubtClarificationBot;
