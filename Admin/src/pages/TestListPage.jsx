import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCheck,
  FaClock,
  FaQuestionCircle,
  FaBook,
  FaFilter,
  FaSearch,
} from "react-icons/fa";

const TestListPage = () => {
  const { token } = useAdminAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [viewModal, setViewModal] = useState({ open: false, test: null });
  const [editModal, setEditModal] = useState({ open: false, test: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, test: null });

  const fetchTests = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTests(data.tests);
      } else {
        setError(data.message || "Failed to fetch tests");
      }
    } catch (error) {
      console.error("Fetch tests error:", error);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const subjectOptions = Array.from(
    new Set(tests.map((test) => test.subject).filter(Boolean))
  );

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredTests = tests.filter((test) => {
    const matchesSubject =
      selectedSubject === "All" || test.subject === selectedSubject;

    if (!normalizedSearchQuery) {
      return matchesSubject;
    }

    const searchableText = [
      test.name,
      test.subject,
      test.numberOfQuestions?.toString(),
      test.duration?.toString(),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesSubject && searchableText.includes(normalizedSearchQuery);
  });

  const handleView = async (testId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/${testId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setViewModal({ open: true, test: data.test });
      }
    } catch (error) {
      console.error("View test error:", error);
    }
  };

  const handleEdit = async (testId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/${testId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setEditModal({ open: true, test: data.test });
      }
    } catch (error) {
      console.error("Edit test error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/${deleteModal.test._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTests(tests.filter((t) => t._id !== deleteModal.test._id));
        setDeleteModal({ open: false, test: null });
      }
    } catch (error) {
      console.error("Delete test error:", error);
    }
  };

  const formatDuration = (minutes) => {
    if (minutes === 60) return "1 Hour";
    return `${minutes} Min`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-600 text-lg sm:text-xl">Loading tests...</div>
      </div>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Test List</h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Manage all your tests</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tests..."
                className="w-full bg-white text-gray-800 pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:border-[#3475d9] outline-none text-sm"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <FaFilter className="text-gray-500 text-sm" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full sm:w-auto bg-white text-gray-800 px-3 py-2 rounded-md border border-gray-300 focus:border-[#3475d9] outline-none text-sm"
              >
                <option value="All">All Subjects</option>
                {subjectOptions.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <Link
              to="/add-test"
              className="bg-[#3475d9] hover:bg-[#236ddb] text-white px-4 py-2 rounded-md transition text-sm text-center"
            >
              + Add New Test
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 sm:mb-6 text-sm">
            {error}
          </div>
        )}

        {(selectedSubject !== "All" || normalizedSearchQuery) && (
          <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Showing {filteredTests.length} of {tests.length} tests
          </div>
        )}

        {tests.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 sm:p-12 text-center shadow-sm">
            <FaQuestionCircle className="text-5xl sm:text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No Tests Found</h2>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              You haven&apos;t created any tests yet.
            </p>
            <Link
              to="/add-test"
              className="inline-block bg-[#3475d9] hover:bg-[#236ddb] text-white px-6 py-3 rounded-lg transition text-sm"
            >
              Create Your First Test
            </Link>
          </div>
        ) : filteredTests.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 sm:p-12 text-center shadow-sm">
            <FaQuestionCircle className="text-5xl sm:text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              No Matching Tests
            </h2>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              Try changing your search text or subject filter.
            </p>
            <button
              onClick={() => {
                setSelectedSubject("All");
                setSearchQuery("");
              }}
              className="inline-block bg-[#3475d9] hover:bg-[#236ddb] text-white px-6 py-3 rounded-lg transition text-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {filteredTests.map((test) => (
              <div
                key={test._id}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-[#3475d9] hover:shadow-sm transition shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start sm:items-center gap-2 mb-2">
                      <h3 className="text-base sm:text-xl font-bold text-gray-800 truncate">
                        {test.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs border shrink-0 ${test.isActive
                            ? "bg-green-50 text-green-600 border-green-200"
                            : "bg-red-50 text-red-600 border-red-200"
                          }`}
                      >
                        {test.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-gray-500 text-xs sm:text-sm">
                      <span className="flex items-center gap-1 sm:gap-2">
                        <FaBook className="text-[#3475d9]" />
                        {test.subject || "N/A"}
                      </span>
                      <span className="flex items-center gap-1 sm:gap-2">
                        <FaClock className="text-[#3475d9]" />
                        {formatDuration(test.duration)}
                      </span>
                      <span className="flex items-center gap-1 sm:gap-2">
                        <FaQuestionCircle className="text-[#3475d9]" />
                        {test.numberOfQuestions} Q
                      </span>
                      <span className="hidden sm:inline">
                        Created: {formatDate(test.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <button
                      onClick={() => handleView(test._id)}
                      className="flex-1 sm:flex-none p-2 bg-blue-50 text-[#3475d9] rounded-lg hover:bg-blue-100 transition border border-blue-200 flex items-center justify-center gap-1"
                      title="View"
                    >
                      <FaEye />
                      <span className="sm:hidden text-xs">View</span>
                    </button>

                    <button
                      onClick={() => handleEdit(test._id)}
                      className="flex-1 sm:flex-none p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition border border-yellow-200 flex items-center justify-center gap-1"
                      title="Edit"
                    >
                      <FaEdit />
                      <span className="sm:hidden text-xs">Edit</span>
                    </button>

                    <button
                      onClick={() => setDeleteModal({ open: true, test })}
                      className="flex-1 sm:flex-none p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition border border-red-200 flex items-center justify-center gap-1"
                      title="Delete"
                    >
                      <FaTrash />
                      <span className="sm:hidden text-xs">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* View Modal */}
      {viewModal.open && viewModal.test && (
        <ViewModal
          test={viewModal.test}
          onClose={() => setViewModal({ open: false, test: null })}
        />
      )}

      {/* Edit Modal */}
      {editModal.open && editModal.test && (
        <EditModal
          test={editModal.test}
          token={token}
          onClose={() => setEditModal({ open: false, test: null })}
          onSave={(updatedTest) => {
            setTests(
              tests.map((t) => (t._id === updatedTest._id ? updatedTest : t))
            );
            setEditModal({ open: false, test: null });
          }}
        />
      )}

      {/* Delete Modal */}
      {deleteModal.open && deleteModal.test && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 max-w-md w-full shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Delete Test</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Are you sure you want to delete &quot;{deleteModal.test.name}&quot;?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 sm:gap-4">
              <button
                onClick={() => setDeleteModal({ open: false, test: null })}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition border border-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// View Modal Component
const ViewModal = ({ test, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 truncate pr-4">{test.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition shrink-0"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="flex flex-wrap gap-3 sm:gap-6 mb-4 sm:mb-6">
            <span className="bg-amber-50 text-amber-700 px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 border border-amber-200 text-sm">
              <FaBook />
              {test.subject || "N/A"}
            </span>
            <span className="bg-blue-50 text-[#3475d9] px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 border border-blue-200 text-sm">
              <FaClock />
              {test.duration === 60 ? "1 Hour" : `${test.duration} Min`}
            </span>
            <span className="bg-green-50 text-green-600 px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 border border-green-200 text-sm">
              <FaQuestionCircle />
              {test.numberOfQuestions} Questions
            </span>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {test.questions.map((q, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200"
              >
                <h4 className="text-gray-800 font-medium mb-3 text-sm sm:text-base">
                  Q{index + 1}. {q.questionText}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oIndex) => (
                    <div
                      key={oIndex}
                      className={`p-2 rounded flex items-center gap-2 text-sm ${q.correctAnswer === oIndex
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-white text-gray-600 border border-gray-200"
                        }`}
                    >
                      <span className="font-bold">
                        {String.fromCharCode(65 + oIndex)}.
                      </span>
                      <span className="flex-1">{opt}</span>
                      {q.correctAnswer === oIndex && (
                        <FaCheck className="text-green-600 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 sm:py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition border border-gray-300 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Edit Modal Component
const EditModal = ({ test, token, onClose, onSave }) => {
  const [testName, setTestName] = useState(test.name);
  const [subject, setSubject] = useState(test.subject || "");
  const [duration, setDuration] = useState(test.duration);
  const [isActive, setIsActive] = useState(test.isActive);
  const [questions, setQuestions] = useState(test.questions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subjectOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "General Aptitude", label: "General Aptitude" },
    {
      value: "Computer Science & Applications",
      label: "Computer Science & Applications",
    },
    { value: "Mathematics", label: "Mathematics" },
  ];

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updated = [...questions];
    updated[questionIndex].correctAnswer = optionIndex;
    setQuestions(updated);
  };

  const handleSave = async () => {
    setError("");

    if (!subject) {
      setError("Subject is required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/${test._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: testName,
            subject,
            duration,
            isActive,
            questions,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        onSave(data.test);
      } else {
        setError(data.message || "Failed to update test");
      }
    } catch (error) {
      console.error("Update test error:", error);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Edit Test</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 sm:mb-6 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Test Name
              </label>
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full bg-white text-gray-800 px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3475d9] outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white text-gray-800 px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3475d9] outline-none text-sm"
              >
                <option value="">Select Subject</option>
                {subjectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full bg-white text-gray-800 px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3475d9] outline-none text-sm"
              >
                <option value={10}>10 Minutes</option>
                <option value={20}>20 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={60}>1 Hour</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Status
              </label>
              <select
                value={isActive}
                onChange={(e) => setIsActive(e.target.value === "true")}
                className="w-full bg-white text-gray-800 px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3475d9] outline-none text-sm"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Questions</h3>
          <div className="space-y-3 sm:space-y-4">
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200"
              >
                <div className="mb-2 sm:mb-3">
                  <label className="block text-gray-700 text-xs sm:text-sm mb-1">
                    Question {qIndex + 1}
                  </label>
                  <textarea
                    value={q.questionText}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    className="w-full bg-white text-gray-800 px-3 py-2 rounded border border-gray-300 focus:border-[#3475d9] outline-none resize-none text-sm"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCorrectAnswerChange(qIndex, oIndex)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 ${q.correctAnswer === oIndex
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-500"
                          }`}
                      >
                        {String.fromCharCode(65 + oIndex)}
                      </button>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        className="flex-1 bg-white text-gray-800 px-3 py-2 rounded border border-gray-300 focus:border-[#3475d9] outline-none text-sm min-w-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition border border-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 sm:px-6 py-2 bg-[#3475d9] text-white rounded-lg hover:bg-[#236ddb] transition disabled:bg-blue-300 text-sm"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestListPage;
