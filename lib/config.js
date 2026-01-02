export const API_BASE_URL = 'https://payement-reminder-backend.onrender.com';

export const API_ENDPOINTS = {
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users', 
    INVOICES: '/admin/invoices',
    PAYMENTS: '/payments/all',
  },
  USER: {
    ME: '/users/me',
    INVOICES: (id) => `/users/${id}/invoices/`,
    PAYMENTS: (id) => `/users/${id}/payments/`,
    CHANGE_PASSWORD: (id) => `/users/change-password/${id}`,
  },
  REMINDERS: {
    CREATE: '/reminders/create',
    USER_REMINDERS: (id) => `/reminders/user/${id}/reminders`,
    ALL: '/reminders/admin/reminders',
  },
  AUTH: {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
  }
};

// Helper for making authenticated requests
export const fetchClient = async (endpoint, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Auto-handle 401 (Unauthorized)
    if (response.status === 401) {
       if (typeof window !== 'undefined') {
         // Optional: Redirect to login or clear bad token
         // localStorage.removeItem('token');
         // window.location.href = '/login'; 
       }
    }

    return response;
  } catch (error) {
    console.error(`API Call Failed: ${endpoint}`, error);
    throw error;
  }
};
