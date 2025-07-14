import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Calendar, FileText, Heart, Users, Settings, Edit } from 'lucide-react';

const DashboardPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600">Manage your profile and find your perfect match</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
                <p className="text-pink-100">{user.email}</p>
              </div>
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition duration-200">
                <Edit className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  {user.age && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">{user.age} years old</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">{user.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
                {user.bio ? (
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-gray-400 mt-1" />
                    <p className="text-gray-600">{user.bio}</p>
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No bio added yet. Tell others about yourself!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/matches"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Find Matches</h3>
                <p className="text-gray-600 text-sm">Discover your perfect match</p>
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">My Matches</h3>
                <p className="text-gray-600 text-sm">View mutual connections</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
                <p className="text-gray-600 text-sm">Manage preferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm">Profile Views</p>
                <p className="text-3xl font-bold">--</p>
              </div>
              <Heart className="w-8 h-8 text-pink-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Likes Received</p>
                <p className="text-3xl font-bold">--</p>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Matches</p>
                <p className="text-3xl font-bold">--</p>
              </div>
              <Heart className="w-8 h-8 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Get Started */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Find Love?</h3>
          <p className="text-gray-600 mb-6">
            Complete your profile and start browsing potential matches in the Nepali community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/matches"
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition duration-200"
            >
              Start Browsing Matches
            </Link>
            <button className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-6 py-3 rounded-full font-semibold transition duration-200">
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;