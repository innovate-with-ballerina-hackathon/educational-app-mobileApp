import React, { useContext, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import { UserContext } from '../../App';
import HomeScreen from '../views/homeScreen';
import TutorList from '../views/tutorList';
import ChatScreen from '../views/chatScreen';
import TutorUploadsScreen from '../views/tutorViews/fileUpload';
import SessionSelection from '../views/sessionSelection';
import ProfileTab from '../views/profileTab';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  const role = sessionStorage.getItem('role');
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/home');
        break;
      case 1:
        role === 'tutor' ? navigate('/sessionSelection') : navigate('/tutorList');
        break;
      case 2:
        role === 'tutor' && navigate('/fileUpload');
        break;
      case 3:
        navigate('/chat');
        break;
      default:
        navigate('/home');
    }
  };

  return (
    <div>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="top navigation tabs"
          centered
          sx={{
            width: '100%', // Full width
            overflow: 'visible', // Prevent overflow
            '& .MuiTabs-indicator': {
              backgroundColor: 'blue', // Custom indicator color
            },
          }}
        >
          <Tab label="Home" />
          {role === 'tutor' ? (
            <Tab label="Session Management" />
          ) : (
            <Tab label="Tutors" />
          )}
          {role === 'tutor' && <Tab label="Tutor Uploads" />}
          <Tab label="Chat" />
        </Tabs>
      </Box>

      {/* Define Routes for each component */}
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/sessionSelection" element={<SessionSelection />} />
        <Route path="/tutorList" element={<TutorList />} />
        <Route path="/fileUpload" element={<TutorUploadsScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/profile" element={<ProfileTab />} />
      </Routes>
    </div>
  );
};

export default TopTabNavigator;
