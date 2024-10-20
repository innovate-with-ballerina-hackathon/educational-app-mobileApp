import React, { useState, useEffect, useRef } from "react";

// Define the WebSocket URL
const WEBSOCKET_URL = "ws://localhost:9090/chat/student/1/2"; 

const Chat = () => {
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        // Create WebSocket connection.
        ws.current = new WebSocket(WEBSOCKET_URL);

        // Connection opened
        ws.current.onopen = () => {
            console.log("Connected to the WebSocket server");
        };

        // Listen for messages
        ws.current.onmessage = (event) => {
            console.log("Message from server ", event.data);
            setChatLog((prev) => [...prev, event.data]);
        };

        // Handle WebSocket closing
        ws.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

        // Cleanup on component unmount
        return () => {
            ws.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (ws.current && message.trim()) {
            // Send message to the server
            ws.current.send(message);
            setChatLog((prev) => [...prev, "You: " + message]);
            setMessage(""); // Clear the input field
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Chat with Tutor</h2>
            <div
                style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    height: "300px",
                    overflowY: "auto",
                    marginBottom: "20px",
                }}
            >
                {chatLog.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={{ width: "80%", padding: "10px", marginRight: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
                Send
            </button>
        </div>
    );
};

export default Chat;
