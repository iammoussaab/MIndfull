import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const ChatMessages = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      style={{ maxHeight: "300px", overflowY: "scroll", marginBottom: "10px" }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            textAlign: msg.fromSelf ? "right" : "left",
            margin: "5px",
            display: "flex",
            flexDirection: msg.fromSelf ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <span
            style={{
              backgroundColor: msg.fromSelf ? "#DCF8C6" : "#EAEAEA",
              padding: "5px 10px",
              borderRadius: "10px",
              maxWidth: "60%",
              wordWrap: "break-word",
            }}
          >
            {msg.message}
          </span>
          <small style={{ margin: "0 5px", color: "#888" }}>
            {new Date(msg.timestamp).toLocaleTimeString()}
          </small>
        </div>
      ))}
      {isTyping && <div>Typing...</div>}
      <div ref={messagesEndRef} />
    </div>
  );
};

ChatMessages.propTypes = {
  messages: PropTypes.array.isRequired,
  isTyping: PropTypes.bool.isRequired,
};

export default ChatMessages;
