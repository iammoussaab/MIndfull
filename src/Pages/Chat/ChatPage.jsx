import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Context } from "../../main";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ContactList from "./ContactList";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useContext(Context);

  useEffect(() => {
    if (!user._id) return;

    const newSocket = io("http://localhost:5000", {
      query: { userId: user._id },
    });

    setSocket(newSocket);

    newSocket.on("msg-recieve", (message) => {
      console.log("Message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("typing", (typingStatus) => {
      setIsTyping(typingStatus);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/patient",
          {
            withCredentials: true,
          }
        );
        console.log("Fetched contacts:", response.data);
        setContacts(response.data.patient);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const sendMessage = (message) => {
    if (socket && selectedContact) {
      const newMessage = { from: user._id, to: selectedContact, message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("Sending message:", newMessage);
      socket.emit("send-msg", newMessage);
    }
  };

  const handleTyping = () => {
    if (socket && selectedContact) {
      socket.emit("typing", true);
    }
  };

  return (
    <div className="container form-component login-form">
      <ContactList
        contacts={contacts}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
      />
      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput sendMessage={sendMessage} onTyping={handleTyping} />
    </div>
  );
};

export default ChatPage;
