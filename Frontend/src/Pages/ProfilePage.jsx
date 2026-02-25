import React, { useState } from 'react';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineAcademicCap,
  HiOutlinePencil,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import Sidebar from '../components/Sidebar';
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-56 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <p className="text-gray-500 mt-1">Manage your account information</p>
          </div>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <HiOutlinePencil className="text-lg" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setEditing(false)}
                className="border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <HiOutlineUser className="text-4xl text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{formData.email}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
              <HiOutlineShieldCheck className="text-lg" />
              Verified Account
            </div>
            <div className="w-full mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">Tests Taken</span>
                <span className="font-semibold text-gray-800">8</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">Avg. Score</span>
                <span className="font-semibold text-gray-800">78%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Member Since</span>
                <span className="font-semibold text-gray-800">Jan 2026</span>
              </div>
            </div>
          </div>

          {/* Details Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-800">
                    <HiOutlineUser className="text-gray-400" />
                    {formData.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-800">
                    <HiOutlineMail className="text-gray-400" />
                    {formData.email}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Phone</label>
                {editing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <p className="text-gray-800">{formData.phone || 'Not provided'}</p>
                )}
              </div>

              {/* College */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">College / University</label>
                {editing ? (
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Enter college name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-800">
                    <HiOutlineAcademicCap className="text-gray-400" />
                    {formData.college || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Exam */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Target Exam</label>
                {editing ? (
                  <select
                    name="exam"
                    value={formData.exam}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="GATE CS">GATE CS</option>
                    <option value="GATE IT">GATE IT</option>
                    <option value="UGC NET CS">UGC NET CS</option>
                    <option value="Both">Both GATE & UGC NET</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{formData.exam}</p>
                )}
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Target Year</label>
                {editing ? (
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{formData.year}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
