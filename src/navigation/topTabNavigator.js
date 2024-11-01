import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UserContext } from '../../App'; // Make sure the correct path to your UserContext is imported
import HomeScreen from '../views/homeScreen';
import UpcomingSessionsScreen from '../views/upcomingSession';
import TutorList from '../views/tutorList';
import ChatScreen from '../views/chatScreen';
import TutorUploadsScreen from '../views/tutorViews/fileUpload';
import SessionSelection from '../views/sessionSelection';
import ProfileTab from '../views/profileTab';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  const { role , currentTab , setCurrentTab } = useContext(UserContext); // Get the user role from context

  return (
    <Tab.Navigator
      initialRouteName={currentTab}
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: { backgroundColor: 'blue' },       
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {role === 'student' && (
        <Tab.Screen name="Upcoming Sessions" component={UpcomingSessionsScreen} />
      )}
      {role === 'tutor' && (
        <Tab.Screen name="Session Management" component={SessionSelection} />
      )}
      {role === 'student' && (
        <Tab.Screen name="Tutors" component={TutorList} />
      )}
      {role === 'tutor' && (
        <Tab.Screen name="Tutor Uploads" component={TutorUploadsScreen} />
      )}
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
