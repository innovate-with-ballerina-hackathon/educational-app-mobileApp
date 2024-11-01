import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";

const Chat = ({ role, tutorId, studentId }) => {
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        const WEBSOCKET_URL = role === "tutor" 
            ? `ws://localhost:9096/chat/tutor/${tutorId}/${studentId}` 
            : `ws://localhost:9096/chat/student/${tutorId}/${studentId}`;

        ws.current = new WebSocket(WEBSOCKET_URL);

        ws.current.onopen = () => {
            console.log("Connected to the WebSocket server");
        };

        ws.current.onmessage = (event) => {
            console.log("Message from server ", event.data);
            setChatLog((prev) => [...prev, event.data]);
        };

        ws.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            ws.current.close();
        };
    }, [role, tutorId, studentId]);

    const sendMessage = () => {
        if (ws.current && message.trim()) {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // Format the message with role, dash, time, and message content
            const formattedMessage = `${role} - ${currentTime}\n${message}`;
            
            // Send only the main message content to the server
            ws.current.send(message);
    
            // Update the chat log with the formatted message
            setChatLog((prev) => [...prev, formattedMessage]);
    
            // Clear the input field
            setMessage("");
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
    <h2>Chat</h2>
    <div className="chat-log-container" style={{ border: "1px solid #ddd", padding: "10px", height: "300px", overflowY: "auto", marginBottom: "20px", whiteSpace: "pre-line" }}>
        {chatLog.map((msg, index) => {
            // Split the message into lines
            const lines = msg.split("\n");

            return lines.map((line, lineIndex) => {
                // Check if the line starts with "student - " to apply bold styling
                if (line.startsWith("student - ")) {
                    return (
                        <div key={`${index}-${lineIndex}`}>
                            <strong>{line}</strong>
                        </div>
                    );
                } else {
                    return <div key={`${index}-${lineIndex}`}>{line}</div>;
                }
            });
        })}
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
