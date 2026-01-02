import { API_ENDPOINTS, fetchClient } from '../config';

export const userAuth = {
  login: async (email, password) => {
    return fetchClient(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  signup: async (name, email, password) => {
    return fetchClient(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role: 'user' }), // Explicitly setting role
    });
  }
};
