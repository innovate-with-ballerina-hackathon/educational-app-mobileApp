// // src/ChatList.js

// import React, { useEffect, useState } from "react";

// const ChatList = ({ role, id, onParticipantSelect }) => {
//     const [participants, setParticipants] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchParticipants = async () => {
//             let url;
//             if (role === "tutor") {
//                 url = `http://localhost:9091/users/tutor/${id}/students`; // Fetch students for the tutor
//             } else if (role === "student") {
//                 url = `http://localhost:9091/users/student/${id}/tutors`; // Fetch tutors for the student
//             } else {
//                 setError("Invalid role");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await fetch(url);
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 const data = await response.json();
//                 setParticipants(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchParticipants();
//     }, [role, id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h2>{role === "tutor" ? "Students Assigned" : "Tutors Available"} for ID: {id}</h2>
//             <ul>
//                 {participants.map((participant) => (
//                     <li 
//                         key={role === "tutor" ? participant.studentId : participant.tutorId} 
//                         onClick={() => onParticipantSelect(participant)}
//                     >
//                         {role === "tutor" 
//                           ? `Student ID: ${participant.firstName || "N/A"}` 
//                           : `Tutor ID: ${participant.firstName || "N/A"}`}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ChatList;

// src/ChatList.js

import React, { useEffect, useState } from "react";
import "./ChatList.css"; // Import CSS file for styling

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
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="chat-list-container">
            <h2 className="chat-list-title">{role === "tutor" ? "Students Assigned" : "Tutors Available"}</h2>
            <ul className="chat-list">
                {participants.map((participant) => (
                    <li 
                        key={role === "tutor" ? participant.studentId : participant.tutorId} 
                        onClick={() => onParticipantSelect(participant)}
                        className="chat-list-item"
                    >
                        <div className="avatar">
                            {/* Placeholder avatar */}
                            <img src="https://via.placeholder.com/40" alt="User Avatar" />
                        </div>
                        <div className="chat-info">
                            <div className="chat-name">{participant.firstName || "N/A"}</div>
                            <div className="chat-role">{role === "tutor" ? "Student" : "Tutor"}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
