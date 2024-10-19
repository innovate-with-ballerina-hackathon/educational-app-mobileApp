import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../App';

const RoleSelectionScreen = () => {
  const navigation = useNavigation();
  const {role, setRole} = useContext(UserContext);
  // const [role, setRole] = useState('');

  const handleStudentSelection = () => {
    // Navigate directly to login if student
    setRole('student');
    // navigation.navigate('LoginScreen');
    navigation.navigate('Home');
  };

  const handleTutorSelection = () => {
    // Navigate to subject selection if tutor
    setRole('tutor');
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
      <Button title="Student" onPress={handleStudentSelection} />
      <Button title="Tutor" onPress={handleTutorSelection} />
      {/* <Button title="Student" onPress={handleRoleSelection('student')} />
      <Button title="Tutor" onPress={handleRoleSelection('tutor')} /> */}
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
