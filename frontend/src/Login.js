import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, FormControl, FormLabel } from '@chakra-ui/react';
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
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden" maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleLogin}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" textAlign="center">Login</Text>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {error && <Text color="red.500" textAlign="center">{error}</Text>}
          <Button type="submit" colorScheme="teal" size="lg" mt={4}>Login</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
