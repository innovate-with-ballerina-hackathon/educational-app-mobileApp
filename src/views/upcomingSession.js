import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const upcomingSessions = [
  {
    id: '1',
    tutorName: 'Emily Johnson',
    subject: 'Mathematics',
    date: '2024-10-25',
    time: '10:00 AM',
  },
  {
    id: '2',
    tutorName: 'Michael Brown',
    subject: 'Physics',
    date: '2024-10-26',
    time: '11:00 AM',
  },
  {
    id: '3',
    tutorName: 'Emily Johnson',
    subject: 'Chemistry',
    date: '2024-10-27',
    time: '02:00 PM',
  },
];

const UpcomingSessions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Sessions</Text>
      <FlatList
        data={upcomingSessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.sessionCard}>
            <Text style={styles.sessionText}>Tutor: {item.tutorName}</Text>
            <Text style={styles.sessionText}>Subject: {item.subject}</Text>
            <Text style={styles.sessionText}>Date: {item.date}</Text>
            <Text style={styles.sessionText}>Time: {item.time}</Text>
            <TouchableOpacity style={styles.button}>
                <Text> Join </Text>
              </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sessionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  sessionText: {
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'dodgerblue',
    paddingVertical: 10,  // Adjusts the vertical padding
    paddingHorizontal: 20,  // Adjusts the horizontal padding for the text
    borderRadius: 5,
    alignSelf: 'center',
  },
});

export default UpcomingSessions;
