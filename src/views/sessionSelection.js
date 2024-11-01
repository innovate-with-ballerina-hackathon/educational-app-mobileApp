import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const SessionSelection = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const role = sessionStorage.getItem('role');
  const navigate = useNavigate();
  const tutorId = role === 'student' ? location.state.tutorId : sessionStorage.getItem('id');

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    const [year, month, dayNumber] = day.dateString.split('-');
    fetchSessions(year, month, dayNumber);
  };

  const fetchSessions = async (year, month, day) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:9091/users/tutor/${tutorId}/sessions`, {
        params: { year, month, day },
      });
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setError('Failed to load sessions');
      Alert.alert('Error', 'Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleSessionSelect = (id) => {
    navigate('/payment', { state: { sessionId: id, tutorId: tutorId } });
  };

  const handleSessionDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:9091/users/tutor/${id}/sessions`);
      if (response.status === 204) {
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

  const handleSessionCreate = () => {
    navigate('/sessionForm', { state: { tutorId: tutorId, selectedDate: selectedDate } });
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
          keyExtractor={(item) => item.sessionId.toString()}
          renderItem={({ item }) => (
            <View style={styles.session}>
              <TouchableOpacity
                onPress={() => role !== 'tutor' && item.status === "SCHEDULED" && handleSessionSelect(item.sessionId)}
                disabled={role === 'tutor' || item.status === "BOOKED"}
                style={[
                  styles.sessionButton,
                  item.status === "BOOKED" && styles.selectedSession,
                ]}
              >
                <Text style={styles.sessionText}>
                  {`${String(item.startingTime.hour).padStart(2, '0')}:${String(item.startingTime.minute).padStart(2, '0')} - ${String(item.endingTime.hour).padStart(2, '0')}:${String(item.endingTime.minute).padStart(2, '0')}`}
                </Text>
                {item.status === "BOOKED" && <Text style={styles.bookedText}>Selected</Text>}
              </TouchableOpacity>

              {role === 'tutor' && (
                <TouchableOpacity onPress={() => handleSessionDelete(item.sessionId)}>
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
              )}
            </View>
          )}

        />
      )}

      {/* Always show add button for tutors */}
      {role === 'tutor' && (
        <TouchableOpacity style={styles.addButton} onPress={handleSessionCreate}>
          <Ionicons name="add-circle-outline" size={50} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100vw',
    height: '95vh',
  },
  selectedDate: {
    fontSize: 18,
    marginVertical: 10,
  },
  session: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  sessionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'lightgreen',
  },
  sessionText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  bookedText: {
    paddingLeft: 5,
  },
  selectedSession: {
    backgroundColor: 'red',
  },
  deleteIcon: {
    fontSize: 20,
    color: 'red',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SessionSelection;
