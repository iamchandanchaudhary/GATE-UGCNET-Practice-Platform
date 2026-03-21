import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { FaPlus, FaList, FaSignOutAlt, FaUsers } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { logout, admin } = useAdminAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome, Admin!</h2>
          <p className="text-gray-400">Manage your tests, questions, and users from here</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Add Test Card */}
          <Link
            to="/add-test"
            className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <FaPlus className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Add Test</h3>
              <p className="text-gray-400">
                Create a new test with questions, set duration, and configure options
              </p>
            </div>
          </Link>

          {/* Test List Card */}
          <Link
            to="/test-list"
            className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/10 transition duration-300 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <FaList className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Test List</h3>
              <p className="text-gray-400">
                View, edit, or delete existing tests and manage questions
              </p>
            </div>
          </Link>

          {/* Registered Users Card */}
          <Link
            to="/users"
            className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition duration-300 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <FaUsers className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Registered Users</h3>
              <p className="text-gray-400">
                View registered users, their details, and performance reports
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
