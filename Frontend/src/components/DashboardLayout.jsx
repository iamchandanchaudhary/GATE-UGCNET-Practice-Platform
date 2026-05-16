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
        className="cursor-pointer lg:hidden fixed top-20 left-0 z-30 bg-linear-to-r from-[#01275f] to-[#3476d9] py-2 pr-2 pl-0.5 rounded-e-full transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 fill-white' viewBox="0 -960 960 960"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
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
