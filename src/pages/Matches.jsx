import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMatch } from '../contexts/MatchContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  Heart, 
  MessageCircle, 
  Search, 
  Filter,
  Clock,
  Sparkles,
  User,
  MapPin,
  Calendar
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'

const Matches = () => {
  const { matches, conversations, fetchMatches, fetchConversations } = useMatch()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('matches')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    fetchMatches()
    fetchConversations()
  }, [])

  useEffect(() => {
    const data = activeTab === 'matches' ? matches : conversations
    
    if (searchQuery) {
      const filtered = data.filter(item => {
        const name = activeTab === 'matches' 
          ? `${item.user.first_name} ${item.user.last_name}`
          : `${item.match.user.first_name} ${item.match.user.last_name}`
        return name.toLowerCase().includes(searchQuery.toLowerCase())
      })
      setFilteredData(filtered)
    } else {
      setFilteredData(data)
    }
  }, [matches, conversations, activeTab, searchQuery])

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

  const getLastMessage = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return "Start the conversation!"
    }
    
    const lastMessage = conversation.messages[conversation.messages.length - 1]
    return lastMessage.content.length > 40 
      ? `${lastMessage.content.substring(0, 40)}...`
      : lastMessage.content
  }

  const getLastMessageTime = (conversation) => {
    if (!conversation.last_message_at) {
      return ""
    }
    
    return formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })
  }

  const MatchCard = ({ match }) => (
    <div className="card p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-red-200 to-red-100 rounded-full flex items-center justify-center">
            {match.user.photos && match.user.photos.length > 0 ? (
              <img
                src={match.user.photos[0].url}
                alt={match.user.first_name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-red-400" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {match.user.first_name} {match.user.last_name}
          </h3>
          <p className="text-sm text-gray-600">
            {calculateAge(match.user.date_of_birth)} years old
          </p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{match.user.location}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <div className="text-xs text-gray-500 flex items-center">
            <Heart className="w-3 h-3 mr-1 text-red-500" />
            <span>{formatDistanceToNow(new Date(match.created_at), { addSuffix: true })}</span>
          </div>
          <Link
            to={`/chat/${match.id}`}
            className="btn-primary text-xs px-3 py-1"
          >
            Say Hi
          </Link>
        </div>
      </div>
    </div>
  )

  const ConversationCard = ({ conversation }) => (
    <Link
      to={`/chat/${conversation.id}`}
      className="card p-4 hover:shadow-lg transition-all duration-200 block"
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-200 to-blue-100 rounded-full flex items-center justify-center">
            {conversation.match.user.photos && conversation.match.user.photos.length > 0 ? (
              <img
                src={conversation.match.user.photos[0].url}
                alt={conversation.match.user.first_name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-blue-400" />
            )}
          </div>
          {/* Unread indicator */}
          {conversation.unread_count > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">
                {conversation.unread_count > 9 ? '9+' : conversation.unread_count}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {conversation.match.user.first_name} {conversation.match.user.last_name}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {getLastMessage(conversation)}
          </p>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-xs text-gray-500">
            {getLastMessageTime(conversation)}
          </div>
          <MessageCircle className="w-4 h-4 text-gray-400 mt-1" />
        </div>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Connections
          </h1>
          <p className="text-gray-600">
            View your matches and start conversations
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('matches')}
            className={`
              flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200
              ${activeTab === 'matches'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <Heart className="w-4 h-4 inline mr-2" />
            Matches ({matches.length})
          </button>
          <button
            onClick={() => setActiveTab('conversations')}
            className={`
              flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200
              ${activeTab === 'conversations'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Messages ({conversations.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          {filteredData.length === 0 ? (
            <div className="text-center py-16">
              {activeTab === 'matches' ? (
                <>
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    No Matches Yet
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Start swiping to find your perfect match!
                  </p>
                  <Link
                    to="/discover"
                    className="btn-primary"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Discover People
                  </Link>
                </>
              ) : (
                <>
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    No Conversations Yet
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Start a conversation with your matches!
                  </p>
                  <Link
                    to="/matches"
                    onClick={() => setActiveTab('matches')}
                    className="btn-primary"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    View Matches
                  </Link>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="card p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-400 rounded-lg flex items-center justify-center mr-3">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{matches.length}</p>
                      <p className="text-sm text-gray-600">Total Matches</p>
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg flex items-center justify-center mr-3">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{conversations.length}</p>
                      <p className="text-sm text-gray-600">Active Chats</p>
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-400 rounded-lg flex items-center justify-center mr-3">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {conversations.reduce((acc, conv) => acc + (conv.unread_count || 0), 0)}
                      </p>
                      <p className="text-sm text-gray-600">Unread Messages</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* List */}
              {activeTab === 'matches' ? (
                <div className="space-y-4">
                  {filteredData.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredData.map((conversation) => (
                    <ConversationCard key={conversation.id} conversation={conversation} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Recent Activity */}
        {filteredData.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="card p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">You got 3 new matches today!</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Priya sent you a message</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Someone super liked your profile!</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Matches