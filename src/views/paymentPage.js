// const PaymentPage = () => {
//     return (
//         <div>
//             <h1>PaymentPage</h1>
//         </div>
//     );
// };

// export default PaymentPage;

import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PaymentPage = ({ route }) => {
  const { sessionId, tutorId } = route.params; // Extracting sessionId and tutorId from route params
  const [studentId, setStudentId] = useState(''); // State to store studentId
  const navigation = useNavigation(); // Hook to get navigation object

  // Function to handle session booking
  const handleBookSession = async () => {
    try {
      // Making PUT request to book the session
      const response = await axios.put(`http://localhost:9091/users/session_booking/${sessionId}`, null, {
        params: { studentId: studentId }, // Passing studentId as a query parameter
      });

      // If booking is successful
      if (response.status === 200) {
        Alert.alert('Success', 'Session booked successfully!');
        navigation.navigate('SessionSelection'); // Navigate back to SessionSelection page
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to book the session. Please try again.'); // Error handling
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Book Your Session</Text>
      <TextInput
        placeholder="Enter Your Student ID"
        value={studentId}
        onChangeText={setStudentId}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
      />
      <Button title="Book Session" onPress={handleBookSession} />
    </View>
  );
};

export default PaymentPage;
