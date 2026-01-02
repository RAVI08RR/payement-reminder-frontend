'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { DollarSign, Clock, CheckCircle, AlertTriangle, Users, Bell, ArrowRight, Mail, Eye } from 'lucide-react';
import Link from 'next/link';
import SmartInsights from '@/components/common/SmartInsights';
import DashboardCharts from '@/components/charts/DashboardCharts';
import { getAdminDashboardStats } from '@/app/api/admin';
import { reminderAPI } from '@/lib/api/reminders';
import ViewReminderModal from '@/components/admin/ViewReminderModal';

const AdminStatsCard = ({ title, value, icon: Icon, color, iconColor }) => (
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

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalPending: 0,
    dueToday: 0,
    completedMonth: 0,
    overdue: 0
  });
  const [analyticsData, setAnalyticsData] = useState(null);
  const [insightsData, setInsightsData] = useState(null);
  const [recentReminders, setRecentReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAdminData();
    fetchRecentReminders();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await getAdminDashboardStats();
      if (response.ok) {
        const data = await response.json();
        
        if (data.stats) {
          setStats({
            totalPending: data.stats.total_pending_amount || 0,
            dueToday: data.stats.payments_due_today || 0,
            completedMonth: data.stats.completed_this_month || 0,
            overdue: data.stats.overdue_payments || 0
          });
        }

        if (data.analytics) {
          setAnalyticsData(data.analytics);
        }
        
        // Data for SmartInsights
        setInsightsData({
            expected_collection: data.expected_collection,
            top_overdue: data.top_overdue
        });
      }
    } catch (error) {
      console.error("Failed to fetch admin dashboard data", error);
    }
  };

  const fetchRecentReminders = async () => {
    try {
      const response = await reminderAPI.getAllReminders();
      if (response.ok) {
        const data = await response.json();
        // Limit to 5 most recent
        setRecentReminders(Array.isArray(data) ? data.slice(0, 5) : []);
      }
    } catch (error) {
      console.error("Failed to fetch recent reminders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewReminder = (reminder) => {
    setSelectedReminder(reminder);
    setIsModalOpen(true);
  };
  
  const chartAnalytics = useMemo(() => {
     if (analyticsData) return analyticsData;
     return null;
  }, [analyticsData]);

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === 'sent') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if (s === 'pending') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <div className="space-y-8">
      <ViewReminderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reminder={selectedReminder}
      />

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Admin! Here's an overview of your payment system.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatsCard 
          title="Total Pending Payments" 
          value={`₹${stats.totalPending.toLocaleString()}`}
          icon={DollarSign} 
          color="bg-blue-50 dark:bg-blue-900/20" 
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <AdminStatsCard 
          title="Payments Due Today" 
          value={stats.dueToday} 
          icon={Clock} 
          color="bg-yellow-50 dark:bg-yellow-900/20" 
          iconColor="text-yellow-600 dark:text-yellow-400"
        />
        <AdminStatsCard 
          title="Completed This Month" 
          value={stats.completedMonth} 
          icon={CheckCircle} 
          color="bg-green-50 dark:bg-green-900/20"
          iconColor="text-green-600 dark:text-green-400"
        />
        <AdminStatsCard 
          title="Overdue Payments" 
          value={stats.overdue} 
          icon={AlertTriangle} 
          color="bg-red-50 dark:bg-red-900/20"
          iconColor="text-red-600 dark:text-red-400"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
                <Link 
                    href="/admin/users" 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                    <Users size={18} /> Manage Users
                </Link>
                <Link 
                    href="/admin/reminders" 
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 rounded-lg font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                >
                    <Bell size={18} /> View Reminders
                </Link>
            </div>
          </div>

          {/* Recent Reminders Table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Reminders</h2>
              <Link href="/admin/reminders" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-gray-900/50">
                    <th className="px-6 py-4">Invoice ID</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Sent At</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                  {loading ? (
                    [...Array(3)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></td>
                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div></td>
                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></td>
                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div></td>
                        <td className="px-6 py-4"></td>
                      </tr>
                    ))
                  ) : recentReminders.length > 0 ? (
                    recentReminders.map((reminder) => (
                      <tr key={reminder.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          <Link 
                            href={`/admin/invoices/${reminder.invoice_id}`}
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          >
                            #{reminder.invoice_id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          <span className="flex items-center gap-1.5 capitalize">
                            <Mail size={14} className="text-gray-400" />
                            {reminder.reminder_type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusStyle(reminder.status)}`}>
                            {reminder.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {reminder.sent_at ? new Date(reminder.sent_at).toLocaleDateString() : (reminder.created_at ? new Date(reminder.created_at).toLocaleDateString() : 'Today')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleViewReminder(reminder)}
                            className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            title="Quick View"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        No recent reminders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1">
          <SmartInsights data={insightsData} />
        </div>
      </div>

      {/* Charts (Full Width at Bottom) */}
      <div className="pt-8 border-t border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Analytics</h2>
        <DashboardCharts analytics={chartAnalytics} />
      </div>
    </div>
  );
}
