"use client";

import React from "react";
import { MessageCircle, CheckCircle, FileText } from "lucide-react";

const activityData = [
  {
    id: 1,
    text: "Reminder sent to Ravi Kumar",
    time: "2 hours ago",
    icon: MessageCircle,
    color: "text-blue-500",
  },
  {
    id: 2,
    text: "Payment received from Priya",
    time: "5 hours ago",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    id: 3,
    text: "Invoice created for Manish",
    time: "1 day ago",
    icon: FileText,
    color: "text-indigo-500",
  },
  {
    id: 4,
    text: "New customer added: Sneha",
    time: "2 days ago",
    icon: FileText,
    color: "text-purple-500",
  },
];

export default function RecentActivities() {
  return (
    <div className="bg-white dark:bg-[#24303F] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-[#2E3A47] h-full">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activityData.map((activity) => (
          <div key={activity.id} className="flex gap-4 items-start">
            <div className={`mt-1 ${activity.color}`}>
              <activity.icon size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {activity.text}
              </p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
