import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { UserContext } from '../../App';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { toUnitless } from '@mui/material/styles/cssUtils';

const SessionSelection = ({ navigation, route }) => {
  const { role } = useContext(UserContext); // Retrieve user role from context (tutor or student)
  const [selectedDate, setSelectedDate] = useState(''); // State to store selected date
  const [sessions, setSessions] = useState([]); // State to store fetched sessions for the selected date
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to store any error
  
  // Retrieve tutorId from route params if passed or set a default
  const tutorId = role === 'student' ? route.params.tutorId : 1;
  console.log("tutorId= " + tutorId);

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
    // Redirect to payment page after selecting the session
    navigation.navigate('PaymentPage', { sessionId: id, tutorId: tutorId });
    // Update session selection status (mark as selected)
    const updatedSessions = sessions.map((session) =>
      session.sessionId === id && session.status === "BOOKED"
        ? { ...session, selected: true }
        : session
    );
    setSessions(updatedSessions); // Update sessions state with the updated data
  };

    // Handle session deletion (for tutors only)
  const handleSessionDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:9091/users/session/${id}/delete`);

      if (response.status === 204) {
        // Remove deleted session from local state
        setSessions((prevSessions) => prevSessions.filter((session) => session.sessionId !== id));
        Alert.alert('Success', 'Session deleted successfully');
      } else {
        Alert.alert('Error', 'Failed to delete session');
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      Alert.alert('Error', 'Failed to delete session');
    }
  };

  // Handle session creation (for tutors only)
  const handleSessionCreate = (tutorId,selectedDate) => {
    // Redirect to session form page after selecting the session
    console.log("tutorId in session= " + tutorId);
    navigation.navigate('SessionForm', { tutorId:tutorId, selectedDate:selectedDate });
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
                onPress={() => role !== 'tutor' && item.status==="SCHEDULED" && handleSessionSelect(item.sessionId)} // Only allow selection if the session isn't already selected
                disabled={role === 'tutor' || item.status==="BOOKED"} // Disable the button if it's already selected
                style={[
                  styles.sessionButton,
                  item.status==="BOOKED" && styles.selectedSession, // Apply selected styling if session is selected
                ]}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold' , paddingLeft: 10}}>{`${item.startingTime.hour}:${item.startingTime.minute} - ${item.endingTime.hour}:${item.endingTime.minute}`}</Text>
                {item.status==="BOOKED" && <Text style={{paddingLeft: 5}}>Selected</Text>} 
              </TouchableOpacity>

              {/* Button for deleting a session (for tutors only) */}
              {role === 'tutor' && (
                <TouchableOpacity onPress={() => handleSessionDelete(item.sessionId)}>
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}

      {/* Button to add a new session (for tutors only) */}
      {role === 'tutor' && (
        <TouchableOpacity style={styles.addButton} onPress={() => handleSessionCreate(tutorId,selectedDate)}>
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
    paddingVertical: 10, // Vertical padding for the button
    borderRadius: 5, // Rounded corners for the button
    backgroundColor: 'lightgreen',
  },
  selectedSession: {
    backgroundColor: 'red', // Highlight selected sessions with green background
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
