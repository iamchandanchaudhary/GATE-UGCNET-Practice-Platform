import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import {
  HiOutlineTrendingUp,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const COLORS = ['#22c55e', '#ef4444', '#9ca3af'];

function ReportsPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      } else {
        setError(data.message || 'Failed to load stats');
      }
    } catch (err) {
      console.error('Fetch stats error:', err);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="ml-56 flex-1 p-8 flex items-center justify-center">
          <div className="text-gray-600 text-xl">Loading reports...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="ml-56 flex-1 p-8 flex items-center justify-center">
          <div className="text-red-600 text-xl">{error}</div>
        </main>
      </div>
    );
  }

  const hasData = stats && stats.totalTests > 0;

  // Calculate accuracy data for pie chart
  const totalAnswered = stats?.totalCorrect + stats?.totalWrong + stats?.totalUnanswered || 0;
  const accuracyData = hasData
    ? [
        { name: 'Correct', value: Math.round((stats.totalCorrect / totalAnswered) * 100) || 0 },
        { name: 'Incorrect', value: Math.round((stats.totalWrong / totalAnswered) * 100) || 0 },
        { name: 'Unattempted', value: Math.round((stats.totalUnanswered / totalAnswered) * 100) || 0 },
      ]
    : [
        { name: 'Correct', value: 0 },
        { name: 'Incorrect', value: 0 },
        { name: 'Unattempted', value: 0 },
      ];

  // Calculate improvement (difference between first and last test)
  const improvement = hasData && stats.performanceTrend.length >= 2
    ? stats.performanceTrend[stats.performanceTrend.length - 1].score - stats.performanceTrend[0].score
    : 0;

  // Test-wise scores for bar chart
  const testScores = hasData
    ? stats.recentTests.map((t) => ({
        test: t.testName.length > 15 ? t.testName.substring(0, 15) + '...' : t.testName,
        score: t.score,
      }))
    : [];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-56 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Performance Reports</h1>
          <p className="text-gray-500 mt-1">
            Detailed analysis of your test performance and progress
          </p>
        </div>

        {!hasData ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <HiOutlineClipboardList className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Test Data Yet</h2>
            <p className="text-gray-500">
              Take some tests to see your performance analysis and reports here.
            </p>
          </div>
        ) : (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <HiOutlineAcademicCap className="text-2xl text-[#3475d9]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stats.avgScore}%</p>
                  <p className="text-sm text-gray-500">Avg. Score</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <HiOutlineTrendingUp className="text-2xl text-green-600" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {improvement >= 0 ? '+' : ''}{improvement}%
                  </p>
                  <p className="text-sm text-gray-500">Improvement</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <HiOutlineClipboardList className="text-2xl text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalTests}</p>
                  <p className="text-sm text-gray-500">Tests Taken</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <HiOutlineCheckCircle className="text-2xl text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{accuracyData[0].value}%</p>
                  <p className="text-sm text-gray-500">Accuracy</p>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Performance Trend */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Score Trend</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={stats.performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="test" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                              <p className="font-semibold text-gray-800">{payload[0].payload.testName}</p>
                              <p className="text-blue-600">Score: {payload[0].value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Accuracy Pie Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Overall Accuracy</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={accuracyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {accuracyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Test-wise Scores */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Test Scores</h2>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={testScores} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="test" tick={{ fontSize: 13 }} width={130} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default ReportsPage;
