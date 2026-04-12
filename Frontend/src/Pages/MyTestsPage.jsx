import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlinePlay,
} from 'react-icons/hi';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';

function StatusBadge({ status }) {
  const styles = {
    completed: 'bg-green-100 text-green-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    'not-started': 'bg-gray-100 text-gray-600',
  };
  const labels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    'not-started': 'Not Started',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || styles['not-started']}`}>
      {labels[status] || 'Unknown'}
    </span>
  );
}

function formatDuration(minutes) {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${minutes} min`;
}

function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function MyTestsPage() {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTestResults();
  }, []);

  const fetchTestResults = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/user/results`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTestResults(data.results || []);
      } else {
        setError(data.message || 'Failed to fetch test results');
      }
    } catch (err) {
      console.error('Error fetching test results:', err);
      setError('Failed to load test results');
    } finally {
      setLoading(false);
    }
  };

  const totalTests = testResults.length;
  const completedTests = testResults.length;
  const avgScore = totalTests > 0
    ? Math.round(testResults.reduce((sum, t) => sum + t.score, 0) / totalTests)
    : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3475d9]"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">My Tests</h1>
          <p className="text-gray-500 mt-1 text-sm lg:text-base">View and manage all your practice tests</p>
        </div>
        <Link
          to="/start-test"
          className="bg-[#3475d9] hover:bg-blue-700 text-white font-semibold px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm lg:text-base"
        >
          <HiOutlinePlay className="text-lg" />
          Start New Test
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-2.5 lg:p-3 rounded-lg">
            <HiOutlineClipboardList className="text-xl lg:text-2xl text-[#3475d9]" />
          </div>
          <div>
            <p className="text-xl lg:text-2xl font-bold text-gray-800">{totalTests}</p>
            <p className="text-xs lg:text-sm text-gray-500">Total Tests</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-5 flex items-center gap-4">
          <div className="bg-green-100 p-2.5 lg:p-3 rounded-lg">
            <HiOutlineCheckCircle className="text-xl lg:text-2xl text-green-600" />
          </div>
          <div>
            <p className="text-xl lg:text-2xl font-bold text-gray-800">{completedTests}</p>
            <p className="text-xs lg:text-sm text-gray-500">Completed</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-5 flex items-center gap-4">
          <div className="bg-yellow-100 p-2.5 lg:p-3 rounded-lg">
            <HiOutlineClock className="text-xl lg:text-2xl text-yellow-600" />
          </div>
          <div>
            <p className="text-xl lg:text-2xl font-bold text-gray-800">{avgScore}%</p>
            <p className="text-xs lg:text-sm text-gray-500">Avg Score</p>
          </div>
        </div>
      </div>

      {testResults.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <HiOutlineClipboardList className="text-5xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Tests Taken Yet</h3>
          <p className="text-gray-500 mb-4">Start taking tests to see your results here.</p>
          <Link
            to="/start-test"
            className="inline-flex items-center gap-2 bg-[#3475d9] hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <HiOutlinePlay />
            Start a Test
          </Link>
        </div>
      ) : (
        <>
          {/* Tests Table - Desktop */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hidden lg:block">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">All Tests</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Test Name</th>
                    <th className="px-6 py-3">Subject</th>
                    <th className="px-6 py-3">Questions</th>
                    <th className="px-6 py-3">Score</th>
                    <th className="px-6 py-3">Correct</th>
                    <th className="px-6 py-3">Wrong</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {testResults.map((test) => (
                    <tr key={test._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{test.testName}</td>
                      <td className="px-6 py-4 text-gray-600">{test.subject || 'Unknown'}</td>
                      <td className="px-6 py-4 text-gray-600">{test.totalQuestions}</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${test.score >= 70 ? 'text-green-600' : test.score >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {test.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-green-600">{test.correct}</td>
                      <td className="px-6 py-4 text-red-600">{test.wrong}</td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(test.createdAt)}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status="completed" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tests Cards - Mobile */}
          <div className="lg:hidden space-y-4">
            <h2 className="text-lg font-bold text-gray-800">All Tests</h2>
            {testResults.map((test) => (
              <div key={test._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm">{test.testName}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{formatDate(test.createdAt)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Subject: {test.subject || 'Unknown'}</p>
                  </div>
                  <StatusBadge status="completed" />
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <HiOutlineClipboardList className="text-[#3475d9]" />
                    {test.totalQuestions} Questions
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    ✓ {test.correct} Correct
                  </span>
                  <span className="flex items-center gap-1 text-red-600">
                    ✗ {test.wrong} Wrong
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className={`text-lg font-bold ${test.score >= 70 ? 'text-green-600' : test.score >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                    Score: {test.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default MyTestsPage;
