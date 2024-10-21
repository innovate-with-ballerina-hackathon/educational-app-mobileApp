import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';

const TutorDetail = ({ route, navigation }) => {
  const { tutor } = route.params; // Get the tutor data from the route
  const tutorId = tutor.id;

  const handleSelectSession = () => {
    // Navigate to the Session Selection page, pass the tutor details if needed
    navigation.navigate('SessionSelection', { tutorId: tutorId });
  };
  

  return (
    <View style={styles.container}>
      <Image source={{ uri: tutor.image }} style={styles.image} />
      <Text style={styles.name}>{tutor.name}</Text>
      <Text style={styles.subject}>Subject: {tutor.subject}</Text>
      <Text style={styles.qualifications}>Qualifications: {tutor.qualifications}</Text>
      <Text style={styles.fee}>Hourly Pay: ${tutor.hourlyPay}</Text>
      <Text style={styles.bio}>{tutor.bio}</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleSelectSession}>
        <Text style={styles.buttonText}>Session Selection</Text>
      </TouchableOpacity>

    </View>
  )
  ;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subject: {
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center',
  },
  fee: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
  qualifications: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  bio: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
    textAlign: 'justify',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'dodgerblue',
    paddingVertical: 10,  // Adjusts the vertical padding
    paddingHorizontal: 20,  // Adjusts the horizontal padding for the text
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TutorDetail;
