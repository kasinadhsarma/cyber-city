import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, VStack, Text, Button, Input } from '@chakra-ui/react';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDescription, setNewJobDescription] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://localhost:4000/api/job-opportunities', { withCredentials: true });
        setJobs(response.data.jobs);
      } catch (err) {
        console.error('Error fetching job opportunities', err);
      }
    };

    fetchJobs();
  }, []);

  const handleCreateJob = async () => {
    try {
      const response = await axios.post('https://localhost:4000/api/job-opportunities', {
        title: newJobTitle,
        description: newJobDescription,
      }, { withCredentials: true });
      if (response.status === 200) {
        setJobs([...jobs, response.data.job]);
        setNewJobTitle('');
        setNewJobDescription('');
      } else {
        console.error('Error creating job opportunity');
      }
    } catch (err) {
      console.error('Error creating job opportunity', err);
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl">Job Opportunities</Text>
        {jobs.map((job) => (
          <Box key={job.id} p={4} borderWidth={1} borderRadius="lg">
            <Text fontSize="xl">{job.title}</Text>
            <Text>{job.description}</Text>
          </Box>
        ))}
        <Input
          placeholder="Job Title"
          value={newJobTitle}
          onChange={(e) => setNewJobTitle(e.target.value)}
        />
        <Input
          placeholder="Job Description"
          value={newJobDescription}
          onChange={(e) => setNewJobDescription(e.target.value)}
        />
        <Button onClick={handleCreateJob}>Create Job Opportunity</Button>
      </VStack>
    </Box>
  );
};

export default JobList;
