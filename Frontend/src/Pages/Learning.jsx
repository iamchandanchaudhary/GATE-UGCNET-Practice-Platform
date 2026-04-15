import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineBookOpen,
  HiOutlineClock,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineLightBulb,
  HiOutlinePlay,
  HiOutlineAcademicCap,
} from 'react-icons/hi';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';

const learningTracks = [
  {
    title: 'Computer Science Core',
    description: 'Build strong fundamentals for algorithms, DBMS, OS, CN, and TOC.',
    topics: ['Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks'],
    hours: '8-10 hrs/week',
  },
  {
    title: 'Mathematics for Aptitude + Core',
    description: 'Sharpen problem solving for discrete mathematics, linear algebra, and probability.',
    topics: ['Discrete Mathematics', 'Linear Algebra', 'Calculus Basics', 'Probability & Statistics'],
    hours: '5-6 hrs/week',
  },
  {
    title: 'General Aptitude',
    description: 'Improve speed and accuracy for verbal, analytical, and quantitative questions.',
    topics: ['Quantitative Aptitude', 'Logical Reasoning', 'Reading Comprehension', 'Grammar'],
    hours: '3-4 hrs/week',
  },
];

const weeklyPlan = [
  {
    day: 'Monday to Friday',
    focus: 'Concept Learning',
    detail: 'Choose 1-2 topics daily, revise class notes, and solve 20 mixed questions.',
  },
  {
    day: 'Saturday',
    focus: 'Practice + Analysis',
    detail: 'Attempt one sectional test and analyze every wrong answer.',
  },
  {
    day: 'Sunday',
    focus: 'Mock Test + Revision',
    detail: 'Attempt one full-length test and revise weak topics from the week.',
  },
];

const milestones = [
  {
    title: 'Foundation Phase',
    duration: 'Weeks 1-4',
    points: ['Complete core concepts', 'Prepare concise notes', 'Start easy-level questions'],
  },
  {
    title: 'Practice Phase',
    duration: 'Weeks 5-8',
    points: ['Solve topic-wise MCQs', 'Attempt sectional tests', 'Track accuracy by subject'],
  },
  {
    title: 'Exam Simulation Phase',
    duration: 'Weeks 9-12',
    points: ['Take full-length mock tests', 'Practice time management', 'Focus on error reduction'],
  },
];

function Learning() {
  const { scrollUp } = useAuth();

  return (
    <DashboardLayout>
      <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-linear-to-r from-[#bbdcfc] via-[#e9e4fc] to-[#d6d6fe] shadow-sm  p-6 sm:p-8 lg:p-10 mb-6 lg:mb-8">
        <div className="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-[#3475d9]/15 blur-2xl" />
        <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-sky-300/20 blur-2xl" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#2d4363] border border-white">
              <HiOutlineAcademicCap className="text-base" />
              Guided Preparation Zone
            </span>
            <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e3554] leading-tight">
              Learning Hub for GATE & UGC NET Preparation
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Plan your study with structured tracks, weekly targets, and mock-based revision.
              Use this section as your daily study dashboard before you attempt tests.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/start-test"
              onClick={scrollUp}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3475d9] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              <HiOutlinePlay className="text-base" />
              Start Practice Test
            </Link>
            <Link
              to="/reports"
              onClick={scrollUp}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-[#3475d9] hover:text-[#3475d9] transition-colors"
            >
              <HiOutlineChartBar className="text-base" />
              View Progress Reports
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="inline-flex rounded-lg bg-blue-100 p-2.5 mb-3">
            <HiOutlineBookOpen className="text-xl text-[#3475d9]" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Track by Subject</h2>
          <p className="text-sm text-gray-500 mt-1">Study chapter-wise with a clear order and focused outcomes.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="inline-flex rounded-lg bg-amber-100 p-2.5 mb-3">
            <HiOutlineClock className="text-xl text-amber-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Time-Boxed Routine</h2>
          <p className="text-sm text-gray-500 mt-1">Use weekly hours and strict revision windows for consistency.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="inline-flex rounded-lg bg-green-100 p-2.5 mb-3">
            <HiOutlineClipboardList className="text-xl text-green-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Practice + Analysis</h2>
          <p className="text-sm text-gray-500 mt-1">Attempt tests regularly and learn from every wrong answer.</p>
        </div>
      </section>

      <section className="mb-6 lg:mb-8">
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineBookOpen className="text-[#3475d9] text-xl" />
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Learning Tracks</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {learningTracks.map((track) => (
            <article key={track.title} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 lg:p-6">
              <h3 className="text-lg font-bold text-gray-800">{track.title}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">{track.description}</p>

              <ul className="mt-4 space-y-2">
                {track.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#3475d9]" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3475d9]">
                <HiOutlineClock className="text-sm" />
                Recommended: {track.hours}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5 lg:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineClipboardList className="text-[#3475d9] text-xl" />
            <h2 className="text-xl font-bold text-gray-800">Weekly Study Plan</h2>
          </div>
          <div className="space-y-4">
            {weeklyPlan.map((item) => (
              <div key={item.day} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#3475d9]">{item.day}</p>
                <h3 className="text-base font-bold text-gray-800 mt-1">{item.focus}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 lg:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineChartBar className="text-[#3475d9] text-xl" />
            <h2 className="text-xl font-bold text-gray-800">12-Week Milestones</h2>
          </div>

          <div className="space-y-4">
            {milestones.map((phase) => (
              <div key={phase.title} className="relative pl-5">
                <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-[#3475d9]" />
                <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-gray-800">{phase.title}</h3>
                    <span className="text-xs font-semibold text-[#3475d9]">{phase.duration}</span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {phase.points.map((point) => (
                      <li key={point} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="mt-1 text-[#3475d9]">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-5 lg:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <HiOutlineLightBulb className="text-amber-500 text-xl" />
          <h2 className="text-xl font-bold text-gray-800">Smart Preparation Tips</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <p className="text-sm text-gray-700 rounded-lg border border-gray-100 p-3 bg-gray-50">Use the 45-10 method: 45 minutes focused study + 10 minutes active recall.</p>
          <p className="text-sm text-gray-700 rounded-lg border border-gray-100 p-3 bg-gray-50">Keep a mistake notebook and revise it every weekend.</p>
          <p className="text-sm text-gray-700 rounded-lg border border-gray-100 p-3 bg-gray-50">Attempt mixed-subject tests to improve switching speed and concentration.</p>
          <p className="text-sm text-gray-700 rounded-lg border border-gray-100 p-3 bg-gray-50">Prioritize weak topics, but maintain confidence by solving one strong topic daily.</p>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Learning;