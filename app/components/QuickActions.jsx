"use client";

import React from "react";
import { Plus, FileText, Bell, Download } from "lucide-react";

export default function QuickActions({ onAddCustomer, onAddInvoice }) {
  const [activeAction, setActiveAction] = React.useState(null);

  const toggleAction = (action) => {
    setActiveAction(activeAction === action ? null : action);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden h-full">
      <div className="relative z-10">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        
        {activeAction ? (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
             <div className="flex items-center justify-between mb-2">
               <h3 className="text-sm font-semibold opacity-90">
                 {activeAction === 'remind' ? 'Select Reminder Type' : 'Export Data As'}
               </h3>
               <button onClick={() => setActiveAction(null)} className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30">Back</button>
             </div>
             
             <div className="grid grid-cols-1 gap-2">
               {activeAction === 'remind' ? (
                 <>
                   <button className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium text-left">
                     <span>📧 Email Reminders</span>
                     <span className="text-xs opacity-70">To all overdue</span>
                   </button>
                   <button className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium text-left">
                     <span>💬 SMS Reminders</span>
                     <span className="text-xs opacity-70">Instant alert</span>
                   </button>
                   <button className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium text-left">
                     <span>📱 WhatsApp</span>
                     <span className="text-xs opacity-70">High open rate</span>
                   </button>
                 </>
               ) : (
                 <>
                   <button className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium text-left">
                     <span>📄 Export as PDF</span>
                     <span className="text-xs opacity-70">Report format</span>
                   </button>
                   <button className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium text-left">
                     <span>📊 Export as CSV</span>
                     <span className="text-xs opacity-70">Excel ready</span>
                   </button>
                 </>
               )}
             </div>
           </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onAddCustomer}
              className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium"
            >
              <Plus size={16} /> Customer
            </button>
            <button
              onClick={onAddInvoice}
              className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium"
            >
              <FileText size={16} /> Invoice
            </button>
            <button 
              onClick={() => toggleAction('remind')}
              className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium"
            >
              <Bell size={16} /> Remind All
            </button>
            <button 
              onClick={() => toggleAction('export')}
              className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium"
            >
              <Download size={16} /> Export
            </button>
          </div>
        )}
      </div>
      {/* Decorative circles */}
      <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
    </div>
  );
}
