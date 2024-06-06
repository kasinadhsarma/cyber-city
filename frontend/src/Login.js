import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { username, password });
    try {
      const response = await axios.post('https://localhost:4000/api/login', {
        username,
        password,
      }, { withCredentials: true });
      if (response.status === 200) {
        onLogin();
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <form onSubmit={handleLogin}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl">Login</Text>
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
          {error && <Text color="red.500">{error}</Text>}
          <Button type="submit">Login</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
