import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  ArrowLeft,
  Bell,
  Shield,
  Eye,
  CreditCard,
  Settings as SettingsIcon,
  User,
  LogOut,
  Trash2,
  HelpCircle,
  Star,
  Crown,
  Zap,
  CheckCircle,
  X
} from 'lucide-react'

const Settings = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    likes: true,
    events: false,
    marketing: false
  })
  const [privacy, setPrivacy] = useState({
    showOnline: true,
    showDistance: true,
    showAge: true,
    incognito: false
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePrivacyChange = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const premiumFeatures = [
    {
      icon: Eye,
      title: 'See Who Liked You',
      description: 'View all your likes at once'
    },
    {
      icon: Zap,
      title: 'Unlimited Likes',
      description: 'Like as many profiles as you want'
    },
    {
      icon: Star,
      title: '5 Super Likes per day',
      description: 'Stand out with Super Likes'
    },
    {
      icon: Shield,
      title: 'Read Receipts',
      description: 'See when messages are read'
    },
    {
      icon: User,
      title: 'Priority Profile',
      description: 'Be seen by more people'
    },
    {
      icon: Crown,
      title: 'Exclusive Events',
      description: 'Access to premium-only events'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Link
              to="/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* Account Section */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Account
            </h2>
            
            <div className="space-y-4">
              <Link
                to="/edit-profile"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <SettingsIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">Edit Profile</span>
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">Sign Out</span>
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
              </button>
            </div>
          </div>

          {/* Premium Section */}
          {!user?.is_premium && (
            <div className="card p-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-red-600" />
                  Premium
                </h2>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                  Free Plan
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">
                Unlock all features and boost your dating experience
              </p>
              
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="btn-primary w-full"
              >
                <Star className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </button>
            </div>
          )}

          {/* Notifications */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </h2>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {key === 'newMatches' && 'Get notified when you have new matches'}
                      {key === 'messages' && 'Get notified about new messages'}
                      {key === 'likes' && 'Get notified when someone likes you'}
                      {key === 'events' && 'Get notified about upcoming events'}
                      {key === 'marketing' && 'Receive marketing and promotional emails'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={value}
                      onChange={() => handleNotificationChange(key)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Privacy
            </h2>
            
            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {key === 'showOnline' && 'Show when you\'re online'}
                      {key === 'showDistance' && 'Show your distance to other users'}
                      {key === 'showAge' && 'Show your age on your profile'}
                      {key === 'incognito' && 'Browse profiles without being seen (Premium)'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={value}
                      onChange={() => handlePrivacyChange(key)}
                      disabled={key === 'incognito' && !user?.is_premium}
                    />
                    <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 ${key === 'incognito' && !user?.is_premium ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Support & Legal
            </h2>
            
            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900">Help Center</span>
                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900">Privacy Policy</span>
                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900">Terms of Service</span>
                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900">Community Guidelines</span>
                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
              </a>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card p-6 border-red-200 bg-red-50">
            <h2 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
              <Trash2 className="w-5 h-5 mr-2" />
              Danger Zone
            </h2>
            
            <button
              onClick={() => setShowDeleteAccount(true)}
              className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Delete Account Modal */}
        {showDeleteAccount && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delete Account
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot be undone. 
                All your matches, messages, and profile data will be permanently deleted.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteAccount(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Premium Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Upgrade to Premium
                </h3>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Premium Features */}
              <div className="space-y-4 mb-6">
                {premiumFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pricing Plans */}
              <div className="space-y-3 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">1 Month</span>
                    <span className="font-bold text-gray-900">$9.99/month</span>
                  </div>
                  <button className="w-full btn-secondary">
                    Choose Plan
                  </button>
                </div>

                <div className="border-2 border-red-600 rounded-lg p-4 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">6 Months</span>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">$6.99/month</span>
                      <div className="text-xs text-gray-500 line-through">$9.99</div>
                    </div>
                  </div>
                  <button className="w-full btn-primary">
                    Choose Plan
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">12 Months</span>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">$4.99/month</span>
                      <div className="text-xs text-gray-500 line-through">$9.99</div>
                    </div>
                  </div>
                  <button className="w-full btn-secondary">
                    Choose Plan
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Cancel anytime. Auto-renewal can be turned off in your account settings.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings