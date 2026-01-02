import { API_BASE_URL, API_ENDPOINTS } from './config';

/**
 * Authentication API Functions
 * All auth-related API calls are centralized here
 */

/**
 * Login API call
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Response>} - Fetch response object
 */
export const loginAPI = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

/**
 * Register API call
 * @param {string} name - User's full name
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Response>} - Fetch response object
 */
export const registerAPI = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return response;
};
