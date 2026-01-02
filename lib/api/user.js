import { API_ENDPOINTS, fetchClient } from '../config';

export const userAPI = {
  getProfile: async () => {
    // Falls back to generic user fetch or 'me' endpoint if exists
    // For now using the User ID logic from context usually
    return fetchClient(API_ENDPOINTS.USER.ME); 
  },

  getInvoices: async (userId) => {
    return fetchClient(API_ENDPOINTS.USER.INVOICES(userId));
  },

  createInvoice: async (userId, data) => {
    return fetchClient(`/users/${userId}/invoices/create`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getPayments: async (userId) => {
    // Assuming payments likely tied to invoices or separate endpoint
    return fetchClient(API_ENDPOINTS.USER.PAYMENTS(userId));
  },

  updateProfile: async (userId, data) => {
    return fetchClient(`/users/${userId}`, {
        method: 'PUT',
    });
  },

  changePassword: async (userId, oldPassword, newPassword) => {
    return fetchClient(API_ENDPOINTS.USER.CHANGE_PASSWORD(userId), {
      method: 'POST',
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
  }
};
