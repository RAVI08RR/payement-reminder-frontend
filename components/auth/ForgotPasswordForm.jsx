'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { userAPI } from '@/lib/api/user';
import { KeyRound, Eye, EyeOff, Hash, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await userAPI.changePassword(userId, oldPassword, newPassword);
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/user/login');
        }, 3000);
      } else {
        setError(data.detail || data.message || 'Failed to change password. Please check your User ID and credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle2 size={32} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Password Changed Successfully!</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">You will be redirected to the login page shortly.</p>
        <button
          onClick={() => router.push('/user/login')}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Click here if not redirected
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2">
          <KeyRound size={16} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User ID</label>
          <div className="relative">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-10"
              placeholder="Enter your User ID"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Hash size={18} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Old Password</label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}
