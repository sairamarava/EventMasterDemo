import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt, FaHome, FaCalendarPlus, FaStar, FaBolt } from 'react-icons/fa';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>      <header className="header-minimal sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 text-gray-800 hover:text-primary transition-colors group">
              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-all duration-300">
                <FaBolt className="text-xl text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold font-display">EventMaster</h1>
                <p className="text-xs text-gray-500">College Events Hub</p>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 font-medium">
                <FaHome />
                <span>Home</span>
              </Link>
              {isAuthenticated && (
                <Link to="/admin" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 font-medium">
                  <FaCalendarPlus /> 
                  <span>Create Event</span>
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <span className="text-gray-700 text-sm font-medium flex items-center gap-2">
                      <FaStar className="text-primary" />
                      Welcome, Admin
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="btn-minimal flex items-center gap-2"
                >
                  <FaUser /> Admin Access
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
}

function LoginModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      onClose();
      setUsername('');
      setPassword('');
    } else {
      setError(result.message);
    }
  };

  const handleClose = () => {
    onClose();
    setUsername('');
    setPassword('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="modal-card w-96 max-w-md mx-4 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 rounded-full">
              <FaUser className="text-primary text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-gray-800">Admin Login</h2>
              <p className="text-gray-600 text-sm">Access your dashboard</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-minimal"
              placeholder="Enter admin username"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-minimal"
              placeholder="Enter admin password"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-minimal flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <FaBolt />
                  Sign In
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-300"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <FaStar className="text-primary" />
            <span className="text-xs text-gray-600 font-medium">
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
