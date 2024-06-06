import React from 'react';
import { Box, VStack, Button } from '@chakra-ui/react';

const SideMenuBar = ({ onSelect }) => {
  return (
    <Box
      w="250px"
      h="100vh"
      bg="gray.800"
      color="white"
      p={4}
      position="fixed"
      top={0}
      left={0}
    >
      <VStack spacing={4} align="stretch">
        <Button variant="ghost" onClick={() => onSelect('chat')}>
          Chat
        </Button>
        <Button variant="ghost" onClick={() => onSelect('files')}>
          Files
        </Button>
        <Button variant="ghost" onClick={() => onSelect('training')}>
          Training
        </Button>
        <Button variant="ghost" onClick={() => onSelect('jobs')}>
          Jobs
        </Button>
      </VStack>
    </Box>
  );
};

export default SideMenuBar;
