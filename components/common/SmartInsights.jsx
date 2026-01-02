'use client';

import React from 'react';
import { TrendingUp, Users, AlertTriangle, ArrowRight } from 'lucide-react';

export default function SmartInsights({ data }) {
  const expectedCollection = data?.expected_collection || { amount: 0, change_percent: 0 };
  const topOverdueCustomers = data?.top_overdue || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-2 gap-6 mb-8">
      {/* 1. Expected Collection This Week */}
      <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <TrendingUp size={20} className="text-white" />
            </div>
            <h3 className="font-semibold text-lg">Expected Collection</h3>
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold">₹ {expectedCollection.amount?.toLocaleString() || '0'}</span>
          </div>
          <p className="text-indigo-100 text-sm flex items-center gap-1">
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium">
              This Week
            </span>
            <span className="opacity-80 ml-2">
              {expectedCollection.change_percent > 0 ? '+' : ''}{expectedCollection.change_percent}% vs last week
            </span>
          </p>
        </div>
        {/* Decorative Circle */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* 2. Top 5 Overdue Customers */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Top Overdue</h3>
          </div>
          <span className="text-xs text-blue-500 cursor-pointer hover:underline">View All</span>
        </div>
        <div className="space-y-3">
          {topOverdueCustomers.length > 0 ? (
            topOverdueCustomers.slice(0, 3).map((customer, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium text-xs">
                  {customer.name?.charAt(0) || '?'}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{customer.name || 'Unknown'}</p>
                  <p className="text-xs text-red-500">{customer.days_overdue || 0} days overdue</p>
                </div>
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">₹ {customer.amount?.toLocaleString()}</span>
            </div>
          ))
          ) : (
            <div className="text-center text-gray-500 py-4 text-sm">
              No overdue payments found.
            </div>
          )}
        </div>
      </div>

      {/* 3. Predicted Late Payments */}
      {/* <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Users size={20} className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Predicted Late</h3>
          </div>
          <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs px-2 py-1 rounded-full">AI Insight</span>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Based on past behavior, we predict:</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800 dark:text-white">{predictedLateParams.count}</span>
            <span className="text-gray-500 dark:text-gray-400">customers may delay</span>
          </div>
           <p className="text-xs text-red-500 mt-1 font-medium">
            Risk Value: {predictedLateParams.totalRisk}
          </p>
        </div>

        <button className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
          View Predictions <ArrowRight size={16} />
        </button>
      </div> */}
    </div>
  );
}
