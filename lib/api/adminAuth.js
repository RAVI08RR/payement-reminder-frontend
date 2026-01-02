import { API_ENDPOINTS, fetchClient } from '../config';

export const adminAuth = {
  login: async (email, password) => {
    // Ideally this would be API_ENDPOINTS.ADMIN.LOGIN if it existed
    return fetchClient(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password, role: 'admin' }),
    });
  },
  
  signup: async (name, email, password) => {
    return fetchClient(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role: 'admin' }), // Assuming backend accepts role
    });
  }
};
