import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { FaArrowLeft, FaPlus, FaTrash, FaCheck } from "react-icons/fa";

const AddTestPage = () => {
  const { token } = useAdminAuth();
  const navigate = useNavigate();

  const [testName, setTestName] = useState("");
  const [duration, setDuration] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const durationOptions = [
    { value: 10, label: "10 Minutes" },
    { value: 20, label: "20 Minutes" },
    { value: 30, label: "30 Minutes" },
    { value: 60, label: "1 Hour" },
  ];

  const questionOptions = [
    { value: 10, label: "10 Questions" },
    { value: 30, label: "30 Questions" },
    { value: 50, label: "50 Questions" },
    { value: 100, label: "100 Questions" },
  ];

  const handleNumberOfQuestionsChange = (value) => {
    const num = parseInt(value);
    setNumberOfQuestions(num);

    const newQuestions = Array.from({ length: num }, (_, index) => ({
      id: index + 1,
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: null,
    }));
    setQuestions(newQuestions);
  };

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

  const validateForm = () => {
    if (!testName.trim()) {
      setError("Test name is required");
      return false;
    }
    if (!duration) {
      setError("Duration is required");
      return false;
    }
    if (!numberOfQuestions) {
      setError("Number of questions is required");
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        setError(`Question ${i + 1}: Question text is required`);
        return false;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          setError(`Question ${i + 1}: Option ${j + 1} is required`);
          return false;
        }
      }
      if (q.correctAnswer === null) {
        setError(`Question ${i + 1}: Please select the correct answer`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: testName,
            duration: parseInt(duration),
            numberOfQuestions: parseInt(numberOfQuestions),
            questions: questions.map((q) => ({
              questionText: q.questionText,
              options: q.options,
              correctAnswer: q.correctAnswer,
            })),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("Test created successfully!");
        setTimeout(() => {
          navigate("/test-list");
        }, 1500);
      } else {
        setError(data.message || "Failed to create test");
      }
    } catch (error) {
      console.error("Create test error:", error);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Add New Test</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-6">
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

        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Test Configuration */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-6">Test Configuration</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Test Name
                </label>
                <input
                  type="text"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                  placeholder="e.g., GATE CS Mock Test 1"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                >
                  <option value="">Select Duration</option>
                  {durationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Number of Questions
                </label>
                <select
                  value={numberOfQuestions}
                  onChange={(e) => handleNumberOfQuestionsChange(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                >
                  <option value="">Select Number</option>
                  {questionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Questions */}
          {questions.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">
                Questions ({questions.length})
              </h2>

              {questions.map((question, qIndex) => (
                <div
                  key={question.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Question {qIndex + 1}
                    </h3>
                    {question.correctAnswer !== null && (
                      <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <FaCheck className="text-xs" />
                        Answer Selected
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Question Text
                    </label>
                    <textarea
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
                      rows={2}
                      placeholder="Enter your question here..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleCorrectAnswerChange(qIndex, oIndex)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                            question.correctAnswer === oIndex
                              ? "bg-green-600 text-white"
                              : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                          }`}
                        >
                          {String.fromCharCode(65 + oIndex)}
                        </button>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e.target.value)
                          }
                          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                          placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                        />
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-500 text-sm mt-4">
                    Click on A, B, C, or D to mark the correct answer
                  </p>
                </div>
              ))}

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-4">
                <Link
                  to="/dashboard"
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    "Creating..."
                  ) : (
                    <>
                      <FaPlus />
                      Create Test
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default AddTestPage;
