import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineMinusCircle,
  HiOutlineClock,
  HiOutlineArrowLeft,
  HiOutlineRefresh,
} from 'react-icons/hi';
import Sidebar from '../components/Sidebar';

function TestReportPage() {
  const navigate = useNavigate();

  const data = sessionStorage.getItem('testResult');
  const result = data ? JSON.parse(data) : null;

  useEffect(() => {
    if (!result) {
      navigate('/dashboard', { replace: true });
    }
  }, [result, navigate]);

  if (!result) return null;

  const total = result.totalQuestions || result.total;
  const percentage = result.score;
  const timeTakenMin = Math.floor(result.timeTaken / 60);
  const timeTakenSec = result.timeTaken % 60;
  const questions = result.questions || result.details || [];

  let gradeColor = 'text-red-600';
  let gradeBg = 'bg-red-50';
  let gradeLabel = 'Needs Improvement';
  if (percentage >= 80) {
    gradeColor = 'text-green-600';
    gradeBg = 'bg-green-50';
    gradeLabel = 'Excellent';
  } else if (percentage >= 60) {
    gradeColor = 'text-blue-600';
    gradeBg = 'bg-blue-50';
    gradeLabel = 'Good';
  } else if (percentage >= 40) {
    gradeColor = 'text-yellow-600';
    gradeBg = 'bg-yellow-50';
    gradeLabel = 'Average';
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-56 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Test Report</h1>
            <p className="text-gray-500 mt-1">
              {result.testName || 'Practice Test'} — Results
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/my-tests"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              <HiOutlineArrowLeft />
              My Tests
            </Link>
            <Link
              to="/start-test"
              className="flex items-center gap-2 bg-[#3475d9] hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <HiOutlineRefresh />
              Take Another Test
            </Link>
          </div>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Big Score Card */}
          <div className={`col-span-1 rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center ${gradeBg}`}>
            <p className={`text-5xl font-extrabold ${gradeColor}`}>{percentage}%</p>
            <p className={`text-sm font-semibold mt-2 ${gradeColor}`}>{gradeLabel}</p>
            <p className="text-xs text-gray-500 mt-1">
              {result.correct} / {total} correct
            </p>
          </div>

          {/* Stats */}
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <HiOutlineCheckCircle className="text-2xl text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{result.correct}</p>
                <p className="text-sm text-gray-500">Correct</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <HiOutlineXCircle className="text-2xl text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{result.wrong}</p>
                <p className="text-sm text-gray-500">Wrong</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <HiOutlineMinusCircle className="text-2xl text-gray-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{result.unanswered}</p>
                <p className="text-sm text-gray-500">Unanswered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Time Taken */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 mb-8 max-w-xs">
          <div className="bg-blue-100 p-3 rounded-lg">
            <HiOutlineClock className="text-2xl text-[#3475d9]" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">
              {timeTakenMin}m {timeTakenSec}s
            </p>
            <p className="text-sm text-gray-500">Time Taken</p>
          </div>
        </div>

        {/* Detailed Review */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">
              Question-wise Review
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {questions.map((q, idx) => {
              const correctAnswer = q.correctAnswer !== undefined ? q.correctAnswer : q.answer;
              const userAnswer = q.userAnswer !== undefined ? q.userAnswer : q.selected;
              const isCorrect = q.isCorrect;
              const wasAnswered = userAnswer !== null;

              return (
                <div key={q.id || idx} className="px-6 py-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      className={`mt-1 shrink-0 ${
                        isCorrect
                          ? 'text-green-500'
                          : wasAnswered
                          ? 'text-red-500'
                          : 'text-gray-400'
                      }`}
                    >
                      {isCorrect ? (
                        <HiOutlineCheckCircle className="text-xl" />
                      ) : wasAnswered ? (
                        <HiOutlineXCircle className="text-xl" />
                      ) : (
                        <HiOutlineMinusCircle className="text-xl" />
                      )}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-400 mb-1">
                        Question {idx + 1}
                      </p>
                      <p className="text-gray-800 font-medium leading-relaxed">
                        {q.question}
                      </p>
                    </div>
                  </div>

                  <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => {
                      let optClass = 'border-gray-200 text-gray-600';
                      if (oi === correctAnswer) {
                        optClass = 'border-green-400 bg-green-50 text-green-700';
                      } else if (oi === userAnswer && !isCorrect) {
                        optClass = 'border-red-400 bg-red-50 text-red-700';
                      }
                      return (
                        <div
                          key={oi}
                          className={`px-4 py-2.5 rounded-lg border text-sm ${optClass}`}
                        >
                          <span className="font-semibold mr-2">
                            {String.fromCharCode(65 + oi)}.
                          </span>
                          {opt}
                          {oi === correctAnswer && (
                            <span className="ml-2 text-xs font-bold text-green-600">
                              Correct
                            </span>
                          )}
                          {oi === userAnswer && oi !== correctAnswer && (
                            <span className="ml-2 text-xs font-bold text-red-600">
                              Your Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TestReportPage;
