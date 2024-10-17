import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For tab icons
import HomeScreen from '../views/homeScreen';
import UpcomingSessionsScreen from '../views/upcomingSession';
import TutorsScreen from '../views/tutorScreen';
import ChatScreen from '../views/chatScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'UpcomingSessions') {
              iconName = 'calendar-outline';
            } else if (route.name === 'Tutors') {
              iconName = 'school-outline';
            } else if (route.name === 'Chat') {
              iconName = 'chatbubble-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="UpcomingSessions" component={UpcomingSessionsScreen} />
        <Tab.Screen name="Tutors" component={TutorsScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
      </Tab.Navigator>
  );
};

export default BottomTabNavigator;
