'use client';

import React from 'react';
import { User, Bell, Shield, Lock } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div className="mb-8">
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
           <p className="text-gray-500 dark:text-gray-400">Manage admin preferences and system configurations</p>
       </div>

       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <div className="p-6 flex items-start gap-4">
             <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                <User size={24} />
             </div>
             <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Profile Information</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Update your admin profile details.</p>
                <button className="text-indigo-600 font-medium text-sm hover:text-indigo-700">Edit Profile</button>
             </div>
          </div>

          <div className="p-6 flex items-start gap-4">
             <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-600 dark:text-yellow-400">
                <Bell size={24} />
             </div>
             <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Configure system alert preferences.</p>
                <div className="flex items-center gap-2">
                   <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                   <span className="text-sm text-gray-700 dark:text-gray-300">Email Alerts</span>
                </div>
             </div>
          </div>

          <div className="p-6 flex items-start gap-4">
             <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                <Lock size={24} />
             </div>
             <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Security</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Update password and security settings.</p>
                <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Change Password</button>
             </div>
          </div>
       </div>
    </div>
  );
}
