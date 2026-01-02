"use client";

import React, { useState, useEffect } from "react";
import { FileText, DollarSign, Calendar, X, User } from "lucide-react";
import { createInvoiceAPI } from "../api/invoices";
import { getUsersAPI } from "../api/users";
import { useAuth } from "./AuthContext";

export default function AddInvoiceModal({ isOpen, onClose }) {
  const { user } = useAuth(); // Get current user
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    amount: "",
    dueDate: "",
    invoiceNo: "INV-" + Math.floor(1000 + Math.random() * 9000), 
  });

  // Fetch customers (users) when modal opens
  useEffect(() => {
    if (isOpen) {
        // Regenerate invoice ID
        setFormData(prev => ({
            ...prev,
            invoiceNo: "INV-" + Math.floor(1000 + Math.random() * 9000)
        }));

        const fetchCustomers = async () => {
            try {
                const response = await getUsersAPI();
                if (response.ok) {
                    const data = await response.json();
                    setCustomers(data);
                }
            } catch (error) {
                console.error("Failed to fetch customers", error);
            }
        };
        fetchCustomers();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    if (e.target.name === 'customer') {
        const selectedId = e.target.value;
        const selectedCustomer = customers.find(c => c.id.toString() === selectedId);
        setFormData({
            ...formData,
            customerId: selectedId,
            customerName: selectedCustomer ? (selectedCustomer.name || selectedCustomer.email) : ""
        });
    } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
        alert("User session not found. Please login again.");
        return;
    }

    setLoading(true);
    try {
        console.log("Creating invoice:", formData);
        
        // Prepare payload - Adapt keys to what backend likely expects
        const payload = {
            invoice_number: formData.invoiceNo,
            customer_name: formData.customerName, 
            customer_email: customers.find(c => c.id.toString() === formData.customerId)?.email,
            amount: parseFloat(formData.amount),
            due_date: formData.dueDate,
            issue_date: new Date().toISOString().split('T')[0],
            status: "Pending" 
        };

        const response = await createInvoiceAPI(user.id, payload);
        
        if (response.ok) {
            // Success
            onClose();
            // Reset form
            setFormData({
                customerId: "",
                customerName: "",
                amount: "",
                dueDate: "",
                invoiceNo: "INV-" + Math.floor(1000 + Math.random() * 9000),
            });
            // Ideally trigger a refresh of the dashboard here
            window.location.reload(); // Simple refresh for now to update data
        } else {
            const err = await response.json().catch(() => ({}));
            alert(`Failed to create invoice: ${err.detail || 'Unknown error'}`);
        }
    } catch (error) {
        console.error("Error creating invoice:", error);
        alert("An error occurred.");
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#00000005] bg-opacity-50 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-900 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full transform transition-all border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#2E3A47]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Create New Invoice
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333A48] transition-colors text-gray-500 dark:text-gray-400"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Customer
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  name="customer"
                  value={formData.customerId}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select a customer...</option>
                  {customers.map(c => (
                      <option key={c.id} value={c.id}>{c.name || c.email}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Invoice Number
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={formData.invoiceNo}
                  readOnly
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-[#2E3A47] text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A222C] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Invoice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
