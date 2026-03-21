import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  FaArrowLeft,
  FaEye,
  FaChartLine,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const RegisteredUsersPage = () => {
  const { token } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [detailsModal, setDetailsModal] = useState({ open: false, user: null });
  const [performanceModal, setPerformanceModal] = useState({
    open: false,
    user: null,
    performance: null,
    loading: false,
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleViewDetails = (user) => {
    setDetailsModal({ open: true, user });
  };

  const handleViewPerformance = async (user) => {
    setPerformanceModal({ open: true, user, performance: null, loading: true });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}/performance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setPerformanceModal((prev) => ({
          ...prev,
          performance: data.performance,
          loading: false,
        }));
      } else {
        setPerformanceModal((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    } catch (error) {
      console.error("Fetch performance error:", error);
      setPerformanceModal((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

      {/* <Navbar /> */}

      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Registered Users</h1>
          </div>
          <div className="text-gray-400">
            Total Users: <span className="text-white font-bold">{users.length}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
        >
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {users.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <FaUser className="text-6xl text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No Users Found</h2>
            <p className="text-gray-400">
              No users have registered yet.
            </p>
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Registered On
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-700/30 transition"
                  >
                    <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewDetails(user)}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition"
                          title="View Details"
                        >
                          <FaEye />
                          <span className="text-sm">Details</span>
                        </button>
                        <button
                          onClick={() => handleViewPerformance(user)}
                          className="flex items-center gap-2 px-3 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition"
                          title="View Performance"
                        >
                          <FaChartLine />
                          <span className="text-sm">Performance</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Details Modal */}
      {detailsModal.open && detailsModal.user && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">User Details</h2>
              <button
                onClick={() => setDetailsModal({ open: false, user: null })}
                className="p-2 text-gray-400 hover:text-white transition"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {detailsModal.user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-700/50 rounded-lg p-4 flex items-center gap-3">
                  <FaUser className="text-blue-400 text-lg" />
                  <div>
                    <p className="text-gray-400 text-sm">Full Name</p>
                    <p className="text-white font-medium">{detailsModal.user.name}</p>
                  </div>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4 flex items-center gap-3">
                  <FaEnvelope className="text-green-400 text-lg" />
                  <div>
                    <p className="text-gray-400 text-sm">Email Address</p>
                    <p className="text-white font-medium">{detailsModal.user.email}</p>
                  </div>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4 flex items-center gap-3">
                  <FaCalendarAlt className="text-purple-400 text-lg" />
                  <div>
                    <p className="text-gray-400 text-sm">Registered On</p>
                    <p className="text-white font-medium">
                      {formatDateTime(detailsModal.user.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-700">
              <button
                onClick={() => setDetailsModal({ open: false, user: null })}
                className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Performance Modal */}
      {performanceModal.open && performanceModal.user && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Performance Report</h2>
                <p className="text-gray-400 text-sm">{performanceModal.user.name}</p>
              </div>
              <button
                onClick={() =>
                  setPerformanceModal({
                    open: false,
                    user: null,
                    performance: null,
                    loading: false,
                  })
                }
                className="p-2 text-gray-400 hover:text-white transition"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {performanceModal.loading ? (
                <div className="text-center py-12">
                  <div className="text-white text-lg">Loading performance data...</div>
                </div>
              ) : performanceModal.performance ? (
                <>
                  {/* Stats Overview */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-600/20 rounded-lg p-4 flex items-center gap-3">
                      <FaClipboardList className="text-blue-400 text-2xl" />
                      <div>
                        <p className="text-3xl font-bold text-white">
                          {performanceModal.performance.totalTests}
                        </p>
                        <p className="text-gray-400 text-sm">Tests Taken</p>
                      </div>
                    </div>
                    <div className="bg-green-600/20 rounded-lg p-4 flex items-center gap-3">
                      <FaChartLine className="text-green-400 text-2xl" />
                      <div>
                        <p className="text-3xl font-bold text-white">
                          {performanceModal.performance.avgScore}%
                        </p>
                        <p className="text-gray-400 text-sm">Average Score</p>
                      </div>
                    </div>
                  </div>

                  {/* Test Results List */}
                  {performanceModal.performance.results.length === 0 ? (
                    <div className="bg-gray-700/50 rounded-lg p-8 text-center">
                      <FaClipboardList className="text-4xl text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400">No test attempts yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-white mb-3">Test Results</h3>
                      {performanceModal.performance.results.map((result) => (
                        <div
                          key={result.id}
                          className="bg-gray-700/50 border border-gray-600 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-white font-medium">{result.testName}</h4>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-bold ${result.score >= 80
                                  ? "bg-green-600/20 text-green-400"
                                  : result.score >= 60
                                    ? "bg-blue-600/20 text-blue-400"
                                    : result.score >= 40
                                      ? "bg-yellow-600/20 text-yellow-400"
                                      : "bg-red-600/20 text-red-400"
                                }`}
                            >
                              {result.score}%
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-green-400">
                              <FaCheckCircle />
                              <span>Correct: {result.correct}</span>
                            </div>
                            <div className="flex items-center gap-2 text-red-400">
                              <FaTimesCircle />
                              <span>Wrong: {result.wrong}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <FaClock />
                              <span>Time: {formatTime(result.timeTaken)}</span>
                            </div>
                            <div className="text-gray-400 text-right">
                              {formatDate(result.date)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-red-400">Failed to load performance data.</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-700">
              <button
                onClick={() =>
                  setPerformanceModal({
                    open: false,
                    user: null,
                    performance: null,
                    loading: false,
                  })
                }
                className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredUsersPage;
