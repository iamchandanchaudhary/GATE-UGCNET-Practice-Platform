import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { FaGraduationCap, FaSignOutAlt, FaPlus, FaList, FaUsers, FaHome } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const { logout, admin } = useAdminAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            isActive
                ? 'bg-blue-50 text-[#3475d9]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#3475d9]'
        }`;

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-2 min-w-0">
                        <FaGraduationCap className="text-[#3475d9] text-xl sm:text-2xl shrink-0" />
                        <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                            <span className="hidden sm:inline">Admin Panel </span>
                            <span className="sm:hidden">Admin</span>
                            <span className="hidden md:inline text-sm font-normal text-gray-500">
                                GATE & UGC-NET
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
                            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#3475d9] text-white flex items-center justify-center text-xs sm:text-sm font-bold uppercase">
                                {admin?.email?.charAt(0) || 'A'}
                            </span>
                            <span className="text-gray-700 font-medium text-sm hidden md:block truncate max-w-[150px]">
                                {admin?.email}
                            </span>
                        </span>
                        <button
                            onClick={logout}
                            className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
                        >
                            <FaSignOutAlt />
                            <span className="hidden md:block">Logout</span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden text-gray-700 text-2xl p-1"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden pb-4 border-t border-gray-100">
                        <div className="flex flex-col gap-1 pt-3">
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

                            <div className="mt-3 pt-3 border-t border-gray-100">
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
                                        logout();
                                    }}
                                    className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
