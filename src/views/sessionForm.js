import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const SessionForm = ({ route, navigation }) => {
  const { tutorId, selectedDate } = route.params; // Extracting tutorId and selectedDate from route params

  // Split selectedDate into year, month, and day
  const [year, month, day] = selectedDate.split('-').map(Number);

  // Form state
  const [startingTime, setStartingTime] = useState({
    year: year,
    month: month,
    day: day,
    hour: 0,
    minute: 0,
  });

  const [endingTime, setEndingTime] = useState({
    year: year,
    month: month,
    day: day,
    hour: 1, // Default to one hour after starting time
    minute: 0,
  });

  const [timeZoneOffset, setTimeZoneOffset] = useState('Asia/Colombo');
  const [utcOffset, setUtcOffset] = useState('+05:30:00'); // default UTC offset

  // Handle time zone change
  const handleTimeZoneChange = (zone) => {
    setTimeZoneOffset(zone);
    switch (zone) {
      case 'Asia/Colombo':
        setUtcOffset('+05:30:00');
        break;
      case 'America/New_York':
        setUtcOffset('-04:00:00');
        break;
      // Add other time zones as needed
      default:
        setUtcOffset('+00:00:00');
    }
  };

  // Update ending time when starting time changes
  useEffect(() => {
    setEndingTime({
      ...endingTime,
      hour: startingTime.hour + 1, // Ending time hour is starting time hour + 1
      minute: startingTime.minute,   // Keep the same minute
    });
  }, [startingTime.hour, startingTime.minute]);

  // Submit the form
  const handleSubmit = async () => {
    const sessionData = {
      tutorTutorId: tutorId,
      startingTime: {
        ...startingTime,
        second: 50,
        timeAbbrev: timeZoneOffset,
      },
      endingTime: {
        ...endingTime,
        second: 50,
        timeAbbrev: timeZoneOffset,
      },
      status: 'SCHEDULED',
      eventId: '',
      timeZoneOffset: timeZoneOffset,
      utcOffset: utcOffset,
    };

    // Send the data to the backend
    try {
      const response = await axios.post('http://localhost:9091/users/sessions', sessionData);
      console.log('Session created successfully:', response.data);
      closePage();
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const closePage = () => {
    navigation.navigate('SessionSelection', { tutorId }); // redirect to session selection page
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New Session</Text>

      <Text style={styles.label}>Starting Time:</Text>
      <Text style={styles.dateText}>
        {`${startingTime.year}-${String(startingTime.month).padStart(2, '0')}-${String(startingTime.day).padStart(2, '0')}`}
      </Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Hour"
          keyboardType="numeric"
          value={String(startingTime.hour)}
          onChangeText={(text) => setStartingTime({ ...startingTime, hour: parseInt(text) })}
        />
        <TextInput
          style={styles.input}
          placeholder="Minute"
          keyboardType="numeric"
          value={String(startingTime.minute)}
          onChangeText={(text) => setStartingTime({ ...startingTime, minute: parseInt(text) })}
        />
      </View>

      <Text style={styles.label}>Ending Time:</Text>
      <Text style={styles.dateText}>
        {`${endingTime.year}-${String(endingTime.month).padStart(2, '0')}-${String(endingTime.day).padStart(2, '0')}`}
      </Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Hour"
          keyboardType="numeric"
          value={String(endingTime.hour)}
          editable={false} // Prevent editing of the ending hour
        />
        <TextInput
          style={styles.input}
          placeholder="Minute"
          keyboardType="numeric"
          value={String(endingTime.minute)}
          editable={false} // Prevent editing of the ending minute
        />
      </View>

      <Text style={styles.label}>Time Zone:</Text>
      <Picker selectedValue={timeZoneOffset} onValueChange={handleTimeZoneChange}>
        <Picker.Item label="Asia/Colombo" value="Asia/Colombo" />
        <Picker.Item label="America/New_York" value="America/New_York" />
        {/* Add more time zones here */}
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
        <Button title="Cancel" onPress={closePage} color="#F44336" />
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SessionForm;
