import React, { useContext , useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoleSelectionScreen = () => {
  const navigation = useNavigation();
  const {role, setRole} = useContext(UserContext);
  // const [role, setRole] = useState('');

  const handleStudentSelection = () => {
    setRole('student');
    AsyncStorage.setItem('role', 'student');
    navigation.navigate('LoginScreen');
  };

  const handleTutorSelection = () => {
    setRole('tutor');
    AsyncStorage.setItem('role', 'tutor');
    navigation.navigate('SubjectSelection');
  };

  // const handleRoleSelection = (role) => {
  //   // Set the role based on the parameter
  //   setRole(role);
  
  //   // Navigate based on the role
  //   if (role === 'student') {
  //     navigation.navigate('LoginScreen');
  //   } else if (role === 'tutor') {
  //     navigation.navigate('SubjectSelection');
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <TouchableOpacity style={styles.button} onPress={handleStudentSelection}>
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleTutorSelection}>
        <Text style={styles.buttonText}>Tutor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8', // Light background color for a fresh look
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333', // Dark color for better readability
  },
  button: {
    backgroundColor: '#007bff', // Primary button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff', // White text for contrast
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RoleSelectionScreen;
