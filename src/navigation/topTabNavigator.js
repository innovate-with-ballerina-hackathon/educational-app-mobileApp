import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UserContext } from '../../App'; // Make sure the correct path to your UserContext is imported
import HomeScreen from '../views/homeScreen';
import UpcomingSessionsScreen from '../views/upcomingSession';
import TutorsScreen from '../views/tutorScreen';
import ChatScreen from '../views/chatScreen';
import TutorUploadsScreen from '../views/tutorViews/fileUpload';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  const { role } = useContext(UserContext); // Get the user role from context

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: { backgroundColor: 'blue' },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Upcoming Sessions" component={UpcomingSessionsScreen} />
      {role === 'student' && (
        <Tab.Screen name="Tutors" component={TutorsScreen} />
      )}
      {role === 'tutor' && (
        <Tab.Screen name="Tutor Uploads" component={TutorUploadsScreen} />
      )}
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
