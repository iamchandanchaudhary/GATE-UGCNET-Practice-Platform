import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { FaGraduationCap, FaSignOutAlt, FaPlus, FaList, FaUsers, FaHome } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const { logout, admin } = useAdminAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        setIsLogoutModalOpen(false);
        logout();
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            isActive
                ? 'bg-blue-50 text-[#3475d9]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#3475d9]'
        }`;

    return (
        <nav className="bg-linear-to-r from-[#bbdcfc] via-[#e9e4fc] to-[#d6d6fe] shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-3 min-w-0">
                        <FaGraduationCap className="text-[#3475d9] text-4xl sm:text-4xl shrink-0" />
                        <h1 className="text-base sm:text-xl font-bold text-gray-800 truncate flex flex-col sm:flex-row gap-0 sm:gap-3 items-start sm:items-center">
                            <span className="">GATE & UGC-NET </span>
                            <span className="inline text-[10px] sm:text-xs font-medium text-gray-500 bg-red-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border-2 border-gray-400">
                                Admin Panel
                            </span>
                        </h1>
                    </Link>

                    {/* Desktop Nav Links */}
                    {/* <div className="hidden lg:flex items-center gap-2">
                        <NavLink to="/dashboard" className={navLinkClass}>
                            <FaHome className="text-sm" />
                            Dashboard
                        </NavLink>
                        <NavLink to="/add-test" className={navLinkClass}>
                            <FaPlus className="text-sm" />
                            Add Test
                        </NavLink>
                        <NavLink to="/test-list" className={navLinkClass}>
                            <FaList className="text-sm" />
                            Test List
                        </NavLink>
                        <NavLink to="/users" className={navLinkClass}>
                            <FaUsers className="text-sm" />
                            Users
                        </NavLink>
                    </div> */}

                    {/* Right Side */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <span className="hidden sm:flex items-center gap-2">
                            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-[#01275f] to-[#3476d9] text-white flex items-center justify-center text-xs sm:text-sm font-bold uppercase">
                                {admin?.email?.charAt(0) || 'A'}
                            </span>
                            <span className="text-gray-700 font-medium text-sm hidden md:block truncate max-w-[150px]">
                                {admin?.email}
                            </span>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="cursor-pointers hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium border-2 border-gray-300 hover:border-red-300 rounded-md text-red-600 bg-red-50 transition-colors duration-200"
                        >
                            <FaSignOutAlt />
                            <span className="hidden md:block">Logout</span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-700 text-2xl p-1 cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col gap-1 pt-3 mt-2">
                            <NavLink
                                to="/dashboard"
                                className={navLinkClass}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaHome className="text-sm" />
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/add-test"
                                className={navLinkClass}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaPlus className="text-sm" />
                                Add Test
                            </NavLink>
                            <NavLink
                                to="/test-list"
                                className={navLinkClass}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaList className="text-sm" />
                                Test List
                            </NavLink>
                            <NavLink
                                to="/users"
                                className={navLinkClass}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaUsers className="text-sm" />
                                Users
                            </NavLink>

                            <div className="pt-3">
                                <div className="flex items-center gap-3 px-3 py-2">
                                    <span className="w-8 h-8 rounded-full bg-[#3475d9] text-white flex items-center justify-center text-sm font-bold uppercase">
                                        {admin?.email?.charAt(0) || 'A'}
                                    </span>
                                    <span className="text-gray-700 font-medium text-sm truncate flex-1">
                                        {admin?.email}
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 border border-red-200 hover:border-red-400 cursor-pointer rounded-lg bg-red-50 transition-colors duration-200"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md shadow-xl overflow-hidden">
                        <div className="px-5 sm:px-6 py-2 sm:py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Logout</h2>
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="cursor-pointer text-gray-500 hover:text-gray-700 transition text-2xl leading-none"
                                aria-label="Close logout confirmation"
                            >
                                <HiX />
                            </button>
                        </div>

                        <div className="px-5 sm:px-6 py-6 sm:py-7 text-center">
                            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-3xl">
                                <FaSignOutAlt />
                            </div>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Are you sure you want to logout from the admin panel?
                            </p>
                            <p className="mt-3 text-sm font-semibold text-gray-800 truncate">
                                {admin?.email || "Admin"}
                            </p>
                            
                        </div>

                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex gap-3">
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="cursor-pointer flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="cursor-pointer flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
