'use client';

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function DashboardCharts({ analytics }) {
  
  const trendData = useMemo(() => {
    if (!analytics?.monthlyTrend || analytics.monthlyTrend.length === 0) {
      return [];
    }
    return analytics.monthlyTrend.map(item => ({
      name: item.month,
      received: item.paid || 0,
      pending: item.pending || 0
    }));
  }, [analytics]);

  const statusData = useMemo(() => {
     if (!analytics?.paymentStatus) {
         return [];
     }
     const { paid, pending, overdue } = analytics.paymentStatus;
     // Filter out zero values if desired, or keep them.
     return [
        { name: 'Paid', value: paid || 0, color: '#10B981' },     // Emerald 500
        { name: 'Pending', value: pending || 0, color: '#F59E0B' }, // Amber 500
        { name: 'Overdue', value: overdue || 0, color: '#EF4444' }  // Red 500
     ].filter(item => item.value > 0);
  }, [analytics]);

  // Calculate recovery rate for the center of the pie chart
  const recoveryRate = useMemo(() => {
      const total = statusData.reduce((acc, curr) => acc + curr.value, 0);
      if (total === 0) return 0;
      const paid = statusData.find(i => i.name === 'Paid')?.value || 0;
      return Math.round((paid / total) * 100);
  }, [statusData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      
      {/* 1. Monthly Payment Trend (Bar Chart) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Monthly Payment Trend</h3>
          <select className="text-sm border-none bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1 cursor-pointer">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className="h-72 w-full">
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 12 }} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 12 }} 
                />
                <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="received" name="Received" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="pending" name="Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
                No trend data available
            </div>
          )}
        </div>
      </div>

      {/* 2. Pending vs Paid (Donut Chart) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Payment Status</h3>
        <div className="h-64 w-full relative">
          {statusData.length > 0 ? (
            <>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center">
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">{recoveryRate}%</span>
                    <p className="text-xs text-gray-500">Recovery Rate</p>
                </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
                No status data available
            </div>
          )}
        </div>
      </div>

      {/* 3. Overdue by Days (Bar Chart - Styled differently) - CURRENTLY HIDDEN/EMPTY in original code */}

    </div>
  );
}

