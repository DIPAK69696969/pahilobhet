import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMatch } from '../contexts/MatchContext'
import { 
  Heart, 
  MessageCircle, 
  Calendar, 
  Search, 
  Users, 
  Sparkles,
  TrendingUp,
  Gift,
  Star,
  ArrowRight,
  Bell,
  User
} from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const { matches, potentialMatches, conversations } = useMatch()
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    // Mock recent activity data
    setRecentActivity([
      {
        id: 1,
        type: 'like',
        user: { name: 'Priya Sharma', photo: '/placeholder1.jpg' },
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        type: 'match',
        user: { name: 'Rajesh Thapa', photo: '/placeholder2.jpg' },
        timestamp: '5 hours ago'
      },
      {
        id: 3,
        type: 'message',
        user: { name: 'Sita Gurung', photo: '/placeholder3.jpg' },
        timestamp: '1 day ago'
      }
    ])
  }, [])

  const stats = [
    {
      label: 'Matches',
      value: matches.length,
      icon: Heart,
      color: 'from-red-500 to-red-400',
      change: '+12%'
    },
    {
      label: 'Profile Views',
      value: '247',
      icon: Users,
      color: 'from-blue-500 to-blue-400',
      change: '+8%'
    },
    {
      label: 'Messages',
      value: conversations.length,
      icon: MessageCircle,
      color: 'from-green-500 to-green-400',
      change: '+24%'
    },
    {
      label: 'Super Likes',
      value: '3',
      icon: Star,
      color: 'from-yellow-500 to-yellow-400',
      change: '0%'
    }
  ]

  const quickActions = [
    {
      title: 'Discover Matches',
      description: 'Find new people who share your interests',
      icon: Search,
      color: 'from-red-500 to-red-400',
      link: '/discover'
    },
    {
      title: 'View Matches',
      description: 'See who you\'ve matched with',
      icon: Sparkles,
      color: 'from-purple-500 to-purple-400',
      link: '/matches'
    },
    {
      title: 'Check Messages',
      description: 'Continue your conversations',
      icon: MessageCircle,
      color: 'from-blue-500 to-blue-400',
      link: '/chat'
    },
    {
      title: 'Festival Events',
      description: 'Join upcoming cultural celebrations',
      icon: Calendar,
      color: 'from-green-500 to-green-400',
      link: '/events'
    }
  ]

  const getCurrentGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getCurrentGreeting()}, {user?.first_name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back to your dating journey
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Premium Badge */}
              {user?.is_premium ? (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-300 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-yellow-800" />
                  <span className="text-yellow-800 font-medium text-sm">Premium</span>
                </div>
              ) : (
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full hover:from-red-700 hover:to-red-600 transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium text-sm">Upgrade</span>
                </Link>
              )}
              
              {/* Notifications */}
              <button className="relative p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change} this week
                    </p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={index}
                      to={action.link}
                      className="group p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {action.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {activity.type === 'like' && `${activity.user.name} liked your profile`}
                        {activity.type === 'match' && `You matched with ${activity.user.name}`}
                        {activity.type === 'message' && `${activity.user.name} sent you a message`}
                      </p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                    {activity.type === 'like' && (
                      <Heart className="w-4 h-4 text-red-500" />
                    )}
                    {activity.type === 'match' && (
                      <Sparkles className="w-4 h-4 text-purple-500" />
                    )}
                    {activity.type === 'message' && (
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completeness */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Profile Completeness
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>85% Complete</span>
                  <span>Almost there!</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full w-[85%]"></div>
                </div>
              </div>
              <Link
                to="/edit-profile"
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Complete your profile →
              </Link>
            </div>

            {/* Upgrade Prompt */}
            {!user?.is_premium && (
              <div className="card p-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
                <div className="text-center">
                  <Gift className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Unlock Premium Features
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get unlimited likes, see who liked you, and boost your profile
                  </p>
                  <Link
                    to="/settings"
                    className="btn-primary w-full"
                  >
                    Upgrade Now
                  </Link>
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm">Dashain Celebration</h4>
                  <p className="text-xs text-gray-600 mt-1">Oct 15, 2024</p>
                  <p className="text-xs text-red-600 mt-1">12 attendees</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm">Tihar Festival Meetup</h4>
                  <p className="text-xs text-gray-600 mt-1">Nov 2, 2024</p>
                  <p className="text-xs text-blue-600 mt-1">8 attendees</p>
                </div>
              </div>
              <Link
                to="/events"
                className="text-red-600 hover:text-red-700 text-sm font-medium mt-4 block"
              >
                View all events →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard