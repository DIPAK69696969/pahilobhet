import React, { useState, useEffect } from 'react'
import { useMatch } from '../contexts/MatchContext'
import { 
  Heart, 
  X, 
  Star, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Calendar,
  Filter,
  RotateCcw,
  Info
} from 'lucide-react'

const Discover = () => {
  const { potentialMatches, likeProfile, passProfile, superLikeProfile, fetchPotentialMatches } = useMatch()
  const [currentProfile, setCurrentProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showMatch, setShowMatch] = useState(false)
  const [matchedUser, setMatchedUser] = useState(null)

  useEffect(() => {
    if (potentialMatches.length > 0) {
      setCurrentProfile(potentialMatches[0])
    }
  }, [potentialMatches])

  const handleLike = async () => {
    if (!currentProfile) return
    
    try {
      setIsLoading(true)
      const result = await likeProfile(currentProfile.id)
      
      if (result.isMatch) {
        setMatchedUser(result.match)
        setShowMatch(true)
      }
      
      moveToNextProfile()
    } catch (error) {
      console.error('Error liking profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePass = async () => {
    if (!currentProfile) return
    
    try {
      setIsLoading(true)
      await passProfile(currentProfile.id)
      moveToNextProfile()
    } catch (error) {
      console.error('Error passing profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuperLike = async () => {
    if (!currentProfile) return
    
    try {
      setIsLoading(true)
      const result = await superLikeProfile(currentProfile.id)
      
      if (result.isMatch) {
        setMatchedUser(result.match)
        setShowMatch(true)
      }
      
      moveToNextProfile()
    } catch (error) {
      console.error('Error super liking profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const moveToNextProfile = () => {
    const currentIndex = potentialMatches.findIndex(p => p.id === currentProfile.id)
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentProfile(potentialMatches[currentIndex + 1])
    } else {
      setCurrentProfile(null)
    }
  }

  const calculateAge = (dateOfBirth) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No More Profiles
            </h2>
            <p className="text-gray-600 mb-6">
              You've seen all available matches in your area. Check back later for new profiles!
            </p>
            <button
              onClick={() => fetchPotentialMatches()}
              className="btn-primary"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
          <button
            onClick={() => setShowFilters(true)}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="relative">
          <div className="card overflow-hidden profile-card">
            {/* Photo */}
            <div className="relative h-96">
              {currentProfile.photos && currentProfile.photos.length > 0 ? (
                <img
                  src={currentProfile.photos[0].url}
                  alt={currentProfile.first_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-200 to-red-100 flex items-center justify-center">
                  <Heart className="w-16 h-16 text-red-400" />
                </div>
              )}
              
              {/* Profile Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {currentProfile.first_name} {currentProfile.last_name}
                </h2>
                <p className="text-white/90 text-lg">
                  {calculateAge(currentProfile.date_of_birth)} years old
                </p>
                
                <div className="flex items-center text-white/80 mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{currentProfile.location}</span>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6">
              {currentProfile.bio && (
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {currentProfile.bio}
                </p>
              )}

              <div className="space-y-3">
                {currentProfile.occupation && (
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{currentProfile.occupation}</span>
                  </div>
                )}

                {currentProfile.education && (
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{currentProfile.education}</span>
                  </div>
                )}

                {currentProfile.religion && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{currentProfile.religion}</span>
                  </div>
                )}
              </div>

              {/* Interests */}
              {currentProfile.interests && currentProfile.interests.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-6 mt-6">
            <button
              onClick={handlePass}
              disabled={isLoading}
              className="w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110 disabled:opacity-50"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <button
              onClick={handleSuperLike}
              disabled={isLoading}
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110 disabled:opacity-50"
            >
              <Star className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handleLike}
              disabled={isLoading}
              className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110 disabled:opacity-50"
            >
              <Heart className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Helper Text */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Tap ❌ to pass, ⭐ to super like, or ❤️ to like
            </p>
          </div>
        </div>

        {/* Match Modal */}
        {showMatch && matchedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center animate-fade-in">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-400 rounded-full mx-auto flex items-center justify-center">
                  <Heart className="w-10 h-10 text-white animate-heart-beat" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                It's a Match!
              </h2>
              <p className="text-gray-600 mb-6">
                You and {matchedUser.user.first_name} liked each other
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowMatch(false)
                    // Navigate to chat
                  }}
                  className="btn-primary w-full"
                >
                  Send Message
                </button>
                <button
                  onClick={() => setShowMatch(false)}
                  className="btn-secondary w-full"
                >
                  Keep Swiping
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
            <div className="bg-white rounded-t-xl w-full max-w-lg p-6 animate-slide-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Age Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Range
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="18"
                      max="65"
                      defaultValue="25"
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 w-16">18 - 65</span>
                  </div>
                </div>

                {/* Distance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      defaultValue="50"
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 w-16">50 km</span>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Looking for
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Everyone</option>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Non-binary</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={() => setShowFilters(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowFilters(false)
                    fetchPotentialMatches()
                  }}
                  className="btn-primary flex-1"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Discover