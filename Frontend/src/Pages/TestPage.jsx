import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  HiOutlineClock,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineExclamationCircle,
  HiX,
} from 'react-icons/hi';

function TestPage() {
  const navigate = useNavigate();
  const { testId } = useParams();

  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTest();
  }, [testId]);

  const fetchTest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/public/${testId}`
      );
      const data = await response.json();

      if (data.success) {
        setTest(data.test);
        setQuestions(data.test.questions);
        setSelected(Array(data.test.questions.length).fill(null));
        const duration = data.test.duration * 60;
        setTimeLeft(duration);
        setTotalTime(duration);
      } else {
        setError(data.message || 'Failed to load test');
      }
    } catch (error) {
      console.error('Fetch test error:', error);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/public/${testId}/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answers: selected,
            timeTaken: totalTime - timeLeft,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem('testResult', JSON.stringify(data.result));
        navigate('/test-report', { replace: true });
      } else {
        setError(data.message || 'Failed to submit test');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Submit test error:', error);
      setError('Connection error. Please try again.');
      setIsSubmitting(false);
    }
  }, [selected, timeLeft, totalTime, testId, navigate, isSubmitting]);

  // Timer
  useEffect(() => {
    if (loading || timeLeft <= 0) return;

    if (timeLeft === 1) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, handleFinish]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleSelect = (optionIndex) => {
    const copy = [...selected];
    copy[currentQ] = optionIndex;
    setSelected(copy);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading test...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md">
          <HiOutlineExclamationCircle className="text-5xl text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/start-test')}
            className="bg-[#3475d9] hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const answeredCount = selected.filter((s) => s !== null).length;
  const isLowTime = timeLeft <= 120;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            {test?.name || 'Practice Test'}
          </h1>
          <p className="text-xs text-gray-500">
            Question {currentQ + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center gap-6">
          {/* Timer */}
          <div
            className={`flex items-center gap-2 text-lg font-mono font-bold px-4 py-2 rounded-lg ${
              isLowTime
                ? 'bg-red-100 text-red-600 animate-pulse'
                : 'bg-blue-50 text-[#3475d9]'
            }`}
          >
            <HiOutlineClock className="text-xl" />
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => setShowSubmitConfirm(true)}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer disabled:bg-green-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Test'}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Question Navigation Panel */}
        <aside className="w-56 bg-white border-r border-gray-200 p-4 fixed top-15.25 bottom-0 left-0 overflow-y-auto">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Questions
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  currentQ === i
                    ? 'bg-[#3475d9] text-white'
                    : selected[i] !== null
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-green-100 border border-green-300 inline-block" />
              Answered ({answeredCount})
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-gray-100 inline-block" />
              Not Answered ({questions.length - answeredCount})
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#3475d9] inline-block" />
              Current
            </div>
          </div>
        </aside>

        {/* Main Question Area */}
        <main className="ml-56 flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {/* Question */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-[#3475d9] bg-blue-50 px-2.5 py-1 rounded-full">
                  Question {currentQ + 1}
                </span>
                <h2 className="text-lg font-semibold text-gray-800 mt-3 leading-relaxed">
                  {questions[currentQ]?.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQ]?.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all duration-150 cursor-pointer ${
                      selected[currentQ] === idx
                        ? 'border-[#3475d9] bg-blue-50 text-[#3475d9]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="font-semibold mr-3">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>

              {/* Clear selection */}
              {selected[currentQ] !== null && (
                <button
                  onClick={() => {
                    const copy = [...selected];
                    copy[currentQ] = null;
                    setSelected(copy);
                  }}
                  className="mt-4 text-sm text-red-500 hover:text-red-700 font-medium cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
                disabled={currentQ === 0}
                className="flex items-center gap-1 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <HiOutlineChevronLeft />
                Previous
              </button>
              {currentQ < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQ((c) => c + 1)}
                  className="flex items-center gap-1 px-5 py-2.5 rounded-lg bg-[#3475d9] hover:bg-blue-700 text-white font-medium transition-colors cursor-pointer"
                >
                  Next
                  <HiOutlineChevronRight />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  disabled={isSubmitting}
                  className="flex items-center gap-1 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors cursor-pointer disabled:bg-green-400"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-green-600 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Submit Test</h3>
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <HiX className="text-xl" />
              </button>
            </div>
            <div className="px-6 py-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-full shrink-0 mt-0.5">
                  <HiOutlineExclamationCircle className="text-2xl text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2">
                    Are you sure you want to submit the test?
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Answered: <strong className="text-green-600">{answeredCount}</strong> / {questions.length}
                  </p>
                  {answeredCount < questions.length && (
                    <p className="text-sm text-amber-600">
                      You have {questions.length - answeredCount} unanswered question(s).
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Go Back
              </button>
              <button
                onClick={handleFinish}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors cursor-pointer disabled:bg-green-400"
              >
                {isSubmitting ? 'Submitting...' : 'Yes, Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestPage;
