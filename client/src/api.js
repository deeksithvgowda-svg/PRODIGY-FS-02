// client/src/api.js

import axios from 'axios';

// Create a custom instance of axios
const api = axios.create({
    // This is the URL of your running Express backend server (port 5000)
    baseURL: 'http://localhost:5000/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

/* Optional: Add an interceptor to include the token in every request automatically. 
   We will need to use localStorage to store the token later.
*/
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // Attach the token to the 'x-auth-token' header for protected routes
        config.headers['x-auth-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
