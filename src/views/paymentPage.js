import React from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const { sessionId, tutorId } = location.state;
  const navigate = useNavigate();
  const studentId = sessionStorage.getItem('id');

  const handleBookSession = async () => {
    try {
      console.log('sessionId = ', sessionId);
      const response = await axios.put(`http://localhost:9091/users/session_booking/${sessionId}`, null, {
        params: { studentId: studentId },
      });
      console.log(response.status);

      if (response.status === 200) {
        console.log('Session booked successfully!');	
        Alert.alert('Success', 'Session booked successfully!');
        navigate('/sessionSelection', { state: { tutorId: tutorId } });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to book the session. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Confirm Your Session</Text>
        <Text style={styles.label}>Student ID:</Text>
        <Text style={styles.studentId}>{studentId}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleBookSession}>
        <Text style={styles.buttonText}>Confirm Session</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  studentId: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 5,
    color: '#444',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PaymentPage;
