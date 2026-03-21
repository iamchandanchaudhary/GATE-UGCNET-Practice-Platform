import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { FaGraduationCap, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
    const { logout, admin } = useAdminAuth();

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <FaGraduationCap className="text-[#3475d9] text-2xl" />
                        <h1 className="text-xl font-bold text-gray-800">
                            Admin Panel{' '}
                            <span className="text-sm font-normal text-gray-500">
                                GATE & UGC-NET
                            </span>
                        </h1>
                    </Link>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2">
                            <span className="w-9 h-9 rounded-full bg-[#3475d9] text-white flex items-center justify-center text-sm font-bold uppercase">
                                {admin?.email?.charAt(0) || 'A'}
                            </span>
                            <span className="text-gray-700 font-medium text-sm hidden sm:block">
                                {admin?.email}
                            </span>
                        </span>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-sm hover:text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
                        >
                            <FaSignOutAlt />
                            <span className="hidden sm:block">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
