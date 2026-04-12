import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineExclamationCircle,
  HiOutlineFilter,
  HiOutlinePlay,
  HiOutlineSearch,
  HiX,
} from 'react-icons/hi';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';

function StartTestPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const navigate = useNavigate();

  const { scrollUp } = useAuth();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/public/active`
      );
      const data = await response.json();

      if (data.success) {
        setTests(data.tests);
      } else {
        setError('Failed to load tests');
      }
    } catch (error) {
      console.error('Fetch tests error:', error);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = (test) => {
    setSelectedTest(test);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    navigate(`/test/${selectedTest._id}`);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedTest(null);
  };

  const formatDuration = (minutes) => {
    if (minutes === 60) return '1 Hour';
    return `${minutes} Minutes`;
  };

  const subjects = ['All Subjects', ...new Set(tests.map((test) => test.subject))];

  const filteredTests = tests.filter((test) => {
    const matchesSubject =
      subjectFilter === 'All Subjects' || test.subject === subjectFilter;
    const matchesSearch = test.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    return matchesSubject && matchesSearch;
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-600 text-lg lg:text-xl">Loading tests...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-2 md:mb-6 lg:mb-8 flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Start New Test</h1>
          <p className="text-gray-500 mt-1 text-sm lg:text-base">
            Choose a test to begin your practice session
          </p>
        </div>

        {tests.length > 0 && (
          <div className="px-0 md:px-4 lg:px-5 py-4 mb-2 md:mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div className="relative">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tests by name"
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#3475d9]/30 focus:border-[#3475d9]"
                />
              </div>

              <div className="relative">
                <HiOutlineFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm lg:text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#3475d9]/30 focus:border-[#3475d9] appearance-none"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {tests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-12 text-center">
          <HiOutlineClipboardList className="text-5xl lg:text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl lg:text-2xl font-bold text-gray-700 mb-2">No Tests Available</h2>
          <p className="text-gray-500 text-sm lg:text-base">
            Please check back later for new practice tests.
          </p>
        </div>
      ) : filteredTests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-12 text-center">
          <HiOutlineSearch className="text-5xl lg:text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl lg:text-2xl font-bold text-gray-700 mb-2">No Matching Tests</h2>
          <p className="text-gray-500 text-sm lg:text-base">
            Try a different search term or subject filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((test) => (
            <div
              key={test._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 hover:border-blue-300 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3 lg:mb-4">
                <div className="bg-blue-100 p-2 lg:p-3 rounded-lg">
                  <HiOutlineAcademicCap className="text-xl lg:text-2xl text-[#3475d9]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base lg:text-lg font-bold text-gray-800 truncate">
                    {test.name}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-500 truncate mt-0.5">{test.subject}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-3 lg:mb-4 text-xs lg:text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <HiOutlineClipboardList className="text-base lg:text-lg text-[#3475d9]" />
                  <span>{test.numberOfQuestions} Questions</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiOutlineClock className="text-base lg:text-lg text-[#3475d9]" />
                  <span>{formatDuration(test.duration)}</span>
                </div>
              </div>

              <button
                onClick={() => handleStartTest(test)}
                className="w-full flex items-center justify-center gap-2 bg-[#3475d9] hover:bg-blue-700 text-white font-semibold px-4 py-2.5 lg:py-3 rounded-lg transition-colors duration-200 cursor-pointer text-sm lg:text-base"
              >
                <HiOutlinePlay className="text-lg" />
                Start Test
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && selectedTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#3475d9] px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
              <h3 className="text-base lg:text-lg font-bold text-white">Confirm Start Test</h3>
              <button
                onClick={handleCancel}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-4 lg:px-6 py-4 lg:py-6">
              <div className="mb-4">
                <h4 className="text-lg lg:text-xl font-bold text-gray-800">{selectedTest.name}</h4>
                <p className="text-xs lg:text-sm text-gray-500 mt-1">Subject: {selectedTest.subject}</p>
                <div className="flex items-center gap-4 mt-2 text-xs lg:text-sm text-gray-600">
                  <span>{selectedTest.numberOfQuestions} Questions</span>
                  <span>{formatDuration(selectedTest.duration)}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 lg:p-4 mb-4">
                <h5 className="font-semibold text-amber-800 flex items-center gap-2 mb-2 text-sm">
                  <HiOutlineExclamationCircle className="text-lg" />
                  Instructions
                </h5>
                <ul className="text-xs lg:text-sm text-amber-700 space-y-1">
                  <li>• Each question carries equal marks.</li>
                  <li>• No negative marking in this test.</li>
                  <li>• Test auto-submits when timer expires.</li>
                  <li>• You can navigate between questions.</li>
                  <li>• Do not refresh the page during test.</li>
                </ul>
              </div>

              <div className="flex items-start gap-3 text-xs lg:text-sm text-gray-600">
                <HiOutlineExclamationCircle className="text-lg lg:text-xl text-amber-500 shrink-0 mt-0.5" />
                <p>
                  The timer ({formatDuration(selectedTest.duration)}) will begin immediately.
                  You cannot pause once started.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 lg:px-6 py-3 lg:py-4 bg-gray-50 flex items-center justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => { handleConfirm(); scrollUp() }}
                className="px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg bg-[#3475d9] text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer text-sm"
              >
                <HiOutlinePlay className="text-lg" />
                Yes, Start Test
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default StartTestPage;
