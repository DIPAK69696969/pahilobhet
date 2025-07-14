import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  ArrowLeft,
  Heart,
  X,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  User,
  Settings,
  Camera,
  CheckCircle,
  Shield
} from 'lucide-react'

const Profile = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If no ID provided, show current user's profile
    // If ID provided, fetch that user's profile
    const profileToShow = id ? 
      // Mock fetching other user's profile
      {
        id: id,
        first_name: 'Priya',
        last_name: 'Sharma',
        date_of_birth: '1995-08-15',
        gender: 'female',
        location: 'Kathmandu, Nepal',
        bio: 'Love exploring new places, trying different cuisines, and celebrating our beautiful Nepali culture. Looking for someone who shares similar values and wants to build something meaningful together.',
        occupation: 'Software Developer',
        education: 'Computer Engineering, Tribhuvan University',
        religion: 'Hindu',
        caste: 'Brahmin',
        height: 165,
        is_verified: true,
        photos: [
          { id: 1, url: '/placeholder-profile1.jpg', is_primary: true },
          { id: 2, url: '/placeholder-profile2.jpg', is_primary: false },
          { id: 3, url: '/placeholder-profile3.jpg', is_primary: false }
        ],
        interests: ['Travel', 'Cooking', 'Dancing', 'Music', 'Hiking', 'Photography'],
        languages: ['Nepali', 'English', 'Hindi'],
        created_at: '2024-01-15'
      }
      : user

    setProfile(profileToShow)
    setLoading(false)
  }, [id, user])

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

  const nextPhoto = () => {
    if (profile.photos && profile.photos.length > 1) {
      setCurrentPhotoIndex((prev) => 
        prev === profile.photos.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevPhoto = () => {
    if (profile.photos && profile.photos.length > 1) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? profile.photos.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist.</p>
          <Link to="/discover" className="btn-primary">
            Back to Discover
          </Link>
        </div>
      </div>
    )
  }

  const isOwnProfile = !id || id === user?.id

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to={isOwnProfile ? "/dashboard" : "/discover"}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">
            {isOwnProfile ? 'My Profile' : `${profile.first_name}'s Profile`}
          </h1>
        </div>

        {isOwnProfile && (
          <Link
            to="/edit-profile"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </Link>
        )}
      </div>

      <div className="max-w-lg mx-auto">
        {/* Photo Section */}
        <div className="relative">
          <div className="h-96 bg-gradient-to-br from-red-200 to-red-100 relative overflow-hidden">
            {profile.photos && profile.photos.length > 0 ? (
              <>
                <img
                  src={profile.photos[currentPhotoIndex]?.url}
                  alt={profile.first_name}
                  className="w-full h-full object-cover"
                />
                
                {/* Photo Navigation */}
                {profile.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>

                    {/* Photo Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {profile.photos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPhotoIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <User className="w-16 h-16 text-red-400 mx-auto mb-2" />
                  {isOwnProfile && (
                    <button className="text-white text-sm bg-black/20 px-3 py-1 rounded-full">
                      <Camera className="w-4 h-4 inline mr-1" />
                      Add Photo
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Verification Badge */}
            {profile.is_verified && (
              <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Basic Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <h1 className="text-2xl font-bold mb-1">
              {profile.first_name} {profile.last_name}
            </h1>
            <p className="text-lg opacity-90">
              {calculateAge(profile.date_of_birth)} years old
            </p>
            <div className="flex items-center mt-2 opacity-80">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{profile.location}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons (for other users) */}
        {!isOwnProfile && (
          <div className="flex items-center justify-center space-x-6 py-6 bg-white border-b border-gray-200">
            <button className="w-14 h-14 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors">
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <button className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-400 rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-500 transition-colors shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </button>
            <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-500 transition-colors shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </button>
          </div>
        )}

        {/* Profile Details */}
        <div className="bg-white p-6 space-y-6">
          {/* Bio */}
          {profile.bio && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-3">
              {profile.occupation && (
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{profile.occupation}</span>
                </div>
              )}

              {profile.education && (
                <div className="flex items-center">
                  <GraduationCap className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{profile.education}</span>
                </div>
              )}

              {profile.religion && (
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{profile.religion}</span>
                </div>
              )}

              {profile.height && (
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{profile.height} cm</span>
                </div>
              )}
            </div>
          </div>

          {/* Interests */}
          {profile.interests && profile.interests.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {profile.languages && profile.languages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Profile Stats (for own profile) */}
          {isOwnProfile && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">247</div>
                  <div className="text-sm text-gray-600">Profile Views</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">85%</div>
                  <div className="text-sm text-gray-600">Profile Complete</div>
                </div>
              </div>
            </div>
          )}

          {/* Safety Notice */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">Stay Safe</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Never share personal information like your address or financial details. 
                  Always meet in public places for first dates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile