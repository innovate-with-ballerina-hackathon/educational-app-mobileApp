// import React, { useState, useContext } from 'react';
// import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { UserContext } from '../../App';

// const SessionSelection = ({ navigation}) => {
//   const {role} = useContext(UserContext);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [sessions, setSessions] = useState([
//     // Example of predefined available sessions
//     { time: '10:00 AM', selected: false, id: 1 },
//     { time: '11:00 AM', selected: false, id: 2 },
//     { time: '02:00 PM', selected: false, id: 3 },
//   ]);

//   const handleDateSelect = (day) => {
//     setSelectedDate(day.dateString);
//   };

//   const handleSessionSelect = (id) => {
//     const updatedSessions = sessions.map((session) =>
//       session.id === id ? { ...session, selected: true } : session
//     );
//     setSessions(updatedSessions);
//     // Redirect to payment page
//     navigation.navigate('PaymentPage', { sessionId: id });
//   };

//   return (
//     <View style={styles.container}>
//       <Calendar onDayPress={handleDateSelect} />
//       <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>

//       <FlatList
//         data={sessions}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => !item.selected && handleSessionSelect(item.id)}
//             disabled={item.selected}
//             style={[styles.session, item.selected && styles.selectedSession]}
//           >
//             <Text>{item.time}</Text>
//             {item.selected && <Text>Selected</Text>}
//           </TouchableOpacity>
//         )}
//       />

//       {role == "tutor" && (
//         <View style={styles.tutorOptions}>
//           <Button title="Add Session +" onPress={() => {/* logic to add session */}} />
//           <Button title="Delete Session" onPress={() => {/* logic to delete session */}} />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   selectedDate: {
//     fontSize: 18,
//     marginVertical: 10,
//   },
//   session: {
//     padding: 10,
//     marginVertical: 5,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//   },
//   selectedSession: {
//     backgroundColor: 'lightgreen',
//   },
//   tutorOptions: {
//     marginTop: 20,
//   },
// });

// export default SessionSelection;

//-----------------------------------------------------------------------

// import React, { useState, useContext } from 'react';
// import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { UserContext } from '../../App';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import Ionicons from '@expo/vector-icons/Ionicons';

// const SessionSelection = ({ navigation }) => {
//   const { role } = useContext(UserContext);   // Retrieve user role from context (tutor or student)
//   const [selectedDate, setSelectedDate] = useState(''); // State to store selected date
//   const [sessions, setSessions] = useState([]);   // State to store fetched sessions for the selected date

//   // Handle date selection from the calendar
//   const handleDateSelect = (day) => {
//     setSelectedDate(day.dateString);    // Update selected date
//     // Commented out backend call and using hardcoded data for now
//     // const fetchedSessions = await fetchSessions(day.dateString);
//     const fetchedSessions = getHardcodedSessions(day.dateString); // Use hardcoded data
//     setSessions(fetchedSessions);   // Update sessions state with fetched data
//   };

//   // Commented out backend call and using hardcoded data
//   // const fetchSessions = async (date) => {
//   //   const response = await fetch(`YOUR_BACKEND_API_URL/sessions?date=${date}`);
//   //   const data = await response.json();
//   //   return data;
//   // };

//   const getHardcodedSessions = (date) => {
//     // Example hardcoded sessions data for testing purposes
//     const hardcodedSessions = {
//       '2024-10-19': [
//         { id: 1, time: '10:00 AM', selected: false },
//         { id: 2, time: '11:00 AM', selected: false },
//         { id: 3, time: '02:00 PM', selected: false },
//       ],
//       '2024-10-20': [
//         { id: 4, time: '09:00 AM', selected: false },
//         { id: 5, time: '11:30 AM', selected: false },
//       ],
//     };
//     return hardcodedSessions[date] || [];   // Return sessions for the selected date, or an empty array if none exist
//   };

//   // Handle session selection (for students only)
//   const handleSessionSelect = (id) => {
//     // Update session selection status (mark as selected)
//     const updatedSessions = sessions.map((session) =>
//       session.id === id ? { ...session, selected: true } : session
//     );
//     setSessions(updatedSessions);   // Update sessions state with the updated data
//     // Redirect to payment page after selecting the session
//     navigation.navigate('PaymentPage', { sessionId: id });
//   };

//   // Handle session deletion (for tutors only)
//   const handleSessionDelete = (id) => {
//     setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
//     // Optionally, call an API to delete the session from the backend when it's ready
//   };

//   return (
//     <View style={styles.container}>
//       <Calendar onDayPress={handleDateSelect} />
//       <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>

//       <FlatList
//         data={sessions}
//         keyExtractor={(item) => item.id.toString()}   // Unique key for each session
//         renderItem={({ item }) => (
//           <View style={styles.session}>
//             <TouchableOpacity
//               onPress={() => role !== 'tutor' && !item.selected && handleSessionSelect(item.id)} // Only allow selection if the session isn't already selected
//               disabled={role === 'tutor' ||item.selected} // Disable the button if it's already selected
//               style={[
//                 styles.sessionButton,
//                 item.selected && styles.selectedSession,    // Apply selected styling if session is selected
//               ]}
//             >
//               <Text>{item.time}</Text>
//               {item.selected && <Text>Selected</Text>}    {/* Indicate if session is already selected */}
//             </TouchableOpacity>

//             {/* Button for deleting a session (for tutors only) */}
//             {role === 'tutor' && (
//               <TouchableOpacity onPress={() => handleSessionDelete(item.id)}>
//                 <AntDesign name="delete" size={24} color="red" />
//               </TouchableOpacity>
//             )}
//           </View>
          
//         )}
        
//       />

//       {/* Button to add a new session (for tutors only) */}
//       {role === 'tutor' && (
//         <TouchableOpacity style={styles.addButton}>
//           <Ionicons name="add-circle-outline" size={24} color="black" />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16, // Padding around the container
//   },
//   selectedDate: {
//     fontSize: 18, // Font size for displaying selected date
//     marginVertical: 10, // Vertical margin for spacing
//   },
//   session: {
//     flexDirection: 'row', // Horizontal layout for session item
//     justifyContent: 'space-between', // Space between session details and action buttons
//     padding: 10, // Padding inside each session item
//     marginVertical: 5, // Spacing between session items
//     backgroundColor: '#f0f0f0', // Light background color for session item
//     borderRadius: 5, // Rounded corners for session item
//   },
//   sessionButton: {
//     flex: 1, // Take up available space
//     paddingVertical: 10, // Vertical padding for the button
//   },
//   selectedSession: {
//     backgroundColor: 'lightgreen', // Highlight selected sessions with green background
//   },
//   deleteIcon: {
//     fontSize: 20, // Size of the trash bin icon for deletion
//     color: 'red', // Color of the trash bin icon
//   },
//   addButton: {
//     marginTop: 20, // Margin above the add button
//     alignItems: 'center', // Center align the add button
//   },
//   addText: {
//     fontSize: 24, // Font size for add button text
//     color: 'green', // Green color for add button text
//   },
// });

// export default SessionSelection;



import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { UserContext } from '../../App';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const SessionSelection = ({ navigation, route }) => {
  const { role } = useContext(UserContext); // Retrieve user role from context (tutor or student)
  const [selectedDate, setSelectedDate] = useState(''); // State to store selected date
  const [sessions, setSessions] = useState([]); // State to store fetched sessions for the selected date
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to store any error
  
  // Retrieve tutorId from route params if passed or set a default
  const tutorId = route.params?.tutor?.id;

  // Handle date selection from the calendar
  const handleDateSelect = async (day) => {
    setSelectedDate(day.dateString); // Update selected date
    const [year, month, dayNumber] = day.dateString.split('-'); // Split selected date into year, month, day
    fetchSessions(year, month, dayNumber); // Fetch sessions for the selected date
  };

  // Fetch session data from the backend using axios
  const fetchSessions = async (year, month, day) => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Clear any previous errors

    try {
      console.log(`http://localhost:9091/users/tutor/${tutorId}/sessions`);
      const response = await axios.get(`http://localhost:9091/users/tutor/${tutorId}/sessions`, {
        params: {
          year,
          month,
          day,
        },
        // headers: {
        //   'Authorization': `pass`, // Set the Authorization header
        // },
      });

      const fetchedSessions = response.data; // Assuming the response contains an array of session objects
      console.log("fetchedSessions= " + fetchedSessions);
      setSessions(fetchedSessions); // Update sessions state with fetched data
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setError('Failed to load sessions'); // Set error state
      Alert.alert('Error', 'Failed to load sessions'); // Show error alert
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Handle session selection (for students only)
  const handleSessionSelect = (id) => {
    // Update session selection status (mark as selected)
    const updatedSessions = sessions.map((session) =>
      session.sessionId === id ? { ...session, selected: true } : session
    );
    setSessions(updatedSessions); // Update sessions state with the updated data
    // Redirect to payment page after selecting the session
    navigation.navigate('PaymentPage', { sessionId: id, tutorId: tutorId });
  };

  // Handle session deletion (for tutors only)
  const handleSessionDelete = (id) => {
    setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
    // Optionally, call an API to delete the session from the backend when it's ready
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={handleDateSelect} />
      <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>

      {loading ? (
        <Text>Loading sessions...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.sessionId.toString()} // Unique key for each session
          renderItem={({ item }) => (
            <View style={styles.session}>
              <TouchableOpacity
                onPress={() => role !== 'tutor' && !item.selected && handleSessionSelect(item.sessionId)} // Only allow selection if the session isn't already selected
                disabled={role === 'tutor' || item.selected} // Disable the button if it's already selected
                style={[
                  styles.sessionButton,
                  item.selected && styles.selectedSession, // Apply selected styling if session is selected
                ]}
              >
                <Text>{`${item.startingTime.hour} - ${item.endingTime.hour}`}</Text>
                {item.selected && <Text>Selected</Text>} 
              </TouchableOpacity>

              {/* Button for deleting a session (for tutors only) */}
              {role === 'tutor' && (
                <TouchableOpacity onPress={() => handleSessionDelete(item.id)}>
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}

      {/* Button to add a new session (for tutors only) */}
      {role === 'tutor' && (
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // Padding around the container
  },
  selectedDate: {
    fontSize: 18, // Font size for displaying selected date
    marginVertical: 10, // Vertical margin for spacing
  },
  session: {
    flexDirection: 'row', // Horizontal layout for session item
    justifyContent: 'space-between', // Space between session details and action buttons
    padding: 10, // Padding inside each session item
    marginVertical: 5, // Spacing between session items
    backgroundColor: '#f0f0f0', // Light background color for session item
    borderRadius: 5, // Rounded corners for session item
  },
  sessionButton: {
    flex: 1, // Take up available space
    paddingVertical: 20, // Vertical padding for the button
    backgroundColor: 'gainsboro',
  },
  selectedSession: {
    backgroundColor: 'lightgreen', // Highlight selected sessions with green background
  },
  deleteIcon: {
    fontSize: 20, // Size of the trash bin icon for deletion
    color: 'red', // Color of the trash bin icon
  },
  addButton: {
    marginTop: 20, // Margin above the add button
    alignItems: 'center', // Center align the add button
  },
  errorText: {
    color: 'red', // Color for error text
    fontSize: 16, // Font size for error message
    textAlign: 'center', // Center-align the error message
  },
});

export default SessionSelection;
