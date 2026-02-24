import React from 'react';
import { FaGraduationCap, FaShieldAlt } from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';

const features = [
  {
    icon: <FaGraduationCap className="text-3xl text-[#3475d9]" />,
    title: 'Mock Tests & Quizzes',
    description:
      'Practice with thousands of curated questions designed to match the real exam pattern.',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
  {
    icon: <BiTimeFive className="text-3xl text-[#3475d9]" />,
    title: 'Detailed Analytics',
    description:
      'Track your performance with in-depth analytics and identify areas for improvement.',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
  {
    icon: <FaShieldAlt className="text-3xl text-[#3475d9]" />,
    title: 'Expert Guidance',
    description:
      'Get access to expert tips, strategies, and study materials to boost your preparation.',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
];

const Features = () => {
  return (
    <section className="bg-slate-50 py-16 md:py-4 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-5`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
