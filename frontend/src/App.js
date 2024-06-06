import React, { useState, useEffect } from 'react';
import './App.css';
import Chat from './Chat';
import FileUpload from './FileUpload';
import FileList from './FileList';
import SideMenuBar from './SideMenuBar';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import JobList from './JobList'; // Import JobList component
import axios from 'axios';
import { Button, Box, VStack, Input, Text } from '@chakra-ui/react';

function App() {
  const [selectedSection, setSelectedSection] = useState('chat');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [channels, setChannels] = useState([]);
  const [newChannelName, setNewChannelName] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://localhost:4000/api/check-auth', { withCredentials: true });
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUserRole(response.data.role); // Set the user role
        }
      } catch (err) {
        console.error('Error checking authentication', err);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    console.log('Selected section updated:', selectedSection);
  }, [selectedSection]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get('https://localhost:4000/api/channels', { withCredentials: true });
        setChannels(response.data.channels);
      } catch (err) {
        console.error('Error fetching channels', err);
      }
    };

    if (isAuthenticated) {
      fetchChannels();
    }
  }, [isAuthenticated]);

  const handleCreateChannel = async () => {
    try {
      const response = await axios.post('https://localhost:4000/api/channels', {
        name: newChannelName,
      }, { withCredentials: true });
      if (response.status === 200) {
        setChannels([...channels, response.data.channel]);
        setNewChannelName('');
      } else {
        console.error('Error creating channel');
      }
    } catch (err) {
      console.error('Error creating channel', err);
    }
  };

  const renderSection = () => {
    console.log('Rendering section:', selectedSection);
    if (!isAuthenticated) {
      return (
        <>
          <Login onLogin={() => setIsAuthenticated(true)} />
          <Button onClick={() => {
            console.log('Register button clicked');
            setSelectedSection('register');
            console.log('Updated selectedSection:', 'register');
          }}>Register</Button>
        </>
      );
    }

    switch (selectedSection) {
      case 'chat':
        return (
          <>
            <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
              <VStack spacing={4} align="stretch">
                <Text fontSize="2xl">Channels</Text>
                {channels.map((channel) => (
                  <Button key={channel.id} onClick={() => setSelectedSection(`chat-${channel.name}`)}>
                    {channel.name}
                  </Button>
                ))}
                <Input
                  placeholder="New Channel Name"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                />
                <Button onClick={handleCreateChannel}>Create Channel</Button>
              </VStack>
            </Box>
            <Chat />
          </>
        );
      case 'files':
        console.log('User role:', userRole); // Log the user role
        return (
          <>
            <FileUpload />
            <FileList userRole={userRole} /> {/* Pass userRole as a prop */}
          </>
        );
      case 'training':
        return <div>Training Modules</div>;
      case 'jobs':
        return <JobList />; // Render JobList component
      case 'register':
        return <Register />;
      default:
        if (selectedSection.startsWith('chat-')) {
          return <Chat channel={selectedSection.replace('chat-', '')} />;
        }
        return <Chat />;
    }
  };

  return (
    <div className="App">
      <SideMenuBar onSelect={setSelectedSection} />
      <div className="App-content">
        {renderSection()}
        {isAuthenticated && <Logout onLogout={() => setIsAuthenticated(false)} />}
      </div>
    </div>
  );
}

export default App;
