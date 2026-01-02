export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">View financial insights and analytics</p>
        </div>
        <button className="px-4 py-2 border border-gray-300 dark:border-[#2E3A47] rounded-lg hover:bg-gray-50 dark:hover:bg-[#333A48] transition-colors text-gray-700 dark:text-gray-300">
          Export Data
        </button>
      </div>

      <div className="bg-white dark:bg-[#24303F] rounded-xl shadow-sm border border-gray-200 dark:border-[#2E3A47] p-8 text-center text-gray-500 dark:text-gray-400">
        <p>Charts and reports will be displayed here.</p>
      </div>
    </div>
  );
}
