// src/ChatList.js

import React, { useEffect, useState } from "react";

const ChatList = ({ role, id, onParticipantSelect }) => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParticipants = async () => {
            let url;
            if (role === "teacher") {
                url = `http://localhost:8090/chat/teacher/${id}`; // Fetch students for the teacher
            } else if (role === "student") {
                url = `http://localhost:8090/chat/student/${id}`; // Fetch teachers for the student
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>{role === "teacher" ? "Students Assigned" : "Teachers Available"} for ID: {id}</h2>
            <ul>
                {participants.map((participant) => (
                    <li key={participant.student_id} onClick={() => onParticipantSelect(participant)}>
                        {role === "teacher" 
                          ? `Student ID: ${participant.student_id}, Status: ${participant.booking_status}` 
                          : `Teacher ID: ${participant.tutor_id}, Status: ${participant.booking_status}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
