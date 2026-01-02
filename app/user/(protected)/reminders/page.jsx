'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { reminderAPI } from '@/lib/api/reminders';
import { userAPI } from '@/lib/api/user';
import { Bell, Plus, Calendar, CheckCircle, Clock, X, FileText, Mail } from 'lucide-react';

export default function UserRemindersPage() {
  const { user } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  
  // Revised Form State matching payload
  const [formData, setFormData] = useState({
    invoice_id: '',
    reminder_type: 'email',
    status: 'sent', // Defaulting to 'sent' based on example, or user can choose?
    user_id: '' 
  });

  const fetchData = async () => {
    try {
        if(!user?.id) return;
        
        // Parallel fetch for reminders and invoices
        const [remindersRes, invoicesRes] = await Promise.all([
            reminderAPI.getUserReminders(user.id),
            userAPI.getInvoices(user.id)
        ]);

        if (remindersRes.ok) {
            const data = await remindersRes.json();
            setReminders(Array.isArray(data) ? data : []); 
        }

        if (invoicesRes.ok) {
            const invData = await invoicesRes.json();
            setInvoices(Array.isArray(invData) ? invData : []);
        }

    } catch (error) {
        console.error('Failed to fetch data:', error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
        setFormData(prev => ({ ...prev, user_id: user.id }));
        fetchData();
    }
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
        const payload = {
            user_id: user.id,
            invoice_id: parseInt(formData.invoice_id),
            reminder_type: formData.reminder_type,
            status: formData.status
        };
        
        const response = await reminderAPI.createReminder(payload);
        if (response.ok) {
            setIsModalOpen(false);
            setFormData({
                invoice_id: '',
                reminder_type: 'email',
                status: 'sent',
                user_id: user.id
            });
            fetchData(); // Refresh list
        } else {
            alert('Failed to create reminder');
        }
    } catch (error) {
        console.error(error);
        alert('Error creating reminder');
    } finally {
        setCreating(false);
    }
  };

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'sent': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'failed': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reminders</h1>
           <p className="text-gray-500 dark:text-gray-400">Manage your payment reminders</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
            <Plus size={20} /> New Reminder
        </button>
      </div>

      {loading ? (
         <div className="flex justify-center py-12">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
         </div>
      ) : reminders.length === 0 ? (
         <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
             <div className="mx-auto w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-4">
                 <Bell className="text-indigo-600 dark:text-indigo-400" size={32} />
             </div>
             <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reminders found</h3>
             <p className="text-gray-500 dark:text-gray-400 mb-6">Create a reminder for your invoices.</p>
             <button 
                onClick={() => setIsModalOpen(true)}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
             >
                Create your first reminder
             </button>
         </div>
      ) : (
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             {reminders.map((reminder) => (
                 <div key={reminder.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex justify-between items-start mb-4">
                        <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[reminder.status?.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
                            {reminder.status}
                        </div>
                        <Bell size={18} className="text-gray-400" />
                     </div>
                     
                     <div className="flex items-center gap-2 mb-2">
                        <FileText size={16} className="text-indigo-500" />
                        <span className="font-medium text-gray-900 dark:text-white">Invoice #{reminder.invoice_id}</span>
                     </div>
                     
                     <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <Mail size={14} />
                        <span className="capitalize">{reminder.reminder_type} Reminder</span>
                     </div>

                     {/* If backend returns date, show it, otherwise omit */}
                     {reminder.created_at && (
                         <div className="flex items-center gap-2 text-xs text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <Clock size={12} />
                            <span>Created: {new Date(reminder.created_at).toLocaleDateString()}</span>
                         </div>
                     )}
                 </div>
             ))}
         </div>
      )}

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md shadow-xl overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Send Reminder</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                        <X size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleCreate} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Invoice</label>
                        <select 
                            required
                            className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.invoice_id}
                            onChange={(e) => setFormData({...formData, invoice_id: e.target.value})}
                        >
                            <option value="">-- Choose Invoice --</option>
                            {invoices.map(inv => (
                                <option key={inv.id} value={inv.id}>
                                    Invoice #{inv.invoice_number || inv.id} - {inv.amount} ({inv.status})
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reminder Type</label>
                        <select 
                            className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.reminder_type}
                            onChange={(e) => setFormData({...formData, reminder_type: e.target.value})}
                        >
                            <option value="email">Email</option>
                            <option value="sms">SMS</option>
                            <option value="whatsapp">WhatsApp</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                        <select 
                            className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="pending">Pending</option>
                            <option value="sent">Sent</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>

                    <div className="pt-2 flex gap-3 justify-end">
                        <button 
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={creating}
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
                        >
                            {creating ? 'Sending...' : 'Send Reminder'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}
