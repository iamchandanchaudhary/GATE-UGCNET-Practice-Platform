import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaGraduationCap } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-[#3475d9] border-b-2 border-[#3475d9] pb-0.5'
        : 'text-gray-700 border-b-2 border-transparent hover:text-[#3475d9] pb-0.5'
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <FaGraduationCap className="text-[#3475d9] text-xl sm:text-2xl shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800 truncate">
              <span className="hidden sm:inline">GATE & UGC NET </span>
              <span className="sm:hidden">GATE/UGC</span>
              <span className="hidden sm:inline text-base font-normal text-gray-500">
                Practice Platform
              </span>
            </h1>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full bg-[#3475d9] text-white flex items-center justify-center text-sm font-bold uppercase">
                    {user.name?.charAt(0)}
                  </span>
                  <span className="text-gray-700 font-medium text-base hidden lg:block">Hello, {user.name?.split(' ')[0] || 'User'}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-sm hover:text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-medium text-white rounded-sm bg-[#3475d9] hover:bg-[#236ddb] transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 text-2xl p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-3 pt-4 px-2">
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </NavLink>
              {user && (
                <NavLink
                  to="/dashboard"
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              )}
              <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-gray-100">
                {user ? (
                  <>
                    <span className="flex items-center gap-2 w-full mb-2">
                      <span className="w-8 h-8 rounded-full bg-[#3475d9] text-white flex items-center justify-center text-sm font-bold uppercase">
                        {user.name?.charAt(0)}
                      </span>
                      <span className="text-gray-700 font-medium text-sm">{user.name}</span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-5 py-2 text-sm font-medium text-white bg-[#3475d9] rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
