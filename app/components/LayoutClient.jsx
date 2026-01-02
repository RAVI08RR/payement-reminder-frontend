'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function LayoutClient({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Hide global layout for Admin and User routes (they handle their own layouts)
  const isDedicatedRoute = pathname.startsWith('/admin') || pathname.startsWith('/user');
  
  // Also hide for auth pages (legacy support)
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isDedicatedRoute || isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6">{children}</main>
      </div>
    </>
  );
}

