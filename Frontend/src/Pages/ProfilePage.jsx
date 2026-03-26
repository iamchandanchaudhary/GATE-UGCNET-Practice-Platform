import React, { useState } from 'react';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineAcademicCap,
  HiOutlinePencil,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Student',
    email: user?.email || 'student@example.com',
    phone: '',
    college: '',
    exam: 'GATE CS',
    year: '2026',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing(false);
    // TODO: Save to backend
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-500 mt-1 text-sm lg:text-base">Manage your account information</p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="bg-[#3475d9] hover:bg-blue-700 text-white font-semibold px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm lg:text-base"
          >
            <HiOutlinePencil className="text-lg" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setEditing(false)}
              className="border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg transition-colors duration-200 text-sm lg:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-[#3475d9] hover:bg-blue-700 text-white font-semibold px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg transition-colors duration-200 text-sm lg:text-base"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 flex flex-col items-center">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-blue-100 rounded-full flex items-center justify-center mb-3 lg:mb-4">
            <HiOutlineUser className="text-3xl lg:text-4xl text-[#3475d9]" />
          </div>
          <h2 className="text-lg lg:text-xl font-bold text-gray-800">{formData.name}</h2>
          <p className="text-gray-500 text-xs lg:text-sm mt-1">{formData.email}</p>
          <div className="mt-3 lg:mt-4 flex items-center gap-2 text-xs lg:text-sm text-green-600">
            <HiOutlineShieldCheck className="text-lg" />
            Verified Account
          </div>
          <div className="w-full mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-200">
            <div className="flex justify-between text-xs lg:text-sm mb-2 lg:mb-3">
              <span className="text-gray-500">Tests Taken</span>
              <span className="font-semibold text-gray-800">8</span>
            </div>
            <div className="flex justify-between text-xs lg:text-sm mb-2 lg:mb-3">
              <span className="text-gray-500">Avg. Score</span>
              <span className="font-semibold text-gray-800">78%</span>
            </div>
            <div className="flex justify-between text-xs lg:text-sm">
              <span className="text-gray-500">Member Since</span>
              <span className="font-semibold text-gray-800">Jan 2026</span>
            </div>
          </div>
        </div>

        {/* Details Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <h2 className="text-base lg:text-lg font-bold text-gray-800 mb-4 lg:mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {/* Name */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-600 mb-1 lg:mb-1.5">Full Name</label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 lg:px-4 py-2 lg:py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-800 text-sm">
                  <HiOutlineUser className="text-gray-400" />
                  {formData.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-600 mb-1 lg:mb-1.5">Email</label>
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 lg:px-4 py-2 lg:py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-800 text-sm">
                  <HiOutlineMail className="text-gray-400" />
                  {formData.email}
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-600 mb-1 lg:mb-1.5">Phone</label>
              {editing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-lg px-3 lg:px-4 py-2 lg:py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              ) : (
                <p className="text-gray-800 text-sm">{formData.phone || 'Not provided'}</p>
              )}
            </div>

            {/* College */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-600 mb-1 lg:mb-1.5">College / University</label>
              {editing ? (
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter college name"
                  className="w-full border border-gray-300 rounded-lg px-3 lg:px-4 py-2 lg:py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-800 text-sm">
                  <HiOutlineAcademicCap className="text-gray-400" />
                  {formData.college || 'Not provided'}
                </div>
              )}
            </div>

            {/* Exam */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-600 mb-1 lg:mb-1.5">Target Exam</label>
              {editing ? (
                <select
                  name="exam"
                  value={formData.exam}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 lg:px-4 py-2 lg:py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="GATE CS">GATE CS</option>
                  <option value="GATE IT">GATE IT</option>
                  <option value="UGC NET CS">UGC NET CS</option>
                  <option value="Both">Both GATE & UGC NET</option>
                </select>
              ) : (
                <p className="text-gray-800 text-sm">{formData.exam}</p>
              )}
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-600 mb-1 lg:mb-1.5">Target Year</label>
              {editing ? (
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 lg:px-4 py-2 lg:py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              ) : (
                <p className="text-gray-800 text-sm">{formData.year}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProfilePage;
