import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineViewGrid,
  HiOutlineBookOpen,
  HiX,
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

const sidebarItems = [
  { label: 'Dashboard', icon: HiOutlineViewGrid, path: '/dashboard' },
  { label: 'Learning', icon: HiOutlineBookOpen, path: '/learning' },
  { label: 'My Tests', icon: HiOutlineClipboardList, path: '/my-tests' },
  { label: 'Performance Reports', icon: HiOutlineChartBar, path: '/reports' },
];

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, scrollUp } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = () => {
    // Close sidebar on mobile when clicking a link
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 lg:w-56 bg-white border-r border-gray-200 flex flex-col justify-between fixed top-16 bottom-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <HiX className="text-xl" />
        </button>

        <nav className="flex flex-col py-4 mt-2 lg:mt-0">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => {handleNavClick(); scrollUp()}}
                className={`flex items-center gap-3 px-6 py-3 border-l-4 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-[#3475d9] bg-blue-50 border-[#3475d9]'
                    : 'text-gray-600 hover:text-[#3475d9] hover:bg-gray-50 border-transparent'
                }`}
              >
                <item.icon className="text-lg" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom sidebar links */}
        <div className="border-t border-gray-200 py-4">
          <Link
            to="/profile"
            onClick={() => {handleNavClick(); scrollUp()}}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              location.pathname === '/profile'
                ? 'text-[#3475d9] bg-blue-50 border-r-3 border-[#3475d9]'
                : 'text-gray-600 hover:text-[#3475d9] hover:bg-gray-50'
            }`}
          >
            <HiOutlineUser className="text-lg" />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 w-full transition-colors duration-150"
          >
            <HiOutlineLogout className="text-lg" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
