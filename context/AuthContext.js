'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authAPI } from '../lib/api/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check local storage on initial load
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, expectedRole) => {
    try {
      // Use the appropriate auth method if needed, but for now generic login is fine
      // Pass expectedRole if present (e.g. 'admin') so backend knows context
      const response = await authAPI.login(email, password, expectedRole);
      
      if (!response.ok) {
        if (response.status === 401) return { success: false, error: 'Invalid credentials' };
        return { success: false, error: 'Login failed' };
      }

      const data = await response.json();
      console.log('Login Response Data:', data); // Debugging

      const userObj = data.user || data; // Fallback if user is at root
      const token = data.token || data.access_token || userObj.token;
      
      // Determine Role
      // Backend returns 'user_type' sometimes instead of 'role'
      const role = userObj.role || userObj.user_type || data.role || (email.includes('admin') ? 'admin' : 'user');

      // Role Mismatch Check
      if (expectedRole && role !== expectedRole) {
         return { success: false, error: `Access Denied: You are not authorized as ${expectedRole}` };
      }

      const userData = {
        id: userObj.id || userObj.user_id || userObj._id, // Added _id fallback
        name: userObj.name || email.split('@')[0],
        email: email,
        role: role, 
      };
      
      console.log('Processed User Data:', userData); // Debugging

      // Save session
      if (token) localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Redirect based on role
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const updateUser = (userData) => {
    setUser(prev => {
        const newUser = { ...prev, ...userData };
        localStorage.setItem('user', JSON.stringify(newUser));
        return newUser;
    });
  };

  const logout = () => {
    // Determine redirect path based on user role
    const redirectPath = user?.role === 'admin' ? '/admin/login' : '/user/login';
    
    authAPI.logout(); // Optional: Call backend to invalidate token if your API supports it
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    router.push(redirectPath);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
