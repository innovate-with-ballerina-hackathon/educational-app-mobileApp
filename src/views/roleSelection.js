import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RoleSelectionScreen = () => {
  const navigation = useNavigation();

  const handleStudentSelection = () => {
    // Navigate directly to login if student
    navigation.navigate('LoginScreen');
  };

  const handleTutorSelection = () => {
    // Navigate to subject selection if tutor
    navigation.navigate('SubjectSelection');
  };

  return (
    <View style={styles.container}>
      <Button title="Student" onPress={handleStudentSelection} />
      <Button title="Tutor" onPress={handleTutorSelection} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoleSelectionScreen;
