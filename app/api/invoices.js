import { API_BASE_URL, API_ENDPOINTS } from './config';

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
 * Create Invoice API call
 * @param {number} userId - The ID of the user creating the invoice
 * @param {Object} invoiceData - object containing invoice_number, customer_name, amount, issue_date, due_date
 * @returns {Promise<Response>}
 */
export const createInvoiceAPI = async (userId, invoiceData) => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CREATE_INVOICE(userId)}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(invoiceData),
  });
  return response;
};

/**
 * Get User Invoices API call
 * @param {number} userId - The ID of the user
 * @returns {Promise<Response>}
 */
export const getUserInvoicesAPI = async (userId) => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_USER_INVOICES(userId)}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return response;
};

/**
 * Get All Invoices API call
 * Note: The API path is /users/{user_id}/invoices/all.
 * It seems to get all invoices possibly for admin or filtered by user context if backend enforces it.
 * @param {number} userId - The ID of the user
 * @returns {Promise<Response>}
 */
export const getAllInvoicesAPI = async (userId) => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_INVOICES(userId)}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return response;
};
