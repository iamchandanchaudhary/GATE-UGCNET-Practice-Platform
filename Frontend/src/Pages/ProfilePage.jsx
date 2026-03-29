import React, { useState, useEffect } from 'react';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineAcademicCap,
  HiOutlinePencil,
  HiOutlineShieldCheck,
  HiOutlinePhone,
} from 'react-icons/hi';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState({ totalTests: 0, avgScore: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    exam: 'GATE CS',
    year: '2026',
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            phone: data.user.phone || '',
            college: data.user.college || '',
            exam: data.user.exam || 'GATE CS',
            year: data.user.year || '2026',
          });
        }
      } catch (error) {
        console.error('Fetch profile error:', error);
      }
    };

    const fetchResults = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/profile/results`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setStats({
            totalTests: data.stats.totalTests,
            avgScore: data.stats.avgScore,
          });
        }
      } catch (error) {
        console.error('Fetch results error:', error);
      }
    };

    if (user?.token) {
      Promise.all([fetchProfile(), fetchResults()]).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user?.token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            college: formData.college,
            exam: formData.exam,
            year: formData.year,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess('Profile updated successfully!');
        setEditing(false);
        // Update the user in AuthContext with new name
        if (user) {
          login({ ...user, name: data.user.name });
        }
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Save profile error:', error);
      setError('Connection error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-600 text-lg">Loading profile...</div>
        </div>
      </DashboardLayout>
    );
  }

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
              onClick={() => {
                setEditing(false);
                setError('');
                setSuccess('');
              }}
              disabled={saving}
              className="border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg transition-colors duration-200 text-sm lg:text-base disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#3475d9] hover:bg-blue-700 text-white font-semibold px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg transition-colors duration-200 text-sm lg:text-base disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 flex flex-col items-center">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-blue-100 rounded-full flex items-center justify-center mb-3 lg:mb-4">
            <HiOutlineUser className="text-3xl lg:text-4xl text-[#3475d9]" />
          </div>
          <h2 className="text-lg lg:text-xl font-bold text-gray-800">{formData.name || 'Student'}</h2>
          <p className="text-gray-500 text-xs lg:text-sm mt-1">{formData.email}</p>
          <div className="mt-3 lg:mt-4 flex items-center gap-2 text-xs lg:text-sm text-green-600">
            <HiOutlineShieldCheck className="text-lg" />
            Verified Account
          </div>
          <div className="w-full mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-200">
            <div className="flex justify-between text-xs lg:text-sm mb-2 lg:mb-3">
              <span className="text-gray-500">Tests Taken</span>
              <span className="font-semibold text-gray-800">{stats.totalTests}</span>
            </div>
            <div className="flex justify-between text-xs lg:text-sm mb-2 lg:mb-3">
              <span className="text-gray-500">Avg. Score</span>
              <span className="font-semibold text-gray-800">{stats.avgScore}%</span>
            </div>
            <div className="flex justify-between text-xs lg:text-sm">
              <span className="text-gray-500">Member Since</span>
              <span className="font-semibold text-gray-800">{formatDate(user?.createdAt)}</span>
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
                  {formData.name || 'Not provided'}
                </div>
              )}
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-600 mb-1 lg:mb-1.5">
                Email {editing && <span className="text-gray-400 font-normal">(cannot be changed)</span>}
              </label>
              <div className="flex items-center gap-2 text-gray-800 text-sm">
                <HiOutlineMail className="text-gray-400" />
                {formData.email}
              </div>
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
                <div className="flex items-center gap-2 text-gray-800 text-sm">
                  <HiOutlinePhone className="text-gray-400" />
                  {formData.phone || 'Not provided'}
                </div>
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
