'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Building, Phone, Camera, Save, X } from 'lucide-react';
import { userAPI } from '@/lib/api/user';
import { useRouter } from 'next/navigation';

export default function UserProfilePage() {
  const { user, login, updateUser } = useAuth(); // Assuming login or setUser serves to update context
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
  });

  useEffect(() => {
    if (user) {
        setFormData({
            name: user.name || '',
            email: user.email || '',
            password: '' // Keep empty unless changing
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
        const payload = {
            name: formData.name,
            email: formData.email,
        };
        // Only include password if provided
        if (formData.password) {
            payload.password = formData.password;
        }

        const response = await userAPI.updateProfile(user.id, payload);
        
        if (response.ok) {
            setMessage('Profile updated successfully!');
            // Update local context immediately
            updateUser({
                name: payload.name || formData.name, 
                email: payload.email || formData.email
            });
            setIsEditing(false);
            router.refresh();
        } else {
            const data = await response.json();
            setMessage(data.message || 'Failed to update profile');
        }
    } catch (error) {
        console.error(error);
        setMessage('An error occurred');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
         <p className="text-gray-500 dark:text-gray-400">Manage your account information</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
         {/* Cover / Header */}
         <div className="h-32 bg-linear-to-r from-blue-500 to-indigo-600"></div>
         
         <div className="px-8 pb-8 relative">
            <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full border-4 border-white dark:border-gray-800 absolute -top-12 flex items-center justify-center text-3xl font-bold text-indigo-600 shadow-md">
               {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            
            <div className="pt-16 pb-6 border-b border-gray-100 dark:border-gray-700">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
               <p className="text-gray-500 dark:text-gray-400 capitalize">{user?.role || user?.user_type || 'Customer'}</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg text-sm ${message.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="pt-6 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-500">
                      <User size={20} />
                   </div>
                   <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Full Name</p>
                      {isEditing ? (
                          <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      ) : (
                          <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                      )}
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-500">
                      <Mail size={20} />
                   </div>
                   <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Email Address</p>
                      {isEditing ? (
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      ) : (
                          <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
                      )}
                   </div>
                </div>

                {isEditing && (
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-500">
                            <Building size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">New Password (Optional)</p>
                            <input 
                                type="password" 
                                name="password"
                                placeholder="Leave blank to keep current"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                )}
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-right">
               {!isEditing ? (
                   <button 
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                   >
                      Edit Profile
                   </button>
               ) : (
                   <div className="flex gap-3 justify-end">
                       <button 
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                       >
                          Cancel
                       </button>
                       <button 
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70 flex items-center gap-2"
                       >
                          {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                       </button>
                   </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
