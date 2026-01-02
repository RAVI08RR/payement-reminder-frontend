const https = require('https');

console.log("Script starting...");

const API_URL = 'https://payement-reminder-backend.onrender.com';

const loginData = JSON.stringify({
  email: 'ravi.belpade@travash.com',
  password: '12345678'
});

const options = {
  hostname: 'payment-reminder-backend-pec6.onrender.com',
  port: 443,
  path: '/users/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': loginData.length
  }
};

const req = https.request(options, (res) => {
  console.log(`Login Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Login Response:', data);
    
    try {
      const json = JSON.parse(data);
      const token = json.token || json.access_token;
      
      if (token) {
        console.log('Token found, fetching users...');
        fetchUsers(token);
      } else {
        console.log('No token found in response.');
      }
    } catch (e) {
      console.error('Failed to parse login response JSON');
    }
  });
});

req.on('error', (error) => {
  console.error('Login Request Error:', error);
});

req.write(loginData);
req.end();

function fetchUsers(token) {
  const options = {
    hostname: 'payement-reminder-backend.onrender.com',
    port: 443,
    path: '/users/',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Users Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Users Response (first 500 chars):', data.substring(0, 500));
      // Try to find the user
      try {
        const users = JSON.parse(data);
        if (Array.isArray(users)) {
             const found = users.find(u => u.email === 'ravi.belpade@travash.com');
             console.log('FOUND USER:', found);
        } else {
            console.log('Users output is not an array');
        }
      } catch (e) { console.log('Users parse error'); }
    });
  });

  req.end();
}
