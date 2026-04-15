import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  HiOutlineClock,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineExclamationCircle,
  HiX,
  HiOutlineViewGrid,
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

function TestPage() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const { user, scrollUp } = useAuth();

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
  const [showQuestionNav, setShowQuestionNav] = useState(false);
  const [isTestActive, setIsTestActive] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [pendingLeavePath, setPendingLeavePath] = useState(null);
  const allowNavigationRef = useRef(false);

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
        setIsTestActive(true);
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
      const headers = {
        'Content-Type': 'application/json',
      };

      // Add auth token if user is logged in
      if (user?.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/public/${testId}/submit`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            answers: selected,
            timeTaken: totalTime - timeLeft,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        allowNavigationRef.current = true;
        setIsTestActive(false);
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
  }, [selected, timeLeft, totalTime, testId, navigate, isSubmitting, user]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isTestActive || isSubmitting || allowNavigationRef.current) return;

      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isTestActive, isSubmitting]);

  useEffect(() => {
    if (!isTestActive || isSubmitting) return;

    const lockedPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    const resolveNextPath = (urlLike) => {
      if (!urlLike) return null;
      try {
        const resolved = new URL(String(urlLike), window.location.origin);
        if (resolved.origin !== window.location.origin) return null;
        return `${resolved.pathname}${resolved.search}${resolved.hash}`;
      } catch {
        return null;
      }
    };

    const interceptRouteChange = (urlLike) => {
      if (!isTestActive || isSubmitting || allowNavigationRef.current) return false;

      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const nextPath = resolveNextPath(urlLike);

      if (!nextPath || nextPath === currentPath) return false;

      setPendingLeavePath(nextPath);
      setShowLeaveConfirm(true);
      return true;
    };

    window.history.pushState = function pushStatePatched(state, title, url) {
      if (interceptRouteChange(url)) return;
      originalPushState(state, title, url);
    };

    window.history.replaceState = function replaceStatePatched(state, title, url) {
      if (interceptRouteChange(url)) return;
      originalReplaceState(state, title, url);
    };

    const handlePopState = () => {
      if (!isTestActive || isSubmitting || allowNavigationRef.current) return;

      setPendingLeavePath('@@BACK@@');
      setShowLeaveConfirm(true);
      originalPushState(null, '', lockedPath);
    };

    window.history.pushState(null, '', lockedPath);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isTestActive, isSubmitting]);

  const handleLeaveTest = () => {
    allowNavigationRef.current = true;
    setIsTestActive(false);
    setShowLeaveConfirm(false);
    setShowSubmitConfirm(false);
    setShowQuestionNav(false);

    if (pendingLeavePath === '@@BACK@@') {
      navigate(-1);
      return;
    }

    if (pendingLeavePath) {
      navigate(pendingLeavePath);
      return;
    }

    navigate('/start-test', { replace: true });
  };

  const handleExitQuizClick = () => {
    if (isSubmitting) return;
    setPendingLeavePath('/start-test');
    setShowLeaveConfirm(true);
  };

  const handleStayInTest = () => {
    setShowLeaveConfirm(false);
    setPendingLeavePath(null);
  };

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

  const handleQuestionSelect = (index) => {
    setCurrentQ(index);
    setShowQuestionNav(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600 text-lg lg:text-xl">Loading test...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8 text-center max-w-md w-full">
          <HiOutlineExclamationCircle className="text-4xl lg:text-5xl text-red-500 mx-auto mb-4" />
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4 text-sm lg:text-base">{error}</p>
          <button
            onClick={() => navigate('/start-test')}
            className="bg-[#3475d9] hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm lg:text-base"
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
    <div className="min-h-screen bg-linear-to-r from-[#dcecff] via-[#eef4ff] to-[#f3efff] flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-3 lg:px-6 py-2 lg:py-3 flex items-center justify-between fixed top-16 w-full z-30">
        
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Mobile Question Nav Toggle */}
          <button
            onClick={() => setShowQuestionNav(true)}
            className="lg:hidden p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <HiOutlineViewGrid className="text-xl" />
          </button>
          <div>
            <h1 className="text-sm lg:text-lg font-bold text-gray-800 truncate max-w-[150px] sm:max-w-none">
              {test?.name || 'Practice Test'}
            </h1>
            <p className="text-xs text-gray-500">
              Q {currentQ + 1} / {questions.length}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-6">
          {/* Timer */}
          <div
            className={`flex items-center gap-1 lg:gap-2 text-sm lg:text-lg font-mono font-bold px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg ${
              isLowTime
                ? 'bg-red-100 text-red-600 animate-pulse'
                : 'bg-blue-50 text-[#3475d9]'
            }`}
          >
            <HiOutlineClock className="text-lg lg:text-xl" />
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={handleExitQuizClick}
            disabled={isSubmitting}
            className="hidden sm:block border border-red-300 text-red-600 hover:bg-red-50 font-semibold px-3 lg:px-5 py-1.5 lg:py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-60 text-sm lg:text-base"
          >
            Exit Quiz
          </button>
          <button
            onClick={() => setShowSubmitConfirm(true)}
            disabled={isSubmitting}
            className="hidden sm:block bg-green-600 hover:bg-green-700 text-white font-semibold px-3 lg:px-5 py-1.5 lg:py-2 rounded-lg transition-colors cursor-pointer disabled:bg-green-400 text-sm lg:text-base"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Question Navigation Panel - Desktop */}
        <aside className="hidden lg:block w-56 pt-24 bg-white border-r border-gray-200 p-4 fixed top-[61px] bottom-0 left-0 overflow-y-auto">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Questions
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={`w-9 h-9 rounded-sm text-sm font-semibold transition-colors cursor-pointer ${
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
        <main className="flex-1 p-4 lg:p-8 lg:ml-56 mt-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-8">
              {/* Question */}
              <div className="mb-4 lg:mb-6">
                <span className="text-xs font-semibold text-[#3475d9] bg-blue-50 px-2 lg:px-2.5 py-1 rounded-full">
                  Question {currentQ + 1}
                </span>
                <h2 className="text-base lg:text-lg font-semibold text-gray-800 mt-3 leading-relaxed">
                  {questions[currentQ]?.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-2 lg:space-y-3">
                {questions[currentQ]?.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-3 lg:px-5 py-3 lg:py-4 rounded-lg border-2 transition-all duration-150 cursor-pointer text-sm lg:text-base ${
                      selected[currentQ] === idx
                        ? 'border-[#3475d9] bg-blue-50 text-[#3475d9]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="font-semibold mr-2 lg:mr-3">
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
                  className="mt-3 lg:mt-4 text-xs lg:text-sm text-red-500 hover:text-red-700 font-medium cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-4 lg:mt-6 gap-3">
              <button
                onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
                disabled={currentQ === 0}
                className="flex items-center gap-1 px-3 lg:px-5 py-2 lg:py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer text-sm lg:text-base"
              >
                <HiOutlineChevronLeft />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Mobile Submit Button */}
              <button
                onClick={() => setShowSubmitConfirm(true)}
                disabled={isSubmitting}
                className="sm:hidden flex-1 mx-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer disabled:bg-green-400 text-sm"
              >
                Submit
              </button>

              {currentQ < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQ((c) => c + 1)}
                  className="flex items-center gap-1 px-3 lg:px-5 py-2 lg:py-2.5 rounded-lg bg-[#3475d9] hover:bg-blue-700 text-white font-medium transition-colors cursor-pointer text-sm lg:text-base"
                >
                  <span className="hidden sm:inline">Next</span>
                  <HiOutlineChevronRight />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  disabled={isSubmitting}
                  className="hidden sm:flex items-center gap-1 px-3 lg:px-5 py-2 lg:py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors cursor-pointer disabled:bg-green-400 text-sm lg:text-base"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Question Navigation Panel */}
      {showQuestionNav && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowQuestionNav(false)}
          />
          {/* Panel */}
          <div className="relative bg-white w-72 max-w-[85vw] h-full overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800">
                Questions
              </h3>
              <button
                onClick={() => setShowQuestionNav(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-6">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleQuestionSelect(i)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
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

            <div className="space-y-2 text-sm text-gray-500 border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm bg-green-100 border border-green-300 inline-block" />
                Answered ({answeredCount})
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm bg-gray-100 inline-block" />
                Not Answered ({questions.length - answeredCount})
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm bg-[#3475d9] inline-block" />
                Current
              </div>
            </div>

            <button
              onClick={handleExitQuizClick}
              disabled={isSubmitting}
              className="w-full mt-4 border border-red-300 text-red-600 hover:bg-red-50 font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
            >
              Exit Quiz
            </button>

            <button
              onClick={() => {
                setShowQuestionNav(false);
                setShowSubmitConfirm(true);
              }}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Submit Test
            </button>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-blue-600 px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
              <h3 className="text-base lg:text-lg font-bold text-white">Submit Test</h3>
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <HiX className="text-xl" />
              </button>
            </div>
            <div className="px-4 lg:px-6 py-4 lg:py-6">
              <div className="flex items-start gap-3 lg:gap-4">
                <div className="bg-amber-100 p-2 rounded-full shrink-0 mt-0.5">
                  <HiOutlineExclamationCircle className="text-xl lg:text-2xl text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2 text-sm lg:text-base">
                    Are you sure you want to submit the test?
                  </p>
                  <p className="text-xs lg:text-sm text-gray-500 mb-1">
                    Answered: <strong className="text-green-600">{answeredCount}</strong> / {questions.length}
                  </p>
                  {answeredCount < questions.length && (
                    <p className="text-xs lg:text-sm text-amber-600">
                      You have {questions.length - answeredCount} unanswered question(s).
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="px-4 lg:px-6 py-3 lg:py-4 bg-gray-50 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 lg:px-5 py-2 lg:py-2.5 rounded-sm border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors cursor-pointer text-sm"
              >
                Go Back
              </button>
              <button
                onClick={() => {handleFinish(); scrollUp()}}
                disabled={isSubmitting}
                className="px-4 lg:px-5 py-2 lg:py-2.5 rounded-sm bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-blue-400 text-sm"
              >
                {isSubmitting ? 'Submitting...' : 'Yes, Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Test Confirmation Modal */}
      {showLeaveConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-red-600 px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
              <h3 className="text-base lg:text-lg font-bold text-white">Leave Test?</h3>
              <button
                onClick={handleStayInTest}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <HiX className="text-xl" />
              </button>
            </div>
            <div className="px-4 lg:px-6 py-4 lg:py-6">
              <div className="flex items-start gap-3 lg:gap-4">
                <div className="bg-red-100 p-2 rounded-full shrink-0 mt-0.5">
                  <HiOutlineExclamationCircle className="text-xl lg:text-2xl text-red-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2 text-sm lg:text-base">
                    Your test is still running.
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600">
                    If you leave now, this quiz will be closed and your current progress may be lost.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 lg:px-6 py-3 lg:py-4 bg-gray-50 flex items-center justify-end gap-3">
              <button
                onClick={handleStayInTest}
                className="px-4 lg:px-5 py-2 lg:py-2.5 rounded-sm border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors cursor-pointer text-sm"
              >
                Continue Test
              </button>
              <button
                onClick={handleLeaveTest}
                className="px-4 lg:px-5 py-2 lg:py-2.5 rounded-sm bg-red-600 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer text-sm"
              >
                Yes, Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestPage;
