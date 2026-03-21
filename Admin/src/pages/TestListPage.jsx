import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  FaArrowLeft,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCheck,
  FaClock,
  FaQuestionCircle,
} from "react-icons/fa";

const TestListPage = () => {
  const { token } = useAdminAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    return `${minutes} Minutes`;
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading tests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Test List</h1>
          </div>
          <Link
            to="/add-test"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            + Add New Test
          </Link>
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

        {tests.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <FaQuestionCircle className="text-6xl text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No Tests Found</h2>
            <p className="text-gray-400 mb-6">
              You haven&apos;t created any tests yet.
            </p>
            <Link
              to="/add-test"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Create Your First Test
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {tests.map((test) => (
              <div
                key={test._id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex items-center justify-between hover:border-gray-600 transition"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {test.name}
                  </h3>
                  <div className="flex items-center gap-6 text-gray-400">
                    <span className="flex items-center gap-2">
                      <FaClock />
                      {formatDuration(test.duration)}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaQuestionCircle />
                      {test.numberOfQuestions} Questions
                    </span>
                    <span className="text-sm">
                      Created: {formatDate(test.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${test.isActive
                        ? "bg-green-600/20 text-green-400"
                        : "bg-red-600/20 text-red-400"
                      }`}
                  >
                    {test.isActive ? "Active" : "Inactive"}
                  </span>

                  <button
                    onClick={() => handleView(test._id)}
                    className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition"
                    title="View"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => handleEdit(test._id)}
                    className="p-2 bg-yellow-600/20 text-yellow-400 rounded-lg hover:bg-yellow-600/30 transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => setDeleteModal({ open: true, test })}
                    className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Delete Test</h2>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete &quot;{deleteModal.test.name}&quot;?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteModal({ open: false, test: null })}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// View Modal Component
const ViewModal = ({ test, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{test.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex gap-6 mb-6">
            <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2">
              <FaClock />
              {test.duration === 60 ? "1 Hour" : `${test.duration} Minutes`}
            </span>
            <span className="bg-green-600/20 text-green-400 px-4 py-2 rounded-lg flex items-center gap-2">
              <FaQuestionCircle />
              {test.numberOfQuestions} Questions
            </span>
          </div>

          <div className="space-y-6">
            {test.questions.map((q, index) => (
              <div
                key={index}
                className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
              >
                <h4 className="text-white font-medium mb-3">
                  Q{index + 1}. {q.questionText}
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {q.options.map((opt, oIndex) => (
                    <div
                      key={oIndex}
                      className={`p-2 rounded flex items-center gap-2 ${q.correctAnswer === oIndex
                          ? "bg-green-600/20 text-green-400"
                          : "bg-gray-600/50 text-gray-300"
                        }`}
                    >
                      <span className="font-bold">
                        {String.fromCharCode(65 + oIndex)}.
                      </span>
                      {opt}
                      {q.correctAnswer === oIndex && (
                        <FaCheck className="ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
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
  const [duration, setDuration] = useState(test.duration);
  const [isActive, setIsActive] = useState(test.isActive);
  const [questions, setQuestions] = useState(test.questions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);
    setError("");

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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Edit Test</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Test Name
              </label>
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 outline-none"
              >
                <option value={10}>10 Minutes</option>
                <option value={20}>20 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={60}>1 Hour</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Status
              </label>
              <select
                value={isActive}
                onChange={(e) => setIsActive(e.target.value === "true")}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 outline-none"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-4">Questions</h3>
          <div className="space-y-4">
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
              >
                <div className="mb-3">
                  <label className="block text-gray-300 text-sm mb-1">
                    Question {qIndex + 1}
                  </label>
                  <textarea
                    value={q.questionText}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 outline-none resize-none"
                    rows={2}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCorrectAnswerChange(qIndex, oIndex)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${q.correctAnswer === oIndex
                            ? "bg-green-600 text-white"
                            : "bg-gray-600 text-gray-400"
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
                        className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-800"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestListPage;
