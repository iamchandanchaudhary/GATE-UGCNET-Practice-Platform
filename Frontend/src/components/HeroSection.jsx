import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from "../assets/hero-img.png";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-4 mt-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2d4363] leading-tight">
              Ace Your GATE & UGC NET Exams
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-500 font-semibold">
              Practice. Prepare. Succeed.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/practice"
                className="px-8 py-3 text-base font-semibold text-white bg-[#3475d9] rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-200"
              >
                Start Practicing
              </Link>
              <Link
                to="/courses"
                className="px-8 py-3 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:text-[#3475d9] transition-colors duration-200"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center">
            {/* <div className="relative w-full max-w-lg"> */}
              {/* Decorative background elements */}
              {/* <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-100 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-3xl"></div> */}

              <div className="w-full h-auto relative z-10">
                <img src={heroImg} alt="" />
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
