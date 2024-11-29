'use client';
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io('http://localhost:4000'); // Connect to the WebSocket server

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Listen for messages from the server
        socket.on('message', message => {
            setMessages(prev => [...prev, message]);
        });

        return () => {
            socket.disconnect(); // Clean up the connection
        };
    }, []);

    const sendMessage = () => {
        if (newMessage.trim()) {
            socket.emit('message', newMessage);
            setMessages(prev => [...prev, `You: ${newMessage}`]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, idx) => (
                    <p key={idx}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;

