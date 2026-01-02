"use client";

import React, { useState } from "react";
import {
  Bell,
  Search,
  User,
  LayoutDashboard,
  Users,
  FileText,
  Clock,
  BarChart,
  Settings,
  Menu,
  Plus,
  Download,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  MessageCircle,
  Smartphone,
  Calendar,
  Filter,
} from "lucide-react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

// --- Dummy Data ---

const summaryData = [
  {
    title: "Total Customers",
    count: "1,248",
    trend: "+5%",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Pending Payments",
    count: "₹ 4.2L",
    trend: "+12%",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Paid Payments",
    count: "₹ 18.5L",
    trend: "+8%",
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Overdue Payments",
    count: "₹ 1.1L",
    trend: "-2%",
    icon: AlertCircle,
    color: "bg-red-100 text-red-600",
  },
];

const paymentData = [
  {
    id: 1,
    name: "Ravi Kumar",
    phone: "+91 98765 43210",
    invoice: "INV-001",
    amount: "₹ 12,000",
    date: "10 Dec 2024",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    invoice: "INV-002",
    amount: "₹ 8,500",
    date: "08 Dec 2024",
    status: "Paid",
  },
  {
    id: 3,
    name: "Amit Verma",
    phone: "+91 76543 21098",
    invoice: "INV-003",
    amount: "₹ 24,000",
    date: "01 Dec 2024",
    status: "Overdue",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    phone: "+91 65432 10987",
    invoice: "INV-004",
    amount: "₹ 5,000",
    date: "11 Dec 2024",
    status: "Pending",
  },
  {
    id: 5,
    name: "Vikram Singh",
    phone: "+91 99887 76655",
    invoice: "INV-005",
    amount: "₹ 15,000",
    date: "05 Dec 2024",
    status: "Paid",
  },
];

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
];

const revenueData = [
  { name: "Jan", collected: 4000, pending: 2400 },
  { name: "Feb", collected: 3000, pending: 1398 },
  { name: "Mar", collected: 2000, pending: 9800 },
  { name: "Apr", collected: 2780, pending: 3908 },
  { name: "May", collected: 1890, pending: 4800 },
  { name: "Jun", collected: 2390, pending: 3800 },
  { name: "Jul", collected: 3490, pending: 4300 },
];

// --- Components ---

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Customers", icon: Users },
    { name: "Invoices", icon: FileText },
    { name: "Reminders", icon: Bell },
    { name: "Reports", icon: BarChart },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold text-gray-800">PayReminder</span>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden text-gray-500">
          <XCircle size={24} />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`flex items-center w-full p-3 gap-3 rounded-xl transition-all duration-200 ${
              item.active
                ? "bg-indigo-50 text-indigo-600 font-semibold shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            <User size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

export default function PaymentReminderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const StatusBadge = ({ status }) => {
    const styles = {
      Paid: "bg-green-100 text-green-700 border-green-200",
      Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Overdue: "bg-red-100 text-red-700 border-red-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${
          styles[status] || "bg-gray-100"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={24} />
              </button>
              <div className="relative hidden md:block">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search customer, invoice..."
                  className="pl-10 pr-4 py-2 w-64 rounded-xl border border-gray-200 bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold cursor-pointer">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
          {/* Section 1: Summary Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}
                  >
                    <item.icon size={24} />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {item.trend}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {item.count}
                </p>
              </div>
            ))}
          </section>

          {/* Section 2: Charts & Quick Actions */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Monthly Revenue Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">
                  Monthly Overview
                </h2>
                <select className="border-none bg-gray-50 text-sm font-medium text-gray-600 p-2 rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-0">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={revenueData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f4f6"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="collected"
                      name="Collected"
                      fill="#4f46e5"
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                    />
                    <Bar
                      dataKey="pending"
                      name="Pending"
                      fill="#cbd5e1"
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                    />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium">
                      <Plus size={16} /> Customer
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium">
                      <FileText size={16} /> Invoice
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium">
                      <Bell size={16} /> Remind All
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium">
                      <Download size={16} /> Export
                    </button>
                  </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-[-20%] left-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {activityData.map((activity) => (
                    <div key={activity.id} className="flex gap-4 items-start">
                      <div className={`mt-1 ${activity.color}`}>
                        <activity.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {activity.text}
                        </p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Payment Due Table */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-gray-800">
                Payment Reminders
              </h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-600 transition-colors">
                  <Filter size={16} /> Filter
                </button>
                <div className="relative">
                  <select
                    className="appearance-none pl-4 pr-10 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-600 cursor-pointer border-none focus:ring-0"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Invoice No
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paymentData
                    .filter(
                      (item) =>
                        statusFilter === "All" || item.status === statusFilter
                    )
                    .map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50/80 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900">
                              {item.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              {item.phone}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.invoice}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                          {item.amount}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.date}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors tooltip"
                              title="Send WhatsApp Reminder"
                            >
                              <MessageCircle size={18} />
                            </button>
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip"
                              title="Send SMS"
                            >
                              <Smartphone size={18} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
              <span>Showing 1 to 5 of 1,248 entries</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
