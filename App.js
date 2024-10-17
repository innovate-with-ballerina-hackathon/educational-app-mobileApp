import { GluestackUIProvider, Button, ButtonText } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import RootNavigator from './src/navigation/rootNavigator';
import React, {useState, createContext} from 'react';

export const UserContext = createContext();

export default function App() {
  const [role, setRole] = useState(null);
  const [subject, setSubject] = useState(null);

  return (
    <UserContext.Provider value={{role, setRole, subject, setSubject}}>
    <RootNavigator />
    </UserContext.Provider>
  )
}