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
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-600 text-xl">Loading tests...</div>
      </div>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Test List</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all your tests</p>
          </div>
          <Link
            to="/add-test"
            className="bg-[#3475d9] hover:bg-[#236ddb] text-white px-4 py-2 rounded-lg transition"
          >
            + Add New Test
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {tests.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Tests Found</h2>
            <p className="text-gray-500 mb-6">
              You haven&apos;t created any tests yet.
            </p>
            <Link
              to="/add-test"
              className="inline-block bg-[#3475d9] hover:bg-[#236ddb] text-white px-6 py-3 rounded-lg transition"
            >
              Create Your First Test
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {tests.map((test) => (
              <div
                key={test._id}
                className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between hover:border-[#3475d9] hover:shadow-sm transition shadow-sm"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {test.name}
                  </h3>
                  <div className="flex items-center gap-6 text-gray-500">
                    <span className="flex items-center gap-2">
                      <FaClock className="text-[#3475d9]" />
                      {formatDuration(test.duration)}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaQuestionCircle className="text-[#3475d9]" />
                      {test.numberOfQuestions} Questions
                    </span>
                    <span className="text-sm">
                      Created: {formatDate(test.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm border ${test.isActive
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-red-50 text-red-600 border-red-200"
                      }`}
                  >
                    {test.isActive ? "Active" : "Inactive"}
                  </span>

                  <button
                    onClick={() => handleView(test._id)}
                    className="p-2 bg-blue-50 text-[#3475d9] rounded-lg hover:bg-blue-100 transition border border-blue-200"
                    title="View"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => handleEdit(test._id)}
                    className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition border border-yellow-200"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => setDeleteModal({ open: true, test })}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition border border-red-200"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Test</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete &quot;{deleteModal.test.name}&quot;?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteModal({ open: false, test: null })}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition border border-gray-300"
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
    </>
  );
};

// View Modal Component
const ViewModal = ({ test, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{test.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex gap-6 mb-6">
            <span className="bg-blue-50 text-[#3475d9] px-4 py-2 rounded-lg flex items-center gap-2 border border-blue-200">
              <FaClock />
              {test.duration === 60 ? "1 Hour" : `${test.duration} Minutes`}
            </span>
            <span className="bg-green-50 text-green-600 px-4 py-2 rounded-lg flex items-center gap-2 border border-green-200">
              <FaQuestionCircle />
              {test.numberOfQuestions} Questions
            </span>
          </div>

          <div className="space-y-6">
            {test.questions.map((q, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <h4 className="text-gray-800 font-medium mb-3">
                  Q{index + 1}. {q.questionText}
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {q.options.map((opt, oIndex) => (
                    <div
                      key={oIndex}
                      className={`p-2 rounded flex items-center gap-2 ${q.correctAnswer === oIndex
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-white text-gray-600 border border-gray-200"
                        }`}
                    >
                      <span className="font-bold">
                        {String.fromCharCode(65 + oIndex)}.
                      </span>
                      {opt}
                      {q.correctAnswer === oIndex && (
                        <FaCheck className="ml-auto text-green-600" />
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
            className="w-full py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition border border-gray-300"
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Edit Test</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Test Name
              </label>
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3475d9] outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3475d9] outline-none"
              >
                <option value={10}>10 Minutes</option>
                <option value={20}>20 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={60}>1 Hour</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Status
              </label>
              <select
                value={isActive}
                onChange={(e) => setIsActive(e.target.value === "true")}
                className="w-full bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3475d9] outline-none"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-4">Questions</h3>
          <div className="space-y-4">
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm mb-1">
                    Question {qIndex + 1}
                  </label>
                  <textarea
                    value={q.questionText}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    className="w-full bg-white text-gray-800 px-3 py-2 rounded border border-gray-300 focus:border-[#3475d9] outline-none resize-none"
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
                        className="flex-1 bg-white text-gray-800 px-3 py-2 rounded border border-gray-300 focus:border-[#3475d9] outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-[#3475d9] text-white rounded-lg hover:bg-[#236ddb] transition disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestListPage;
