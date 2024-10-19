import ballerina/io;
import ballerina/websocket;
// import ballerina/http;
// import ballerina/sql;
// import ballerinax/mysql;
import ballerinax/mysql.driver as _;

type Book record {|
int booking_id;
int session_id;
int student_id;
string booking_status;
int tutor_id;
|};

// service /chat on new http:Listener(8090) {
//     private final mysql:Client db;
//     function init() returns error? {
//         // Initialize MySQL client
//         self.db = check new (host = "localhost", user = "root", password = "Asdf1234@", database = "tutoring", port = 3306);
//     }

//     resource function get teacher/[string student_id]() returns Book[]|error {
//         stream<Book, sql:Error?> bookings =self.db->query(`SELECT * FROM tutoring.bookings WHERE student_id = ${student_id}`);
//         return from Book b in bookings
//             select b;
//     }

//     resource function get student/[string tutor_id]() returns Book[]|error {
//         stream<Book, sql:Error?> bookings =self.db->query(`SELECT * FROM tutoring.bookings WHERE student_id = ${tutor_id}`);
//         return from Book b in bookings
//             select b;
//     }
// }


public function main() returns error? {
    // Create a new WebSocket client.
    websocket:Client chatClient = check new ("ws://localhost:9090/chat/student/1/2");
    string message = check chatClient->readMessage();
    //string message2 = check chatClient->readMessage();
    io:println(message);
    //io:println(message2);
    //_= check messaging(chatClient);
    while true {
            string textResp = check chatClient->readMessage();
            string msg = io:readln("");
            if (msg == "exit") {
                check chatClient->close();
                return;
            } else {
                io:println("Received: ", textResp);
                check chatClient->writeMessage(msg);
                
            }
        }
   

}

function messaging(websocket:Client chatClient) returns error? {
    io:println("Enter 'exit' to close the connection.");
    worker readWorker returns error? {
        while true {
            string textResp = check chatClient->readMessage();
            io:println("Received: ", textResp);
        }
    }

    // Create a worker to handle sending outgoing messages
    worker writeWorker returns error? {
        while true {
            string msg = io:readln("");
            if (msg == "exit") {
                check chatClient->close();
                return;
            } else {
                check chatClient->writeMessage(msg);
            }
        }
    }
}