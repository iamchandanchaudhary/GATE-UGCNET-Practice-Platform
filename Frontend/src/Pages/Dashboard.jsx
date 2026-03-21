import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FiEdit } from 'react-icons/fi';

import {
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlinePlay,
} from 'react-icons/hi';

import Sidebar from '../components/Sidebar';

import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/user/stats`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Fetch stats error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format date to relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  // Prepare chart data from performance trend
  const progressData = stats?.performanceTrend?.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: item.score,
  })) || [];

  // Recent activity from recent tests
  const recentActivity = stats?.recentTests?.map((test) => ({
    id: test.id,
    title: test.testName,
    score: `${test.score}%`,
    time: getRelativeTime(test.date),
  })) || [];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-56 flex-1 p-8 mt-0">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome to GATE & UGC NET Practice!
            </p>
          </div>
          <Link
            to="/start-test"
            className="flex items-center justify-center gap-2 bg-[#3475d9] hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <HiOutlinePlay className="text-lg" />
            Start New Test
          </Link>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h2>
          {loading ? (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : progressData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  angle={0}
                  textAnchor="end"
                  height={70}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  label={{
                    value: 'Test Score',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 13 },
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="score"
                  name="Test Scores"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center">
              <HiOutlineClipboardList className="text-5xl text-gray-300 mb-3" />
              <p className="text-gray-500">No test data yet. Take a test to see your progress!</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>
          {loading ? (
            <p className="text-gray-500 py-4">Loading...</p>
          ) : recentActivity.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-blue-500 text-xl">
                      <FiEdit />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {activity.title} - Score: {activity.score}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">No recent activity. Take a test to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
