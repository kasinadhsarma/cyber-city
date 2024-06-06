import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Button } from '@chakra-ui/react';
import axios from 'axios';

const FileList = ({ userRole }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:4000/api/cybersecurity-files?role=${userRole}`)
      .then((response) => {
        setFiles(response.data.files);
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
      });
  }, [userRole]);

  const handleDownload = (fileId) => {
    axios.get(`https://localhost:4000/api/cybersecurity-files/download/${fileId}`, {
      responseType: 'blob',
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file'); // or pass the file name from the response
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <VStack spacing={4} align="stretch">
        {files.length > 0 ? (
          files.map((file, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="lg">
              <Text>File Name: {file.originalname}</Text>
              <Text>Category: {file.category}</Text>
              <Text>Uploaded At: {new Date(file.uploadedAt).toLocaleString()}</Text>
              <Button mt={2} colorScheme="teal" onClick={() => handleDownload(file.id)}>
                Download
              </Button>
            </Box>
          ))
        ) : (
          <Text>No files uploaded yet.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default FileList;
