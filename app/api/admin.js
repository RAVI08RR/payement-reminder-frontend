import { API_BASE_URL } from './config';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Get Admin Dashboard Stats API call
 * @returns {Promise<Response>}
 */
export const getAdminDashboardStats = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return response;
};
