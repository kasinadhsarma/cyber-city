import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:4000/api/register', {
        username,
        password,
        role,
      });
      if (response.status === 200) {
        onRegister();
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed');
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <form onSubmit={handleRegister}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl">Register</Text>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          {error && <Text color="red.500">{error}</Text>}
          <Button type="submit">Register</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
