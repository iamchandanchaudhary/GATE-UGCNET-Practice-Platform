import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { FaPlus, FaCheck } from "react-icons/fa";

const AddTestPage = () => {
  const { token } = useAdminAuth();
  const navigate = useNavigate();

  const [testName, setTestName] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const subjectOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "General Aptitude", label: "General Aptitude" },
    { value: "Computer Science & Applications", label: "Computer Science & Applications" },
    { value: "Mathematics", label: "Mathematics" },
  ];

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
    if (!subject) {
      setError("Subject is required");
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
            subject: subject,
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
    <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Add New Test</h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">Create a new test with questions for students</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Test Configuration */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Test Configuration</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Test Name
              </label>
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full bg-white text-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-[#3475d9] focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
                placeholder="e.g., GATE CS Mock Test 1"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white text-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-[#3475d9] focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
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
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-white text-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-[#3475d9] focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
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
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Number of Questions
              </label>
              <select
                value={numberOfQuestions}
                onChange={(e) => handleNumberOfQuestionsChange(e.target.value)}
                className="w-full bg-white text-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-[#3475d9] focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
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
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-800">
              Questions ({questions.length})
            </h2>

            {questions.map((question, qIndex) => (
              <div
                key={question.id}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Question {qIndex + 1}
                  </h3>
                  {question.correctAnswer !== null && (
                    <span className="bg-green-50 text-green-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 border border-green-200 w-fit">
                      <FaCheck className="text-xs" />
                      Answer Selected
                    </span>
                  )}
                </div>

                <div className="mb-3 sm:mb-4">
                  <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Question Text
                  </label>
                  <textarea
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    className="w-full bg-white text-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-[#3475d9] focus:ring-2 focus:ring-blue-100 outline-none transition resize-none text-sm"
                    rows={2}
                    placeholder="Enter your question here..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => handleCorrectAnswerChange(qIndex, oIndex)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition text-sm shrink-0 ${
                          question.correctAnswer === oIndex
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-300"
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
                        className="flex-1 bg-white text-gray-800 px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3475d9] focus:ring-2 focus:ring-blue-100 outline-none transition text-sm min-w-0"
                        placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                      />
                    </div>
                  ))}
                </div>

                <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
                  Click on A, B, C, or D to mark the correct answer
                </p>
              </div>
            ))}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                to="/dashboard"
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition border border-gray-300 text-center text-sm"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#3475d9] text-white rounded-lg hover:bg-[#236ddb] transition disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
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
  );
};

export default AddTestPage;
