import React, { useEffect, useState } from "react";
import { Paper, Typography, List, ListItem, ListItemAvatar, ListItemText, CircularProgress } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person'; // Importing a Material UI icon
import "./ChatList.css"; // Import CSS file for any additional styling

const ChatList = ({ role, id, onParticipantSelect }) => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParticipants = async () => {
            let url;
            if (role === "tutor") {
                url = `http://localhost:9091/users/tutor/${id}/students`; // Fetch students for the tutor
            } else if (role === "student") {
                url = `http://localhost:9091/users/student/${id}/tutors`; // Fetch tutors for the student
            } else {
                setError("Invalid role");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setParticipants(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipants();
    }, [role, id]);

    if (loading) {
        return (
            <div className="loading" style={{ textAlign: "center", marginTop: "20px" }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5" style={{ marginBottom: "20px", textAlign: "center", color: '#3f51b5' }}>
                {role === "tutor" ? "Students Assigned" : "Tutors Available"}
            </Typography>
            <List>
                {participants.map((participant) => (
                    <ListItem 
                        key={role === "tutor" ? participant.studentId : participant.tutorId} 
                        button
                        onClick={() => onParticipantSelect(participant)}
                        style={{ backgroundColor: '#ffffff', marginBottom: '10px', borderRadius: '8px' }}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon /> {/* Using Material UI icon as avatar */}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant="h6">{participant.firstName || "N/A"}</Typography>}
                            secondary={<Typography variant="body2" color="textSecondary">{role === "tutor" ? "Student" : "Tutor"}</Typography>}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ChatList;
