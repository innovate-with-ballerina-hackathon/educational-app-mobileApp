import RootNavigator from './src/navigation/rootNavigator';
import React, {useState, createContext} from 'react';

export const UserContext = createContext();

export default function App() {
  const [role, setRole] = useState(null);
  const [subject, setSubject] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [currentTab, setCurrentTab] = useState();


  return (
    <UserContext.Provider value={{role, setRole, subject, setSubject , accessToken, setAccessToken , currentTab , setCurrentTab}}>
    <RootNavigator />
    </UserContext.Provider>
  )
}