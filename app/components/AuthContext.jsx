'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAPI, registerAPI } from '../api/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginAPI(email, password);

      if (!response.ok) {
        if (response.status === 401) {
          return { success: false, error: 'Invalid email or password.' };
        } else if (response.status === 404) {
          return { success: false, error: 'User not found.' };
        }
        return { success: false, error: 'Login failed. Please try again.' };
      }

      const data = await response.json();
      const token = data.token || data.access_token;
      
      console.log('Login API Response:', data); // Debugging log

      // Store token immediately to allow subsequent requests
      if (token) {
        localStorage.setItem('token', token);
      }

      // If user data is missing ID, fetch it from GET_USERS
      // CRITICAL FIX: Use 'email' argument from function scope as fallback, as API response might not return it.
      // Also check for nested 'user' object which is common in API responses
      let userData = {
        id: data.id || data.user_id || data.userId || data.user?.id || data.user?.user_id || data.user?.userId || data.User?.id,
        name: data.name || data.full_name || data.username || data.user?.name || data.user?.full_name || data.user?.username || data.email?.split('@')[0] || email.split('@')[0],
        email: data.email || data.user?.email || email,
        role: data.role || data.user?.role || 'User',
      };

      if (!userData.id && token) {
        console.warn('Login: User ID missing in login response, attempting to fetch from users list...');
        try {
          // Fetch all users to find the current user's ID
          // Dynamically import to avoid circular dependency if any
          const { getUsersAPI } = await import('../api/users');
          const usersResponse = await getUsersAPI(token);
          
          if (usersResponse.ok) {
            const users = await usersResponse.json();
            console.log('Login: Fetched users list:', users.length);
            
            // Try to find user case-insensitively
            const currentUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            
            if (currentUser) {
              console.log('Login: Found user in list:', currentUser);
              userData = {
                id: currentUser.id,
                name: currentUser.name || currentUser.full_name || currentUser.username || userData.name,
                email: currentUser.email,
                role: currentUser.role || userData.role,
              };
            } else {
              console.error('Login: User not found in users list for email:', email);
            }
          } else {
            console.error('Login: Failed to fetch users list', usersResponse.status);
          }
        } catch (fetchError) {
          console.error("Failed to fetch user details:", fetchError);
        }
      }
      
      if (!userData.id) {
         console.error("CRITICAL: Login successful but User ID could not be determined.");
         // Potentially show an error to user or proceed with limited functionality?
         // For now, let's proceed but warn.
      }

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        return { success: false, error: 'Unable to connect to the server. Please check your internet connection or the server might be down.' };
      }
      return { success: false, error: 'Network error. Please check your connection and try again.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await registerAPI(name, email, password);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 400) {
          return { success: false, error: errorData.detail || 'User already exists with this email.' };
        } else if (response.status === 422) {
          return { success: false, error: 'Invalid input. Please check your information.' };
        }
        return { success: false, error: 'Registration failed. Please try again.' };
      }

      const data = await response.json();
      
      // Store user data
      const userData = {
        id: data.id,
        name: data.name || name, // Fallback to input name if response doesn't have it
        email: data.email,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Store token if provided
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error. Please check your connection and try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
