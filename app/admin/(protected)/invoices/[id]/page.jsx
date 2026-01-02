'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api/admin';
import { 
  FileText, 
  User, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft, 
  Download, 
  Mail,
  MoreVertical,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

export default function InvoiceDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchInvoiceDetails();
    }
  }, [id]);

  const fetchInvoiceDetails = async () => {
    try {
      const response = await adminAPI.getInvoice(id);
      if (response.ok) {
        const data = await response.json();
        setInvoice(data);
      }
    } catch (error) {
      console.error('Failed to fetch invoice details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'paid':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'paid': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'overdue': return <AlertCircle size={16} />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-full text-red-500 mb-4">
          <AlertCircle size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Invoice Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The invoice you're looking for doesn't exist or you don't have access.</p>
        <Link 
          href="/admin/invoices"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-md active:scale-95"
        >
          <ArrowLeft size={20} /> Back to Invoices
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {invoice.invoice_number || `Invoice #${invoice.id}`}
                </h1>
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(invoice.status)}`}>
                  {getStatusIcon(invoice.status)}
                  {invoice.status || 'Pending'}
                </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Created on {invoice.created_at ? new Date(invoice.created_at).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
                <Download size={18} /> Download PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-md active:scale-95">
                <Mail size={18} /> Resend Invoice
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details Panel */}
        <div className="lg:col-span-2 space-y-8">
            {/* Invoice Summary Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText size={20} className="text-indigo-500" />
                        Invoice Summary
                    </h3>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Amount Due</p>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white">₹{invoice.amount?.toLocaleString() || '0'}</h2>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Due Date</p>
                            <div className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                                <Calendar size={20} className="text-amber-500" />
                                {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A'}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Description</p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                            {invoice.description || "No project description provided for this invoice."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Line Items Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
                     <h3 className="text-lg font-bold text-gray-900 dark:text-white">Line Items</h3>
                </div>
                <div className="p-0">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-900/50 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                                <th className="px-6 py-4">Item Description</th>
                                <th className="px-6 py-4 text-right">Qty</th>
                                <th className="px-6 py-4 text-right">Price</th>
                                <th className="px-6 py-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            <tr>
                                <td className="px-6 py-5 text-sm font-medium text-gray-900 dark:text-white">
                                    {invoice.description || "Service Rendering / Product Delivery"}
                                </td>
                                <td className="px-6 py-5 text-sm text-right text-gray-600 dark:text-gray-300">1</td>
                                <td className="px-6 py-5 text-sm text-right text-gray-600 dark:text-gray-300">₹{invoice.amount?.toLocaleString() || '0'}</td>
                                <td className="px-6 py-5 text-sm font-bold text-right text-gray-900 dark:text-white">₹{invoice.amount?.toLocaleString() || '0'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 flex justify-end">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span>₹{invoice.amount?.toLocaleString() || '0'}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Tax (0%)</span>
                            <span>₹0</span>
                        </div>
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-gray-900 dark:text-white text-lg">
                            <span>Total</span>
                            <span>₹{invoice.amount?.toLocaleString() || '0'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
            {/* Customer Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Customer Details</h3>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                        {(invoice.customer_name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white">{invoice.customer_name || 'Individual Client'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">User ID: {invoice.user_id}</p>
                    </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <Mail size={16} className="text-indigo-500" />
                        {invoice.user?.email || 'email@example.com'}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <Briefcase size={16} className="text-indigo-500" />
                        Organization Name
                    </div>
                </div>
                <Link 
                    href={`/admin/users/${invoice.user_id}`}
                    className="mt-6 block w-full py-2.5 bg-gray-50 dark:bg-gray-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-semibold rounded-xl text-center hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all border border-indigo-100 dark:border-indigo-900/30"
                >
                    View User Profile
                </Link>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                <div className="relative z-10">
                    <h3 className="font-bold mb-2">Payment Link</h3>
                    <p className="text-xs text-indigo-100 mb-6 leading-relaxed">
                        Copy the payment URL to share it directly with the client for quick settlement.
                    </p>
                    <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-sm font-bold transition-all border border-white/20">
                        Copy Secure Link
                    </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            </div>
        </div>
      </div>
    </div>
  );
}
