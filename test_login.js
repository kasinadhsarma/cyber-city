const axios = require('axios');

const testLogin = async () => {
  try {
    const response = await axios.post('http://localhost:4000/api/login', {
      username: 'testuser',
      password: 'testpassword',
    });
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    console.log('Response headers:', response.headers);
  } catch (err) {
    console.error('Login error:', err.response ? err.response.data : err.message);
  }
};

testLogin();
