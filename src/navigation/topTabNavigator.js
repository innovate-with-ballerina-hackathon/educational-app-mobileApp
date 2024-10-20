import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../views/homeScreen';
import UpcomingSessionsScreen from '../views/upcomingSession';
import TutorsScreen from '../views/tutorScreen';
import ChatScreen from '../views/chatScreen';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
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
        <Tab.Screen name="Tutors" component={TutorsScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
      </Tab.Navigator>
  );
};

export default TopTabNavigator;
