// src/App.js

import React, { useState } from "react";
import Chat from "./Chat";
import ChatList from "./ChatList";

function App() {
    const [role, setRole] = useState("student"); // Set to "teacher" or "student"
    const [id, setId] = useState(1); // ID of the logged-in user
    const [participant, setParticipant] = useState(null); // State for selected participant

    const handleParticipantSelect = (selectedParticipant) => {
        setParticipant(selectedParticipant); // Update the selected participant
    };

    return (
        <div className="App">
            <ChatList role={role} id={id} onParticipantSelect={handleParticipantSelect} />
            {participant && <Chat role={role} tutorId={id} studentId={participant.student_id || participant.tutor_id} />}
        </div>
    );
}

export default App;