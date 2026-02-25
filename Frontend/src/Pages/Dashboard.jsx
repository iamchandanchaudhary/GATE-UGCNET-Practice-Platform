import React from 'react';
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
import Sidebar from '../components/Sidebar';

// Sample chart data
const progressData = [
  { date: '2026-01-04', score: 32 },
  { date: '2026-01-10', score: 45 },
  { date: '2026-01-12', score: 60 },
  { date: '2026-01-18', score: 79 },
  { date: '2026-01-24', score: 74 },
  { date: '2026-01-28', score: 80 },
  { date: '2026-02-09', score: 80 },
  { date: '2026-02-14', score: 65 },
  { date: '2026-02-18', score: 78 },
  { date: '2026-02-20', score: 80 },
  { date: '2026-02-21', score: 80 },
  { date: '2026-02-26', score: 87 },
];

// Sample recent activity
const recentActivity = [
  { id: 1, title: 'GATE CS Mock Test 1', score: '75/100', time: '3 days ago' },
  { id: 2, title: 'UGC NET Paper 1', score: '82/100', time: '3 days ago' },
];

function Dashboard() {
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
              Welcome back, Student!
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome to GATE & UGC NET Practice!
            </p>
          </div>
          <Link
            to="/start-test"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Start New Test
          </Link>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h2>
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
                domain={[0, 90]}
                ticks={[0, 15, 30, 45, 60, 75, 90]}
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
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>
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
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
