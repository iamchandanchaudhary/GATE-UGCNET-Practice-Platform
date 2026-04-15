import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import MyTestsPage from './Pages/MyTestsPage';
import ReportsPage from './Pages/ReportsPage';
import ProfilePage from './Pages/ProfilePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import StartTestPage from './Pages/StartTestPage';
import TestPage from './Pages/TestPage';
import TestReportPage from './Pages/TestReportPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import "./App.css";
import Learning from './Pages/Learning';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-tests"
          element={
            <ProtectedRoute>
              <MyTestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/start-test"
          element={
            <ProtectedRoute>
              <StartTestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test/:testId"
          element={
            <ProtectedRoute>
              <TestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test-report"
          element={
            <ProtectedRoute>
              <TestReportPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learning"
          element={
            <ProtectedRoute>
              <Learning />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
