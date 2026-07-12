import axios from 'axios';

// Connects directly to your running Node.js server port
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically injects the JWT token into headers for private routes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('veloce_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;