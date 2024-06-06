import React from 'react';
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      const response = await axios.post('https://localhost:4000/api/logout');
      if (response.status === 200) {
        onLogout();
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl">Logout</Text>
        <Button onClick={handleLogout}>Logout</Button>
      </VStack>
    </Box>
  );
};

export default Logout;
