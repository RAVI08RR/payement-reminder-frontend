'use client';

import React, { useState, useEffect } from 'react';
import { reminderAPI } from '@/lib/api/reminders';
import { Bell, Calendar, User, Search, FileText, Mail, ArrowRight, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import Link from 'next/link';
import ViewReminderModal from '@/components/admin/ViewReminderModal';

export default function AdminRemindersPage() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReminders = async () => {
    try {
        const response = await reminderAPI.getAllReminders();
        if (response.ok) {
            const data = await response.json();
            setReminders(Array.isArray(data) ? data : []); 
        }
    } catch (error) {
        console.error('Failed to fetch reminders:', error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleViewReminder = (reminder) => {
    setSelectedReminder(reminder);
    setIsModalOpen(true);
  };

  const filteredReminders = reminders.filter(rem => 
    rem.reminder_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rem.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(rem.invoice_id).includes(searchTerm) ||
    String(rem.user_id).includes(searchTerm) ||
    rem.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'sent':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle size={12} /> Sent
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock size={12} /> Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <AlertCircle size={12} /> Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <ViewReminderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reminder={selectedReminder}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Reminders</h1>
           <p className="text-gray-500 dark:text-gray-400">View and manage system payment reminders</p>
        </div>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
                type="text"
                placeholder="Search by ID, type or status..."
                className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm">
                <th className="p-4 font-medium">Invoice</th>
                <th className="p-4 font-medium">User ID</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Sent Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                // Skeleton Loader
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div></td>
                    <td className="p-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div></td>
                    <td className="p-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div></td>
                    <td className="p-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></td>
                    <td className="p-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div></td>
                    <td className="p-4"></td>
                  </tr>
                ))
              ) : filteredReminders.length > 0 ? (
                filteredReminders.map((reminder) => (
                  <tr key={reminder.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-indigo-500" />
                        <Link 
                          href={`/admin/invoices/${reminder.invoice_id}`}
                          className="font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          #{reminder.invoice_id} {reminder.invoice_number && `(${reminder.invoice_number})`}
                        </Link>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                       <span className="flex items-center gap-1">
                          <User size={14} className="text-gray-400" />
                          {reminder.user_id}
                       </span>
                    </td>
                    <td className="p-4">
                       <span className="capitalize text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                          <Mail size={14} className="text-gray-400" />
                          {reminder.reminder_type}
                       </span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(reminder.status)}
                    </td>
                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                       <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {reminder.sent_at ? new Date(reminder.sent_at).toLocaleDateString() : (reminder.created_at ? new Date(reminder.created_at).toLocaleDateString() : 'N/A')}
                       </div>
                    </td>
                    <td className="p-4 text-right">
                       <div className="flex justify-end items-center gap-2">
                          <button 
                            onClick={() => handleViewReminder(reminder)}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <Link 
                            href={`/admin/invoices/${reminder.invoice_id}`}
                            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium flex items-center gap-1 ml-2"
                          >
                            Invoice <ArrowRight size={14} />
                          </Link>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center">
                      <Bell size={48} className="mb-2 opacity-20" />
                      <p className="text-lg font-medium">No reminders found</p>
                      <p className="text-sm">There are no reminders matching your search criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
