import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlinePlay,
} from 'react-icons/hi';
import DashboardLayout from '../components/DashboardLayout';

const sampleTests = [
  {
    id: 1,
    title: 'GATE CS 2026 - Mock Test 1',
    subject: 'Computer Science',
    questions: 65,
    duration: '180 min',
    status: 'completed',
    score: '75/100',
    date: '2026-02-20',
  },
  {
    id: 2,
    title: 'UGC NET Paper 1 - Practice',
    subject: 'General Aptitude',
    questions: 50,
    duration: '60 min',
    status: 'completed',
    score: '82/100',
    date: '2026-02-18',
  },
  {
    id: 3,
    title: 'GATE CS 2026 - Mock Test 2',
    subject: 'Computer Science',
    questions: 65,
    duration: '180 min',
    status: 'in-progress',
    score: null,
    date: '2026-02-25',
  },
  {
    id: 4,
    title: 'UGC NET Paper 2 - CS',
    subject: 'Computer Science & Applications',
    questions: 100,
    duration: '120 min',
    status: 'not-started',
    score: null,
    date: null,
  },
  {
    id: 5,
    title: 'GATE CS - Data Structures',
    subject: 'Topic-wise Test',
    questions: 30,
    duration: '45 min',
    status: 'not-started',
    score: null,
    date: null,
  },
];

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
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function MyTestsPage() {
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-2.5 lg:p-3 rounded-lg">
            <HiOutlineClipboardList className="text-xl lg:text-2xl text-[#3475d9]" />
          </div>
          <div>
            <p className="text-xl lg:text-2xl font-bold text-gray-800">5</p>
            <p className="text-xs lg:text-sm text-gray-500">Total Tests</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-5 flex items-center gap-4">
          <div className="bg-green-100 p-2.5 lg:p-3 rounded-lg">
            <HiOutlineCheckCircle className="text-xl lg:text-2xl text-green-600" />
          </div>
          <div>
            <p className="text-xl lg:text-2xl font-bold text-gray-800">2</p>
            <p className="text-xs lg:text-sm text-gray-500">Completed</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-5 flex items-center gap-4">
          <div className="bg-yellow-100 p-2.5 lg:p-3 rounded-lg">
            <HiOutlineClock className="text-xl lg:text-2xl text-yellow-600" />
          </div>
          <div>
            <p className="text-xl lg:text-2xl font-bold text-gray-800">1</p>
            <p className="text-xs lg:text-sm text-gray-500">In Progress</p>
          </div>
        </div>
      </div>

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
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleTests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{test.title}</td>
                  <td className="px-6 py-4 text-gray-600">{test.subject}</td>
                  <td className="px-6 py-4 text-gray-600">{test.questions}</td>
                  <td className="px-6 py-4 text-gray-600">{test.duration}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={test.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600">{test.score || '—'}</td>
                  <td className="px-6 py-4">
                    {test.status === 'completed' ? (
                      <button className="text-[#3475d9] hover:text-blue-800 font-medium text-sm">
                        Review
                      </button>
                    ) : test.status === 'in-progress' ? (
                      <button className="text-yellow-600 hover:text-yellow-800 font-medium text-sm">
                        Continue
                      </button>
                    ) : (
                      <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                        Start
                      </button>
                    )}
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
        {sampleTests.map((test) => (
          <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 text-sm">{test.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{test.subject}</p>
              </div>
              <StatusBadge status={test.status} />
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <HiOutlineClipboardList className="text-[#3475d9]" />
                {test.questions} Questions
              </span>
              <span className="flex items-center gap-1">
                <HiOutlineClock className="text-[#3475d9]" />
                {test.duration}
              </span>
              {test.score && (
                <span className="font-medium text-green-600">Score: {test.score}</span>
              )}
            </div>
            <div className="pt-3 border-t border-gray-100">
              {test.status === 'completed' ? (
                <button className="w-full py-2 text-[#3475d9] hover:bg-blue-50 font-medium text-sm rounded-lg border border-[#3475d9] transition-colors">
                  Review Test
                </button>
              ) : test.status === 'in-progress' ? (
                <button className="w-full py-2 text-yellow-600 hover:bg-yellow-50 font-medium text-sm rounded-lg border border-yellow-500 transition-colors">
                  Continue Test
                </button>
              ) : (
                <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm rounded-lg transition-colors">
                  Start Test
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default MyTestsPage;
