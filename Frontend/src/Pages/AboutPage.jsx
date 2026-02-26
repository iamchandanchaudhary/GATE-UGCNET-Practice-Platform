import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import {
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineGlobe,
  HiOutlineArrowRight,
} from 'react-icons/hi';

const stats = [
  { value: '2', label: 'Practice Questions' },
  { value: '4', label: 'Mock Tests' },
  { value: '10', label: 'Active Learners' },
  { value: '95%', label: 'Satisfaction Rate' },
];

const features = [
  {
    icon: HiOutlineAcademicCap,
    title: 'Exam-Pattern Questions',
    description:
      'Questions curated by experts to match GATE & UGC NET exam patterns, difficulty levels, and marking schemes.',
  },
  {
    icon: HiOutlineChartBar,
    title: 'Detailed Analytics',
    description:
      'Track your strengths and weaknesses with in-depth performance reports, score trends, and topic-wise analysis.',
  },
  {
    icon: HiOutlineLightningBolt,
    title: 'Timed Mock Tests',
    description:
      'Simulate real exam conditions with timed practice tests that auto-submit and provide instant feedback.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Verified Content',
    description:
      'Every question is reviewed and verified by subject-matter experts to ensure accuracy and relevance.',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Community Driven',
    description:
      'Join a growing community of aspirants. Share tips, discuss solutions, and learn together.',
  },
  {
    icon: HiOutlineGlobe,
    title: 'Access Anywhere',
    description:
      'Study on any device — desktop, tablet, or mobile. Your progress syncs seamlessly across all platforms.',
  },
];

const team = [
  { name: 'Dr. Anita Sharma', role: 'Content Director', initials: 'AS' },
  { name: 'Rahul Verma', role: 'Lead Developer', initials: 'RV' },
  { name: 'Priya Patel', role: 'UX Designer', initials: 'PP' },
  { name: 'Karan Singh', role: 'Subject Expert — CS', initials: 'KS' },
];

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3475d9] to-blue-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptMC0yMFYySDI0djhoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <FaGraduationCap className="text-4xl" />
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                India's Trusted Practice Platform
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Empowering Aspirants to
              <span className="block text-blue-200">Crack GATE & UGC NET</span>
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
              We provide a modern, comprehensive, and free practice environment
              designed to help you master every topic, build exam confidence, and
              achieve top scores.
            </p>
          </div>
        </div>
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-3xl font-extrabold text-[#3475d9]">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3475d9] bg-blue-50 px-3 py-1 rounded-full">
              Our Mission
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-4">
              Making Quality Exam Preparation Accessible to Everyone
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe every aspiring student deserves access to high-quality practice
              materials and smart analytics — regardless of their background or location.
              Our platform brings together expertly crafted questions, real exam simulations,
              and intuitive progress tracking to streamline your preparation journey.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're targeting GATE for M.Tech admissions and PSU recruitment,
              or preparing for UGC NET for a career in academia, we're here to support
              you every step of the way.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10">
            <div className="space-y-5">
              {[
                { emoji: '🎯', text: 'Focused, exam-aligned practice for GATE CS & UGC NET' },
                { emoji: '📊', text: 'Real-time performance tracking & smart recommendations' },
                { emoji: '🧠', text: 'Topic-wise & full-length mock tests with detailed solutions' },
                { emoji: '🚀', text: 'Constantly updated question bank by subject experts' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <p className="text-gray-700 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3475d9] bg-blue-50 px-3 py-1 rounded-full">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">
              Our platform is designed with one goal — to maximize your chances of clearing
              GATE and UGC NET.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-2xl text-[#3475d9]" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3475d9] bg-blue-50 px-3 py-1 rounded-full">
            Our Team
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            Meet the People Behind the Platform
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            A passionate team of educators, engineers, and designers working to make
            your preparation smarter.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#3475d9] to-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                {member.initials}
              </div>
              <h3 className="font-bold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#3475d9] to-blue-700 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Preparation?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of aspirants already using our platform to ace GATE & UGC NET.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="bg-white text-[#3475d9] font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2"
            >
              Get Started Free
              <HiOutlineArrowRight />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white/40 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="bg-gray-50 py-6 text-center">
        <span className="inline-flex items-center gap-1 text-sm text-gray-500">
          Built with <span className="text-red-500">❤️</span> for learners across India
        </span>
      </div>
    </div>
  );
};

export default AboutPage;
