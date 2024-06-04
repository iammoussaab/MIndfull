import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatRoom = () => {
    const [roomId, setRoomId] = useState(""); // State to store chat room ID
    const [messages, setMessages] = useState([]); // State to store messages
    const [messageInput, setMessageInput] = useState(""); // State to store input message
    const [doctors, setDoctors] = useState([]); // State to store doctors
    const [selectedDoctor, setSelectedDoctor] = useState(""); // State to store selected doctor

    useEffect(() => {
        // Fetch doctors when component mounts
        getDoctors();
    }, []);

    useEffect(() => {
        // Fetch chat messages when roomId changes
        if (roomId) {
            getChatMessages();
        }
    }, [roomId]);

    const getChatMessages = async () => {
        try {
            const response = await axios.get(`/chatroom/${roomId}/messages`);
            setMessages(response.data.messages);
        } catch (error) {
            console.error("Error fetching chat messages:", error);
        }
    };

    const sendMessage = async () => {
        try {
            await axios.post(`/chatroom/${roomId}/send`, {
                sender: "currentUserId", // Replace currentUserId with actual user ID
                message: messageInput,
            });
            setMessageInput(""); // Clear input field after sending message
            getChatMessages(); // Fetch updated messages after sending message
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const getDoctors = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/user/doctors");
            setDoctors(response.data.doctors);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const createRoom = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/chat/chatroom/create", {
                doctorId: selectedDoctor,
            });
            setRoomId(response.data.roomId);
        } catch (error) {
            console.error("Error creating room:", error);
        }
    };

    return (
        <div className="container form-component login-form">
            <h1>Chat Room</h1>
            <div>
                {messages && messages.map((message) => (
                    <div key={message._id}>
                        <p>{message.sender}</p>
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>
            <select onChange={(e) => setSelectedDoctor(e.target.value)}>
                <option value="">Select a Doctor</option>
                {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}> ajks{doctor.name}</option>
                ))}
            </select><br />
            <button onClick={createRoom}>Create Room</button>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;
