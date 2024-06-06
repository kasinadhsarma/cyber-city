import React, { useState, useEffect } from 'react';
import { Box, Input, Button, Flex, Text, VStack, Select } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('https://localhost:4000');

const Chat = ({ channel, setChannel }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [newChannel, setNewChannel] = useState('');

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get('https://localhost:4000/api/channels', { withCredentials: true });
        setChannels(response.data.channels);
      } catch (err) {
        console.error('Error fetching channels', err);
      }
    };

    fetchChannels();
  }, []);

  useEffect(() => {
    socket.emit('joinRoom', channel);

    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [channel]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', { room: channel, text: message });
      setMessage('');
    }
  };

  const createChannel = async () => {
    if (newChannel.trim() && !channels.includes(newChannel)) {
      try {
        const response = await axios.post('https://localhost:4000/api/channels', {
          name: newChannel,
        }, { withCredentials: true });
        if (response.status === 200) {
          setChannels([...channels, response.data.channel]);
          setNewChannel('');
        } else {
          console.error('Error creating channel');
        }
      } catch (err) {
        console.error('Error creating channel', err);
      }
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <VStack spacing={4} align="stretch">
        <Select value={channel} onChange={(e) => setChannel(e.target.value)}>
          {channels.map((ch) => (
            <option key={ch.id} value={ch.name}>
              {ch.name}
            </option>
          ))}
        </Select>
        <Flex>
          <Input
            value={newChannel}
            onChange={(e) => setNewChannel(e.target.value)}
            placeholder="New Channel Name"
            mr={2}
          />
          <Button onClick={createChannel} colorScheme="teal">
            Create Channel
          </Button>
        </Flex>
        <Flex direction="column" mb={4}>
          {messages.map((msg, index) => (
            <Text key={index} mb={2}>
              {msg.text}
            </Text>
          ))}
        </Flex>
        <Flex>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            mr={2}
          />
          <Button onClick={sendMessage} colorScheme="teal">
            Send
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Chat;
