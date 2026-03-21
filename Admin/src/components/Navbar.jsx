import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { FaPlus, FaList, FaSignOutAlt, FaUsers } from "react-icons/fa";

const Navbar = () => {
    const { logout, admin } = useAdminAuth();

    return (
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to={"/dashboard"}>
                    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-gray-400 text-sm">GATE & UGC-NET Practice Platform</p>
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-gray-300">{admin?.email}</span>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
