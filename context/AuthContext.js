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
      const response = await authAPI.login(email, password, expectedRole);
      
      if (!response.ok) {
        if (response.status === 401) return { success: false, error: 'Invalid credentials' };
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.message || errorData.detail || 'Login failed' };
      }

      const data = await response.json();
      console.log('Login Response Data:', data);

      const userObj = data.user || data;
      const token = data.access_token || data.token || userObj.token;
      
      const role = userObj.role || userObj.user_type || data.role || (email.includes('admin') ? 'admin' : 'user');

      if (expectedRole && role !== expectedRole) {
         return { success: false, error: `Access Denied: You are not authorized as ${expectedRole}` };
      }

      const userData = {
        id: userObj.id || userObj.user_id || userObj._id,
        name: userObj.name || email.split('@')[0],
        email: userObj.email || email,
        role: role, 
      };
      
      if (token) localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

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

  const register = async (name, email, password, role) => {
    try {
      const response = await authAPI.register(name, email, password, role);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.message || errorData.detail || 'Registration failed' };
      }

      const data = await response.json();
      console.log('Registration Response Data:', data);

      // If backend returns a token upon registration, log them in
      if (data.access_token || data.token) {
        const userObj = data.user || data;
        const token = data.access_token || data.token;
        const userRole = userObj.role || userObj.user_type || role;

        const userData = {
          id: userObj.id || userObj.user_id || userObj._id,
          name: userObj.name || name,
          email: userObj.email || email,
          role: userRole,
        };

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);

        if (userRole === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/user/dashboard');
        }
        return { success: true };
      }

      // If no token, redirect to login
      router.push(role === 'admin' ? '/admin/login?registered=true' : '/user/login?registered=true');
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      console.error('Registration error:', error);
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
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
