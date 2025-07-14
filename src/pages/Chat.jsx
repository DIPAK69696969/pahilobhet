import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMatch } from '../contexts/MatchContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  Send, 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical,
  Heart,
  User,
  Image,
  Smile,
  Paperclip
} from 'lucide-react'
import { format } from 'date-fns'

const Chat = () => {
  const { chatId } = useParams()
  const { conversations, sendMessage } = useMatch()
  const { user } = useAuth()
  const [currentConversation, setCurrentConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (chatId && conversations.length > 0) {
      const conversation = conversations.find(c => c.id === chatId)
      setCurrentConversation(conversation)
    }
  }, [chatId, conversations])

  useEffect(() => {
    scrollToBottom()
  }, [currentConversation?.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !currentConversation) return

    try {
      await sendMessage(currentConversation.id, newMessage.trim())
      setNewMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const formatMessageTime = (timestamp) => {
    return format(new Date(timestamp), 'HH:mm')
  }

  const formatMessageDate = (timestamp) => {
    return format(new Date(timestamp), 'MMMM d, yyyy')
  }

  const groupMessagesByDate = (messages) => {
    const groups = {}
    messages.forEach(message => {
      const date = format(new Date(message.created_at), 'yyyy-MM-dd')
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })
    return groups
  }

  if (!currentConversation) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Select a Conversation
            </h2>
            <p className="text-gray-600 mb-6">
              Choose a match to start chatting
            </p>
            <Link to="/matches" className="btn-primary">
              View Matches
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const otherUser = currentConversation.match.user
  const messageGroups = groupMessagesByDate(currentConversation.messages || [])

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to="/matches"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-200 to-red-100 rounded-full flex items-center justify-center">
              {otherUser.photos && otherUser.photos.length > 0 ? (
                <img
                  src={otherUser.photos[0].url}
                  alt={otherUser.first_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-red-400" />
              )}
            </div>
            
            <div>
              <h2 className="font-semibold text-gray-900">
                {otherUser.first_name} {otherUser.last_name}
              </h2>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
            {showOptions && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <Link
                  to={`/profile/${otherUser.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  View Profile
                </Link>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Block User
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Report User
                </button>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups).map(([date, messages]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="text-center my-4">
              <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                {formatMessageDate(messages[0].created_at)}
              </span>
            </div>

            {/* Messages for this date */}
            {messages.map((message, index) => {
              const isOwn = message.sender_id === user.id
              const showTime = index === 0 || 
                messages[index - 1].sender_id !== message.sender_id ||
                (new Date(message.created_at) - new Date(messages[index - 1].created_at)) > 300000 // 5 minutes

              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`
                        px-4 py-2 rounded-lg
                        ${isOwn 
                          ? 'chat-bubble-sent' 
                          : 'chat-bubble-received'
                        }
                      `}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    {showTime && (
                      <p className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                        {formatMessageTime(message.created_at)}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Image className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${otherUser.first_name}...`}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`
              p-3 rounded-full transition-all duration-200
              ${newMessage.trim()
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Match Info Banner (if recently matched) */}
      {currentConversation.messages?.length === 0 && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm mx-4 z-10">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-400 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              You matched with {otherUser.first_name}!
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Start the conversation and get to know each other
            </p>
            <div className="flex space-x-2">
              <button className="btn-primary text-sm px-4 py-2">
                👋 Say Hello
              </button>
              <button className="btn-secondary text-sm px-4 py-2">
                💫 Ask About Interests
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat