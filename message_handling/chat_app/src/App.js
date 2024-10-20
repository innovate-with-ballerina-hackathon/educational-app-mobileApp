import React from "react";
import Chat from "./Chat";
import TeacherChat from "./TeacherChat"; // Import the new TeacherChat component

function App() {
    return (
        <div className="App">
            <Chat />         {/* Student Chat */}
            <TeacherChat />  {/* Teacher Chat */}
        </div>
    );
}

export default App;
