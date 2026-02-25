import React from 'react';
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
  HiOutlineClock,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import Sidebar from '../components/Sidebar';

const subjectScores = [
  { subject: 'Data Structures', score: 82 },
  { subject: 'Algorithms', score: 74 },
  { subject: 'OS', score: 68 },
  { subject: 'DBMS', score: 88 },
  { subject: 'Networks', score: 72 },
  { subject: 'TOC', score: 60 },
  { subject: 'Digital Logic', score: 90 },
  { subject: 'Aptitude', score: 85 },
];

const performanceTrend = [
  { test: 'Test 1', score: 58 },
  { test: 'Test 2', score: 65 },
  { test: 'Test 3', score: 60 },
  { test: 'Test 4', score: 72 },
  { test: 'Test 5', score: 75 },
  { test: 'Test 6', score: 80 },
  { test: 'Test 7', score: 78 },
  { test: 'Test 8', score: 85 },
];

const accuracyData = [
  { name: 'Correct', value: 68 },
  { name: 'Incorrect', value: 22 },
  { name: 'Unattempted', value: 10 },
];

const COLORS = ['#22c55e', '#ef4444', '#9ca3af'];

function ReportsPage() {
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

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <HiOutlineAcademicCap className="text-2xl text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">78%</p>
              <p className="text-sm text-gray-500">Avg. Score</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <HiOutlineTrendingUp className="text-2xl text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">+12%</p>
              <p className="text-sm text-gray-500">Improvement</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <HiOutlineClock className="text-2xl text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">24h</p>
              <p className="text-sm text-gray-500">Total Study Time</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <HiOutlineCheckCircle className="text-2xl text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">68%</p>
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
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="test" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
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

        {/* Subject-wise Scores */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Subject-wise Performance</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={subjectScores} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="subject" tick={{ fontSize: 13 }} width={110} />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default ReportsPage;
