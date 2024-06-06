import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, FormControl, FormLabel, Select } from '@chakra-ui/react';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/api/register', {
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
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden" maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleRegister}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" textAlign="center">Register</Text>
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
          <FormControl id="confirm-password">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              placeholder="Confirm your password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="role">
            <FormLabel>Role</FormLabel>
            <Select
              placeholder="Select your role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </Select>
          </FormControl>
          {error && <Text color="red.500" textAlign="center">{error}</Text>}
          <Button type="submit" colorScheme="teal" size="lg" mt={4}>Register</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
