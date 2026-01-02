import { API_ENDPOINTS, fetchClient } from '../config';

export const reminderAPI = {
  createReminder: async (data) => {
    return fetchClient(API_ENDPOINTS.REMINDERS.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getUserReminders: async (userId) => {
    return fetchClient(API_ENDPOINTS.REMINDERS.USER_REMINDERS(userId));
  },

  getAllReminders: async () => {
    return fetchClient(API_ENDPOINTS.REMINDERS.ALL);
  }
};
