'use client';

export default function FilterBar({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }) {
  return (
    <div className="bg-white dark:bg-[#24303F] p-4 rounded-xl border border-gray-200 dark:border-[#2E3A47] mb-6 transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Box */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Customer
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-[#2E3A47] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-[#1A222C] text-gray-900 dark:text-white"
              suppressHydrationWarning
            />
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date Range
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-[#2E3A47] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-[#1A222C] text-gray-900 dark:text-white text-sm"
              suppressHydrationWarning
            />
            <input
              type="date"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-[#2E3A47] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-[#1A222C] text-gray-900 dark:text-white text-sm"
              suppressHydrationWarning
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Payment Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-[#2E3A47] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-[#1A222C] text-gray-900 dark:text-white"
            suppressHydrationWarning
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date Range
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-[#2E3A47] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-[#1A222C] text-gray-900 dark:text-white transition-all"
            />
            <input
              type="date"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-[#2E3A47] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-[#1A222C] text-gray-900 dark:text-white transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
