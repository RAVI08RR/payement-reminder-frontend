// API Configuration
// Change the base URL here to update it across the entire application

export const API_BASE_URL = 'https://payement-reminder-backend.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/users/login',
  REGISTER: '/users/register',

  // Users
  GET_USERS: '/users/',

  // Invoices
  // Note: These require user_id to be replaced in the path
  CREATE_INVOICE: (userId) => `/users/${userId}/invoices/create`,
  GET_USER_INVOICES: (userId) => `/users/${userId}/invoices/`,
  GET_ALL_INVOICES: (userId) => `/users/${userId}/invoices/all`,
};
