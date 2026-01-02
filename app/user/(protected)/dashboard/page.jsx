'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getUserDashboardStats } from '@/app/api/users';
import { FileText, Clock, CheckCircle, Calendar, Plus } from 'lucide-react';
import DashboardCharts from '@/components/charts/DashboardCharts';

const UserStatsCard = ({ title, value, icon: Icon, color, iconColor }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={22} className={iconColor} />
      </div>
    </div>
  </div>
);

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalInvoices: 0,
    pendingAmount: 0,
    paidAmount: 0,
    nextDue: 'N/A'
  });
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
        const response = await getUserDashboardStats(user.id);
        if (response.ok) {
            const data = await response.json();
            
            // Map API Stats
            setStats({
                totalInvoices: data.summary?.totalInvoices || 0,
                pendingAmount: data.summary?.pendingAmount || 0,
                paidAmount: data.summary?.totalPaid || 0,
                nextDue: data.summary?.nextDueDate ? new Date(data.summary.nextDueDate).toLocaleDateString() : 'N/A'
            });

            // Store Analytics Data for Charts
            setAnalyticsData({
                monthlyTrend: data.paymentTrend || [],
                paymentStatus: data.paymentStatus || {}
            });
        }
    } catch (error) {
        console.error("Failed to fetch dashboard data", error);
    } finally {
        setLoading(false);
    }
  };

  const chartAnalytics = useMemo(() => {
     if (analyticsData) return analyticsData;
     return null;
  }, [analyticsData]);

  return (
    <div className="space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Overview</h1>
           <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, {user?.name || 'User'}! Here is your payment summary.</p>
        </div>
        <Link href="/user/invoices/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-all">
            <Plus size={20} /> Create New Invoice
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <UserStatsCard 
            title="My Invoices" 
            value={stats.totalInvoices} 
            icon={FileText} 
            color="bg-blue-50 dark:bg-blue-900/20" 
            iconColor="text-blue-600 dark:text-blue-400"
        />
        <UserStatsCard 
            title="Pending Amount" 
            value={`₹${stats.pendingAmount.toLocaleString()}`} 
            icon={Clock} 
            color="bg-yellow-50 dark:bg-yellow-900/20" 
            iconColor="text-yellow-600 dark:text-yellow-400"
        />
        <UserStatsCard 
            title="Total Paid" 
            value={`₹${stats.paidAmount.toLocaleString()}`} 
            icon={CheckCircle} 
            color="bg-green-50 dark:bg-green-900/20" 
            iconColor="text-green-600 dark:text-green-400"
        />
        <UserStatsCard 
            title="Next Due Date" 
            value={stats.nextDue} 
            icon={Calendar} 
            color="bg-red-50 dark:bg-red-900/20" 
            iconColor="text-red-600 dark:text-red-400"
        />
      </div>

      {/* Graphs Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Analytics</h2>
        <DashboardCharts analytics={chartAnalytics} />
      </div>
    </div>
  );
}
