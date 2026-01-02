'use client';

import React from 'react';
import { CreditCard, History } from 'lucide-react';

export default function UserPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment History</h1>
         <p className="text-gray-500 dark:text-gray-400">View your past transactions</p>
      </div>

       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
         <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <History size={32} className="text-green-500" />
         </div>
         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Transactions Found</h3>
         <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            You haven't made any payments yet. Payments will appear here once processed.
         </p>
      </div>
    </div>
  );
}
