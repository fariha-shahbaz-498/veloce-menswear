import API from './api';

// --- Product Requests ---
export const fetchAllProducts = async () => {
  const response = await API.get('/products');
  return response.data; // Returns: { success: true, count: X, data: [...] }
};

// --- Authentication Requests ---
export const loginUser = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  if (response.data.success) {
    // Save token securely on the machine
    localStorage.setItem('veloce_token', response.data.token);
  }
  return response.data;
};

// --- Order Requests ---
export const placeOrder = async (orderData) => {
  const response = await API.post('/orders', orderData);
  return response.data;
};