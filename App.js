import RootNavigator from './src/navigation/rootNavigator';
import React, { useState, createContext } from 'react';
import SignInPage from './src/views/signInPage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import TopTabNavigator from './src/navigation/topTabNavigator';

export const UserContext = createContext();

export default function App() {
  const [role, setRole] = useState(null);
  const [subject, setSubject] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [currentTab, setCurrentTab] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <BrowserRouter>
      <UserContext.Provider value={{ role, setRole, subject, setSubject, accessToken, setAccessToken, currentTab, setCurrentTab, isLoggedIn , setIsLoggedIn }}>
        <RootNavigator/>
      </UserContext.Provider>
    </BrowserRouter>
  )
}