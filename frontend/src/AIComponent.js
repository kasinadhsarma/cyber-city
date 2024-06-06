import React, { useState } from 'react';
import { Box, Button, Textarea, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';

const AIComponent = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleGenerateText = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: inputText,
        max_tokens: 150,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
          'Content-Type': 'application/json',
        },
      });
      setOutputText(response.data.choices[0].text);
    } catch (err) {
      console.error('Error generating text', err);
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl">AI Text Generation</Text>
        <Textarea
          placeholder="Enter your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button onClick={handleGenerateText}>Generate Text</Button>
        <Textarea
          placeholder="Generated text will appear here..."
          value={outputText}
          readOnly
        />
      </VStack>
    </Box>
  );
};

export default AIComponent;
