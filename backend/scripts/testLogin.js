const axios = require('axios');

const testLogin = async () => {
  try {
    const res = await axios.post('http://localhost:5001/api/auth/login', {
      username: 'Admin',
      password: 'Admin@123'
    });
    console.log('Login successful!', res.data.username);
  } catch (error) {
    console.error('Login failed:', error.response?.status, error.response?.data);
  }
};

testLogin();
