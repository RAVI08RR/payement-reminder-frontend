export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track all your incoming and pending payments</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Record Payment
        </button>
      </div>

      <div className="bg-white dark:bg-[#24303F] rounded-xl shadow-sm border border-gray-200 dark:border-[#2E3A47] p-8 text-center text-gray-500 dark:text-gray-400">
        <p>Payment history will appear here.</p>
      </div>
    </div>
  );
}
