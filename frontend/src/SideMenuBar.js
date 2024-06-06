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
      zIndex={1} // Ensure the sidebar is on top of other elements
    >
      <VStack spacing={4} align="stretch">
        <Button variant="ghost" onClick={() => { console.log('Chat button clicked'); onSelect('chat'); }}>
          Chat
        </Button>
        <Button variant="ghost" onClick={() => { console.log('Files button clicked'); onSelect('files'); }}>
          Files
        </Button>
        <Button variant="ghost" onClick={() => { console.log('Training button clicked'); onSelect('training'); }}>
          Training
        </Button>
        <Button variant="ghost" onClick={() => { console.log('Jobs button clicked'); onSelect('jobs'); }}>
          Jobs
        </Button>
      </VStack>
    </Box>
  );
};

export default SideMenuBar;
