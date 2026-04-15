import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import Sidebar from './Sidebar';

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-linear-to-r from-[#dcecff] via-[#eef4ff] to-[#f3efff]">
      {/* Mobile Menu Button - Fixed at top */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-30 bg-white p-2 rounded-lg shadow-md border border-gray-200 text-gray-600 hover:text-[#3475d9] hover:border-[#3475d9] transition-colors"
      >
        <HiMenu className="text-xl" />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 p-4 pt-16 lg:pt-8 lg:ml-56 lg:p-8 mt-0 min-w-0">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
