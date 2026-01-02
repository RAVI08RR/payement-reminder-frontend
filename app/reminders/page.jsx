"use client";

import React, { useState } from 'react';
import { Bell, Calendar, MessageSquare, Trash2, CheckCircle, Pencil } from 'lucide-react';
import CreateReminderModal from './CreateReminderModal';
import EditReminderModal from './EditReminderModal';

export default function RemindersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [reminders, setReminders] = useState([
    { id: 1, customerName: 'John Doe', type: 'Email', date: '2025-12-15', message: 'Payment due for invoice #101', status: 'Pending' },
    { id: 2, customerName: 'Alice Smith', type: 'SMS', date: '2025-12-18', message: 'Subscription renewal', status: 'Sent' },
  ]);

  const handleCreateReminder = (newReminder) => {
    const reminder = {
      id: Date.now(),
      ...newReminder,
      status: 'Pending',
    };
    setReminders([reminder, ...reminders]);
  };

  const handleUpdateReminder = (updatedReminder) => {
    setReminders(reminders.map(r => r.id === updatedReminder.id ? updatedReminder : r));
    setEditingReminder(null);
  };

  const handleDelete = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reminders</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage automated and manual payment reminders</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <Bell size={18} /> Create Reminder
        </button>
      </div>
      
      {reminders.length === 0 ? (
        <div className="bg-white dark:bg-[#24303F] rounded-xl shadow-sm border border-gray-200 dark:border-[#2E3A47] p-8 text-center text-gray-500 dark:text-gray-400">
          <p>No active reminders found. Start by creating a new one!</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#24303F] rounded-xl shadow-sm border border-gray-200 dark:border-[#2E3A47] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#2E3A47] text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {reminders.map((reminder) => (
                  <tr key={reminder.id} className="hover:bg-gray-50 dark:hover:bg-[#2E3A47]/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {reminder.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reminder.type === 'Email' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        reminder.type === 'SMS' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {reminder.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Calendar size={14} />
                      {reminder.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                      {reminder.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reminder.status === 'Sent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {reminder.status === 'Sent' ? <CheckCircle size={12} /> : <Bell size={12} />}
                        {reminder.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingReminder(reminder)}
                          className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400 transition-colors"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(reminder.id)}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <CreateReminderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateReminder}
      />
      
      <EditReminderModal
        isOpen={!!editingReminder}
        onClose={() => setEditingReminder(null)}
        reminder={editingReminder}
        onUpdate={handleUpdateReminder}
      />
    </div>
  );
}
