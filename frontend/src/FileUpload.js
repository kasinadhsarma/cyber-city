import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Text, Select } from '@chakra-ui/react';
import axios from 'axios';

const FileUpload = () => {
  const [category, setCategory] = useState('general');
  const [viewableBy, setViewableBy] = useState('user');
  const [downloadableBy, setDownloadableBy] = useState('user');
  const categories = ['general', 'reports', 'scripts', 'logs'];
  const roles = ['admin', 'moderator', 'user'];

  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
      formData.append('category', category);
      formData.append('viewable_by', viewableBy);
      formData.append('downloadable_by', downloadableBy);
    });

    axios.post('https://localhost:4000/api/cybersecurity-files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Files uploaded successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error uploading files:', error);
    });
  }, [category, viewableBy, downloadableBy]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <Select mb={4} value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Select>
      <Select mb={4} value={viewableBy} onChange={(e) => setViewableBy(e.target.value)}>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </Select>
      <Select mb={4} value={downloadableBy} onChange={(e) => setDownloadableBy(e.target.value)}>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </Select>
      <Box {...getRootProps()} p={4} borderWidth={2} borderRadius="lg" borderColor={isDragActive ? 'teal.500' : 'gray.200'} textAlign="center">
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text>Drop the files here ...</Text>
        ) : (
          <Text>Drag 'n' drop some files here, or click to select files</Text>
        )}
      </Box>
      <Button mt={4} colorScheme="teal" onClick={() => document.querySelector('input[type="file"]').click()}>
        Select Files
      </Button>
    </Box>
  );
};

export default FileUpload;
