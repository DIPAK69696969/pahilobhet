import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { 
  ArrowLeft,
  Camera,
  X,
  Plus,
  Save,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Heart,
  Globe,
  Star
} from 'lucide-react'

const EditProfile = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [photos, setPhotos] = useState(user?.photos || [])
  const [interests, setInterests] = useState(user?.interests || [])
  const [newInterest, setNewInterest] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      bio: user?.bio || '',
      occupation: user?.occupation || '',
      education: user?.education || '',
      location: user?.location || '',
      religion: user?.religion || '',
      caste: user?.caste || '',
      height: user?.height || '',
      gender_preference: user?.gender_preference || [],
      age_min: user?.preferences?.min_age || 18,
      age_max: user?.preferences?.max_age || 65,
      max_distance: user?.preferences?.max_distance || 50
    }
  })

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      
      // Prepare the update data
      const updateData = {
        ...data,
        interests,
        photos,
        preferences: {
          min_age: data.age_min,
          max_age: data.age_max,
          max_distance: data.max_distance,
          gender_preference: data.gender_preference
        }
      }

      // Update the user profile
      updateUser(updateData)
      
      // In a real app, you would call an API here
      // await profileAPI.updateProfile(updateData)
      
      navigate('/profile')
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // In a real app, you would upload to a server
      const newPhoto = {
        id: Date.now(),
        url: URL.createObjectURL(file),
        is_primary: photos.length === 0
      }
      setPhotos([...photos, newPhoto])
    }
  }

  const removePhoto = (photoId) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId)
    // If removing primary photo, make first photo primary
    if (updatedPhotos.length > 0 && !updatedPhotos.some(p => p.is_primary)) {
      updatedPhotos[0].is_primary = true
    }
    setPhotos(updatedPhotos)
  }

  const makePrimaryPhoto = (photoId) => {
    setPhotos(photos.map(photo => ({
      ...photo,
      is_primary: photo.id === photoId
    })))
  }

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()])
      setNewInterest('')
    }
  }

  const removeInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest))
  }

  const availableInterests = [
    'Travel', 'Cooking', 'Music', 'Dancing', 'Hiking', 'Photography',
    'Reading', 'Movies', 'Sports', 'Art', 'Yoga', 'Meditation',
    'Gaming', 'Technology', 'Fashion', 'Festivals', 'Food'
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Link
              to="/profile"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Photos Section */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Photos</h2>
            <p className="text-sm text-gray-600 mb-4">
              Add at least 2 photos. Your first photo will be your main profile picture.
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={photo.id} className="relative aspect-square">
                  <img
                    src={photo.url}
                    alt={`Profile ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  
                  {/* Primary badge */}
                  {photo.is_primary && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Main
                    </div>
                  )}
                  
                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {!photo.is_primary && (
                      <button
                        type="button"
                        onClick={() => makePrimaryPhoto(photo.id)}
                        className="p-1 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600"
                        title="Make primary"
                      >
                        <Star className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add photo button */}
              {photos.length < 6 && (
                <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-red-400 transition-colors">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Add Photo</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  {...register('first_name', {
                    required: 'First name is required'
                  })}
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  {...register('last_name', {
                    required: 'Last name is required'
                  })}
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Tell people about yourself..."
                  {...register('bio')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  {...register('occupation')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  {...register('education')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  {...register('location')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="140"
                  max="220"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  {...register('height')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  {...register('religion')}
                >
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Christian">Christian</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Other">Other</option>
                  <option value="Spiritual">Spiritual</option>
                  <option value="Agnostic">Agnostic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caste (Optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  {...register('caste')}
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Interests</h2>
            <p className="text-sm text-gray-600 mb-4">
              Add interests to help others know what you're passionate about.
            </p>

            {/* Current interests */}
            <div className="flex flex-wrap gap-2 mb-4">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-2 hover:text-red-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add new interest */}
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add an interest..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Suggested interests */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Suggested:</p>
              <div className="flex flex-wrap gap-2">
                {availableInterests
                  .filter(interest => !interests.includes(interest))
                  .slice(0, 8)
                  .map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => setInterests([...interests, interest])}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {interest}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Dating Preferences */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Dating Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Min Age</label>
                    <input
                      type="number"
                      min="18"
                      max="65"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      {...register('age_min')}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max Age</label>
                    <input
                      type="number"
                      min="18"
                      max="65"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      {...register('age_max')}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Distance (km)
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  {...register('max_distance')}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              to="/profile"
              className="btn-secondary"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile