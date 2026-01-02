'use client';

import React from 'react';
import { X, Bell, Calendar, User, FileText, Mail, Info, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ViewReminderModal({ isOpen, onClose, reminder }) {
  if (!isOpen || !reminder) return null;

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'sent':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
            <CheckCircle size={14} /> Sent
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800">
            <Clock size={14} /> Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
            <AlertCircle size={14} /> Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-linear-to-r from-indigo-50 to-white dark:from-gray-700 dark:to-gray-800">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Bell size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Reminder Details</h3>
            </div>
            <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <X size={20} />
            </button>
        </div>
        
        {/* Body */}
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Reminder Status</p>
                    {getStatusBadge(reminder.status)}
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sent Date</p>
                    <div className="flex items-center justify-end gap-1.5 text-gray-900 dark:text-white font-semibold">
                        <Calendar size={16} className="text-indigo-500" />
                        {reminder.sent_at ? new Date(reminder.sent_at).toLocaleString() : (reminder.created_at ? new Date(reminder.created_at).toLocaleString() : 'N/A')}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                        <FileText size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Invoice Info</span>
                    </div>
                    <Link 
                        href={`/admin/invoices/${reminder.invoice_id}`}
                        className="group"
                    >
                        <div className="flex items-center gap-1">
                            <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">#{reminder.invoice_id}</p>
                            <ExternalLink size={14} className="text-gray-400 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                        {reminder.invoice_number && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-indigo-400/80 transition-colors">{reminder.invoice_number}</p>
                        )}
                    </Link>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                        <User size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">User ID</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{reminder.user_id}</p>
                </div>
            </div>

            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400">
                    <Mail size={18} />
                    <span className="text-sm font-bold uppercase tracking-wider">Reminder Message</span>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs font-medium text-indigo-500 dark:text-indigo-400 mb-1">Type</p>
                        <p className="text-gray-900 dark:text-white font-medium capitalize">{reminder.reminder_type} Reminder</p>
                    </div>
                    <div>
                         <p className="text-xs font-medium text-indigo-500 dark:text-indigo-400 mb-1">System Note</p>
                         <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
                            "Automatic payment reminder sent to the customer for invoice #{reminder.invoice_id}. 
                            Status: {reminder.status}."
                         </p>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/30 text-amber-800 dark:text-amber-400">
                <Info size={18} className="mt-0.5 shrink-0" />
                <p className="text-xs leading-relaxed">
                    This reminder was triggered based on the due date of the invoice. 
                    If the status is 'Sent', the customer should have received an email notification.
                </p>
            </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-700 flex justify-end">
            <button 
                onClick={onClose} 
                className="px-6 py-2.5 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-xl font-semibold transition-all shadow-lg active:scale-95"
            >
                Close View
            </button>
        </div>
      </div>
    </div>
  );
}
