import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { FaPlus, FaList, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  const { admin } = useAdminAuth();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">Welcome, Admin!</h2>
        <p className="text-gray-500 text-sm sm:text-base">Manage your tests, questions, and users from here</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
        {/* Add Test Card */}
        <Link
          to="/add-test"
          className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-8 hover:border-[#3475d9] hover:shadow-lg transition duration-300 group"
        >
          <div className="flex flex-row sm:flex-col items-center sm:text-center gap-4 sm:gap-0">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#3475d9] rounded-full flex items-center justify-center sm:mb-6 group-hover:scale-110 transition shrink-0">
              <FaPlus className="text-white text-xl sm:text-3xl" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 sm:mb-3">Add Test</h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Create a new test with questions and configure options
              </p>
            </div>
          </div>
        </Link>

        {/* Test List Card */}
        <Link
          to="/test-list"
          className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-8 hover:border-green-500 hover:shadow-lg transition duration-300 group"
        >
          <div className="flex flex-row sm:flex-col items-center sm:text-center gap-4 sm:gap-0">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-green-600 rounded-full flex items-center justify-center sm:mb-6 group-hover:scale-110 transition shrink-0">
              <FaList className="text-white text-xl sm:text-3xl" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 sm:mb-3">Test List</h3>
              <p className="text-gray-500 text-sm sm:text-base">
                View, edit, or delete existing tests and manage them
              </p>
            </div>
          </div>
        </Link>

        {/* Registered Users Card */}
        <Link
          to="/users"
          className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-8 hover:border-purple-500 hover:shadow-lg transition duration-300 group sm:col-span-2 lg:col-span-1"
        >
          <div className="flex flex-row sm:flex-col items-center sm:text-center gap-4 sm:gap-0">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-purple-600 rounded-full flex items-center justify-center sm:mb-6 group-hover:scale-110 transition shrink-0">
              <FaUsers className="text-white text-xl sm:text-3xl" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 sm:mb-3">Registered Users</h3>
              <p className="text-gray-500 text-sm sm:text-base">
                View registered users and their performance reports
              </p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Dashboard;
