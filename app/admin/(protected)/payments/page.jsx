'use client';

import React from 'react';
import { CreditCard, Download, Filter } from 'lucide-react';

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Transactions</h1>
           <p className="text-gray-500 dark:text-gray-400">Monitor all system payments</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
             <Filter size={16} /> Filter
           </button>
           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700">
             <Download size={16} /> Export
           </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
         <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard size={32} className="text-blue-500" />
         </div>
         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Payments Yet</h3>
         <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Payment records will appear here once users start settling their invoices.
         </p>
      </div>
    </div>
  );
}
