import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AddTestPage from "./pages/AddTestPage";
import TestListPage from "./pages/TestListPage";
import RegisteredUsersPage from "./pages/RegisteredUsersPage";
import Navbar from "./components/Navbar";
import PageMenu from "./components/PageMenu";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-gray-700 text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-gray-700 text-xl">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Layout component for protected pages with Navbar and optional PageMenu
const ProtectedLayout = ({ children, showPageMenu = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-blue-50">
      <Navbar />
      {showPageMenu && <PageMenu />}
      {children}
    </div>
  );
};

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ProtectedLayout showPageMenu={false}>
              <Dashboard />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-test"
        element={
          <ProtectedRoute>
            <ProtectedLayout showPageMenu={true}>
              <AddTestPage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/test-list"
        element={
          <ProtectedRoute>
            <ProtectedLayout showPageMenu={true}>
              <TestListPage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <ProtectedLayout showPageMenu={true}>
              <RegisteredUsersPage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <AppRoutes />
      </AdminAuthProvider>
    </Router>
  );
}

export default App;
