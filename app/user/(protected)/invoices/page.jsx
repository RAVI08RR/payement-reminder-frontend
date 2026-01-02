'use client';

import React, { useEffect, useState } from 'react';
import { userAPI } from '@/lib/api/user';
import { useAuth } from '@/context/AuthContext';
import { Search, FileText, Calendar, DollarSign, Download } from 'lucide-react';

export default function UserInvoicesPage() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchInvoices();
    }
  }, [user]);

  const fetchInvoices = async () => {
    try {
      const response = await userAPI.getInvoices(user.id);
      if (response.ok) {
        const data = await response.json();
        setInvoices(Array.isArray(data) ? data : data.invoices || []);
      }
    } catch (error) {
      console.error('Failed to fetch my invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'overdue': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Invoices</h1>
            <p className="text-gray-500 dark:text-gray-400">View and manage your invoice history</p>
         </div>
         <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            Make a Payment
         </button>
      </div>

      <div className="grid gap-4">
        {loading ? (
           [...Array(3)].map((_, i) => (
             <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 animate-pulse h-24"></div>
           ))
        ) : invoices.length > 0 ? (
          invoices.map((inv) => (
            <div key={inv.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className={`p-3 rounded-full ${getStatusColor(inv.status)}`}>
                    <FileText size={20} />
                  </div>
                  <div>
                     <h3 className="font-bold text-gray-900 dark:text-white">{inv.invoice_number || 'Invoice #'+inv.id}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                       <Calendar size={14} /> Due: {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
               </div>
               
               <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Amount</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">₹{inv.amount?.toLocaleString()}</p>
                  </div>
                  <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <Download size={20} />
                  </button>
               </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
             <FileText size={48} className="mx-auto text-gray-300 mb-2" />
             <p className="text-gray-500">No invoices found</p>
          </div>
        )}
      </div>
    </div>
  );
}
