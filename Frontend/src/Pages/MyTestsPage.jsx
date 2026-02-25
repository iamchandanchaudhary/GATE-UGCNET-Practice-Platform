import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlinePlay,
} from 'react-icons/hi';
import Sidebar from '../components/Sidebar';

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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-56 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Tests</h1>
            <p className="text-gray-500 mt-1">View and manage all your practice tests</p>
          </div>
          <Link
            to="/start-test"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <HiOutlinePlay className="text-lg" />
            Start New Test
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <HiOutlineClipboardList className="text-2xl text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">5</p>
              <p className="text-sm text-gray-500">Total Tests</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <HiOutlineCheckCircle className="text-2xl text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">2</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <HiOutlineClock className="text-2xl text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">1</p>
              <p className="text-sm text-gray-500">In Progress</p>
            </div>
          </div>
        </div>

        {/* Tests Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
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
      </main>
    </div>
  );
}

export default MyTestsPage;
