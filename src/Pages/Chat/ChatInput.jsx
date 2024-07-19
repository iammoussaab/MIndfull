import React, { useState } from "react";

const ChatInput = ({ sendMessage, onTyping }) => {
  const [messageInput, setMessageInput] = useState("");

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
    if (onTyping) {
      onTyping();
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      sendMessage(messageInput);
      setMessageInput("");
    }
  };

  return (
    <div>
      Send Message:
      <input
        type="text"
        value={messageInput}
        onChange={handleInputChange}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;
