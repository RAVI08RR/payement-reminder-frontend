'use client';

import { useState, useEffect } from 'react';

export default function ReminderModal({ isOpen, onClose, payment }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (payment) {
      setMessage(
        `Dear ${payment.customerName},\n\nThis is a friendly reminder that your payment of ₹${payment.amount.toLocaleString()} is due on ${payment.dueDate}.\n\nPlease make the payment at your earliest convenience to avoid any late fees.\n\nThank you for your business!\n\nBest regards,\nPayRemind Team`
      );
    }
  }, [payment]);

  const handleSend = () => {
    console.log('Sending reminder to:', payment.customerName);
    console.log('Email:', payment.email);
    console.log('Message:', message);
    alert(`Reminder sent to ${payment.customerName}!`);
    onClose();
  };

  if (!isOpen || !payment) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-900 backdrop-blur-sm rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#2E3A47]">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Send Payment Reminder</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333A48] transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-6">
            {/* Customer Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-4 border border-blue-100 dark:border-[#2E3A47]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {payment.customerName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{payment.customerName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{payment.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Amount Due</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{payment.amount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">Due Date: {payment.dueDate}</span>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Reminder Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="8"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                suppressHydrationWarning
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-[#333A48] rounded-b-2xl">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 dark:border-[#2E3A47] text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-[#1A222C] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30"
            >
              Send Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
