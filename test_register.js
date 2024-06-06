const axios = require('axios');

const testRegister = async () => {
  try {
    const response = await axios.post('http://localhost:4000/api/register', {
      username: 'testuser',
      password: 'testpassword',
      role: 'user',
    });
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
  } catch (err) {
    console.error('Registration error:', err.response ? err.response.data : err.message);
  }
};

testRegister();
