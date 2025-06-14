// API service file for common API functionality
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and adding auth token if needed
apiClient.interceptors.request.use(
  (config) => {    // Get auth token from localStorage if in browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes
    if (error.response) {
      // Log based on status code
      if (error.response.status === 401) {
        console.error('Authentication error. Please login again.');
        // Could trigger logout or redirect to login here
      }
    }
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;