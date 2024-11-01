import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
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
            const formattedMessage = `${role} - ${currentTime}\n${message}`;
            ws.current.send(message);
            setChatLog((prev) => [...prev, formattedMessage]);
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
        <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5" style={{ marginBottom: "20px", textAlign: "center", color: '#3f51b5' }}>
                Chat
            </Typography>
            <Box 
                style={{
                    border: "1px solid #ddd", 
                    padding: "10px", 
                    height: "300px", 
                    overflowY: "auto", 
                    marginBottom: "20px", 
                    whiteSpace: "pre-line", 
                    backgroundColor: '#ffffff',
                    borderRadius: "8px",
                }}
            >
                {chatLog.map((msg, index) => {
                    const lines = msg.split("\n");
                    return lines.map((line, lineIndex) => (
                        <Typography 
                            key={`${index}-${lineIndex}`} 
                            variant="body1" 
                            style={{
                                fontWeight: line.startsWith("student - ") || line.startsWith("tutor - ") || line.startsWith("Previous") ? 'bold': 'normal',
                                color: line.startsWith("student - ") ? '#f44336' : line.startsWith("tutor - ") ? '#4caf50' : '#000',
                            }}
                        >
                            {line}
                        </Typography>
                    ));
                })}
            </Box>
            <TextField
                variant="outlined"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                fullWidth
                style={{ marginBottom: "10px" }}
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={sendMessage}
                style={{ width: "100%" }}
            >
                Send
            </Button>
        </Paper>
    );
};

export default Chat;
