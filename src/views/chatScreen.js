import React, { useState } from "react";
import ChatList from "../chat/ChatList";
import Chat from "../chat/Chat";
import "../chat/ChatScreen.css";

const ChatScreen = () => {
    const role = sessionStorage.getItem('role');
    const id = sessionStorage.getItem('id');
    const [participant, setParticipant] = useState(null);

    const handleParticipantSelect = (selectedParticipant) => {
        setParticipant(selectedParticipant);
    };

    return (
        <div className="chat-screen">
            <div className="chat-container">
                <div className="chat-list">
                    <ChatList role={role} id={id} onParticipantSelect={handleParticipantSelect} />
                </div>
                <div className="chat">
                    {participant && (
                        <Chat 
                            role={role} 
                            tutorId={role === "tutor" ? id : participant.tutorId} 
                            studentId={role === "student" ? id : participant.studentId} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
