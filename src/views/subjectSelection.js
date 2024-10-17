import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SubjectSelectionScreen = () => {
  const navigation = useNavigation();
  const {setSubject} = useContext(UserContext);

  const handleSubjectSelection = (subject) => {
    setSubject(subject);
    console.log(`Selected subject: ${subject}`);
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Button title="Physics" onPress={() => handleSubjectSelection('Physics')} />
      <Button title="Chemistry" onPress={() => handleSubjectSelection('Chemistry')} />
      <Button title="Biology" onPress={() => handleSubjectSelection('Biology')} />
      <Button title="Maths" onPress={() => handleSubjectSelection('Maths')} />
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

export default SubjectSelectionScreen;
