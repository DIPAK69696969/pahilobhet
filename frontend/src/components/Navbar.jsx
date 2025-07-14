import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, User, LogOut, Home, Users, Info, Mail } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold text-gray-800">PahiloBhet</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {/* Public Links */}
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                isActive('/') 
                  ? 'text-pink-600 bg-pink-50' 
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/about"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                isActive('/about') 
                  ? 'text-pink-600 bg-pink-50' 
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>

            <Link
              to="/contact"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                isActive('/contact') 
                  ? 'text-pink-600 bg-pink-50' 
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>

            {/* Authenticated User Links */}
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                    isActive('/dashboard') 
                      ? 'text-pink-600 bg-pink-50' 
                      : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>

                <Link
                  to="/matches"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                    isActive('/matches') 
                      ? 'text-pink-600 bg-pink-50' 
                      : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Matches</span>
                </Link>

                {/* User Info */}
                <div className="flex items-center space-x-2 px-3 py-2">
                  <span className="text-sm text-gray-600">Welcome, {user.name || 'User'}!</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              /* Guest User Links */
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 rounded-md transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;