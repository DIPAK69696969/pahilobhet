import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, X, MapPin, User } from 'lucide-react';

const MatchesPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [matchNotification, setMatchNotification] = useState(null);

  // Fetch profiles on component mount
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken'); // Assuming you store auth token here
      const response = await axios.get('http://localhost:5000/api/matching/profiles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setProfiles(response.data.profiles);
        setCurrentProfileIndex(0);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action) => {
    if (currentProfileIndex >= profiles.length) return;
    
    const currentProfile = profiles[currentProfileIndex];
    setActionLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/api/matching/like', {
        targetUserId: currentProfile.id,
        action: action // 'like' or 'pass'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Show match notification if it's a match
        if (response.data.isMatch && action === 'like') {
          setMatchNotification({
            name: currentProfile.name,
            profileImage: currentProfile.profile_image
          });
          
          // Hide notification after 3 seconds
          setTimeout(() => {
            setMatchNotification(null);
          }, 3000);
        }

        // Move to next profile
        setCurrentProfileIndex(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error processing action:', error);
      alert('Error processing action. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLike = () => handleAction('like');
  const handlePass = () => handleAction('pass');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Looking for your perfect match...</p>
        </div>
      </div>
    );
  }

  if (currentProfileIndex >= profiles.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No more profiles!</h2>
          <p className="text-gray-600 mb-4">Check back later for new matches or explore other features.</p>
          <button 
            onClick={fetchProfiles}
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-200"
          >
            Refresh Profiles
          </button>
        </div>
      </div>
    );
  }

  const currentProfile = profiles[currentProfileIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">PahiloBhet</h1>
          <p className="text-gray-600">Discover your perfect match</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Image */}
          <div className="relative h-96 bg-gradient-to-b from-gray-200 to-gray-300">
            {currentProfile.profile_image ? (
              <img 
                src={currentProfile.profile_image} 
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-24 h-24 text-gray-400" />
              </div>
            )}
            
            {/* Profile Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h2 className="text-white text-2xl font-bold">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              {currentProfile.location && (
                <div className="flex items-center text-white/90 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{currentProfile.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            {currentProfile.bio && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
                <p className="text-gray-600">{currentProfile.bio}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-8">
              <button
                onClick={handlePass}
                disabled={actionLoading}
                className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 p-4 rounded-full transition duration-200 transform hover:scale-105"
              >
                <X className="w-8 h-8 text-gray-600" />
              </button>
              
              <button
                onClick={handleLike}
                disabled={actionLoading}
                className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 p-4 rounded-full transition duration-200 transform hover:scale-105"
              >
                <Heart className="w-8 h-8 text-white" />
              </button>
            </div>

            {actionLoading && (
              <div className="text-center mt-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Counter */}
        <div className="text-center mt-4 text-gray-500">
          {currentProfileIndex + 1} of {profiles.length} profiles
        </div>
      </div>

      {/* Match Notification */}
      {matchNotification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center animate-pulse">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
              {matchNotification.profileImage ? (
                <img 
                  src={matchNotification.profileImage} 
                  alt={matchNotification.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-pink-500 mb-2">It's a Match! 🎉</h3>
            <p className="text-gray-600">
              You and {matchNotification.name} liked each other!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchesPage;