import axios from 'axios'

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Authentication API
export const authAPI = {
  // User registration
  register: async (userData) => {
    return await api.post('/auth/register', userData)
  },

  // User login
  login: async (email, password) => {
    return await api.post('/auth/login', { email, password })
  },

  // Validate token
  validateToken: async (token) => {
    return await api.get('/auth/validate', {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    return await api.post('/auth/forgot-password', { email })
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    return await api.post('/auth/reset-password', { token, newPassword })
  },

  // Refresh token
  refreshToken: async () => {
    return await api.post('/auth/refresh')
  }
}

// User Profile API
export const profileAPI = {
  // Get user profile by ID
  getProfile: async (userId) => {
    return await api.get(`/profiles/${userId}`)
  },

  // Get current user's profile
  getMyProfile: async () => {
    return await api.get('/profiles/me')
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return await api.put('/profiles/me', profileData)
  },

  // Upload profile photo
  uploadPhoto: async (file, isPrimary = false) => {
    const formData = new FormData()
    formData.append('photo', file)
    formData.append('isPrimary', isPrimary)
    
    return await api.post('/profiles/photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // Delete profile photo
  deletePhoto: async (photoId) => {
    return await api.delete(`/profiles/photos/${photoId}`)
  },

  // Update profile preferences
  updatePreferences: async (preferences) => {
    return await api.put('/profiles/preferences', preferences)
  },

  // Verify profile (upload verification documents)
  verifyProfile: async (documentFile) => {
    const formData = new FormData()
    formData.append('document', documentFile)
    
    return await api.post('/profiles/verify', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

// Matching API
export const matchAPI = {
  // Get potential matches based on preferences
  getPotentialMatches: async (filters = {}) => {
    return await api.get('/matches/discover', { params: filters })
  },

  // Get user's matches
  getMatches: async () => {
    return await api.get('/matches')
  },

  // Like a profile
  likeProfile: async (profileId) => {
    return await api.post(`/matches/${profileId}/like`)
  },

  // Pass on a profile
  passProfile: async (profileId) => {
    return await api.post(`/matches/${profileId}/pass`)
  },

  // Super like a profile
  superLikeProfile: async (profileId) => {
    return await api.post(`/matches/${profileId}/super-like`)
  },

  // Undo last action
  undoLastAction: async () => {
    return await api.post('/matches/undo')
  },

  // Unmatch with someone
  unmatch: async (matchId) => {
    return await api.delete(`/matches/${matchId}`)
  },

  // Get match details
  getMatchDetails: async (matchId) => {
    return await api.get(`/matches/${matchId}`)
  },

  // Report a user
  reportUser: async (userId, reason, description = '') => {
    return await api.post('/matches/report', {
      userId,
      reason,
      description
    })
  }
}

// Messaging API
export const messageAPI = {
  // Get all conversations
  getConversations: async () => {
    return await api.get('/conversations')
  },

  // Get messages for a specific conversation
  getMessages: async (conversationId, page = 1, limit = 50) => {
    return await api.get(`/conversations/${conversationId}/messages`, {
      params: { page, limit }
    })
  },

  // Send a message
  sendMessage: async (conversationId, content, type = 'text') => {
    return await api.post(`/conversations/${conversationId}/messages`, {
      content,
      type
    })
  },

  // Send media message
  sendMediaMessage: async (conversationId, file, type) => {
    const formData = new FormData()
    formData.append('media', file)
    formData.append('type', type)
    
    return await api.post(`/conversations/${conversationId}/media`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // Mark messages as read
  markAsRead: async (conversationId) => {
    return await api.put(`/conversations/${conversationId}/read`)
  },

  // Delete a message
  deleteMessage: async (messageId) => {
    return await api.delete(`/messages/${messageId}`)
  },

  // Get conversation details
  getConversationDetails: async (conversationId) => {
    return await api.get(`/conversations/${conversationId}`)
  }
}

// Events API
export const eventsAPI = {
  // Get upcoming events
  getEvents: async (filters = {}) => {
    return await api.get('/events', { params: filters })
  },

  // Get event details
  getEventDetails: async (eventId) => {
    return await api.get(`/events/${eventId}`)
  },

  // RSVP to an event
  rsvpEvent: async (eventId, status) => {
    return await api.post(`/events/${eventId}/rsvp`, { status })
  },

  // Get event attendees
  getEventAttendees: async (eventId) => {
    return await api.get(`/events/${eventId}/attendees`)
  },

  // Create custom event (premium feature)
  createEvent: async (eventData) => {
    return await api.post('/events', eventData)
  },

  // Get user's RSVPs
  getMyRSVPs: async () => {
    return await api.get('/events/my-rsvps')
  }
}

// Premium/Subscription API
export const subscriptionAPI = {
  // Get subscription plans
  getPlans: async () => {
    return await api.get('/subscription/plans')
  },

  // Get current subscription
  getCurrentSubscription: async () => {
    return await api.get('/subscription/current')
  },

  // Subscribe to a plan
  subscribe: async (planId, paymentMethodId) => {
    return await api.post('/subscription/subscribe', {
      planId,
      paymentMethodId
    })
  },

  // Cancel subscription
  cancelSubscription: async () => {
    return await api.post('/subscription/cancel')
  },

  // Get billing history
  getBillingHistory: async () => {
    return await api.get('/subscription/billing-history')
  }
}

// Notifications API
export const notificationAPI = {
  // Get notifications
  getNotifications: async (page = 1, limit = 20) => {
    return await api.get('/notifications', {
      params: { page, limit }
    })
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    return await api.put(`/notifications/${notificationId}/read`)
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    return await api.put('/notifications/read-all')
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    return await api.delete(`/notifications/${notificationId}`)
  },

  // Update notification preferences
  updatePreferences: async (preferences) => {
    return await api.put('/notifications/preferences', preferences)
  }
}

// Analytics API (for admin/insights)
export const analyticsAPI = {
  // Get user analytics
  getUserAnalytics: async () => {
    return await api.get('/analytics/user')
  },

  // Get match statistics
  getMatchStats: async () => {
    return await api.get('/analytics/matches')
  },

  // Get app usage stats
  getUsageStats: async (timeframe = '30d') => {
    return await api.get('/analytics/usage', {
      params: { timeframe }
    })
  }
}

// Admin API (for admin users)
export const adminAPI = {
  // Get all users
  getUsers: async (page = 1, limit = 20, filters = {}) => {
    return await api.get('/admin/users', {
      params: { page, limit, ...filters }
    })
  },

  // Get user details
  getUserDetails: async (userId) => {
    return await api.get(`/admin/users/${userId}`)
  },

  // Moderate user content
  moderateUser: async (userId, action, reason) => {
    return await api.post(`/admin/users/${userId}/moderate`, {
      action,
      reason
    })
  },

  // Get reports
  getReports: async (page = 1, limit = 20) => {
    return await api.get('/admin/reports', {
      params: { page, limit }
    })
  },

  // Handle report
  handleReport: async (reportId, action, notes) => {
    return await api.post(`/admin/reports/${reportId}/handle`, {
      action,
      notes
    })
  },

  // Get app statistics
  getAppStats: async () => {
    return await api.get('/admin/stats')
  }
}

// WebSocket connection for real-time features
export const createWebSocketConnection = (userId) => {
  const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3001'
  const token = localStorage.getItem('authToken')
  
  const ws = new WebSocket(`${wsUrl}?token=${token}&userId=${userId}`)
  
  ws.onopen = () => {
    console.log('WebSocket connected')
  }
  
  ws.onclose = () => {
    console.log('WebSocket disconnected')
  }
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
  
  return ws
}

// Database Schema Reference (for backend implementation)
export const DATABASE_SCHEMAS = {
  users: {
    id: 'UUID PRIMARY KEY',
    email: 'VARCHAR(255) UNIQUE NOT NULL',
    password_hash: 'VARCHAR(255) NOT NULL',
    first_name: 'VARCHAR(100) NOT NULL',
    last_name: 'VARCHAR(100) NOT NULL',
    date_of_birth: 'DATE NOT NULL',
    gender: 'ENUM("male", "female", "non-binary", "other")',
    location: 'POINT',
    bio: 'TEXT',
    occupation: 'VARCHAR(200)',
    education: 'VARCHAR(200)',
    religion: 'VARCHAR(100)',
    caste: 'VARCHAR(100)',
    language_preferences: 'JSON',
    height: 'INT',
    is_verified: 'BOOLEAN DEFAULT FALSE',
    is_premium: 'BOOLEAN DEFAULT FALSE',
    last_active: 'TIMESTAMP',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
  },
  
  photos: {
    id: 'UUID PRIMARY KEY',
    user_id: 'UUID REFERENCES users(id)',
    url: 'VARCHAR(500) NOT NULL',
    is_primary: 'BOOLEAN DEFAULT FALSE',
    order_index: 'INT DEFAULT 0',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  },
  
  preferences: {
    id: 'UUID PRIMARY KEY',
    user_id: 'UUID REFERENCES users(id)',
    min_age: 'INT DEFAULT 18',
    max_age: 'INT DEFAULT 65',
    max_distance: 'INT DEFAULT 50',
    gender_preference: 'JSON',
    religion_preference: 'JSON',
    education_preference: 'JSON',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
  },
  
  swipes: {
    id: 'UUID PRIMARY KEY',
    swiper_id: 'UUID REFERENCES users(id)',
    swiped_id: 'UUID REFERENCES users(id)',
    action: 'ENUM("like", "pass", "super_like")',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    'UNIQUE KEY': '(swiper_id, swiped_id)'
  },
  
  matches: {
    id: 'UUID PRIMARY KEY',
    user1_id: 'UUID REFERENCES users(id)',
    user2_id: 'UUID REFERENCES users(id)',
    is_active: 'BOOLEAN DEFAULT TRUE',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    'UNIQUE KEY': '(user1_id, user2_id)'
  },
  
  conversations: {
    id: 'UUID PRIMARY KEY',
    match_id: 'UUID REFERENCES matches(id)',
    last_message_at: 'TIMESTAMP',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  },
  
  messages: {
    id: 'UUID PRIMARY KEY',
    conversation_id: 'UUID REFERENCES conversations(id)',
    sender_id: 'UUID REFERENCES users(id)',
    content: 'TEXT',
    message_type: 'ENUM("text", "image", "gif", "emoji") DEFAULT "text"',
    is_read: 'BOOLEAN DEFAULT FALSE',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  },
  
  events: {
    id: 'UUID PRIMARY KEY',
    title: 'VARCHAR(200) NOT NULL',
    description: 'TEXT',
    event_date: 'DATETIME NOT NULL',
    location: 'POINT',
    location_name: 'VARCHAR(200)',
    max_attendees: 'INT',
    is_premium_only: 'BOOLEAN DEFAULT FALSE',
    created_by: 'UUID REFERENCES users(id)',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  },
  
  event_rsvps: {
    id: 'UUID PRIMARY KEY',
    event_id: 'UUID REFERENCES events(id)',
    user_id: 'UUID REFERENCES users(id)',
    status: 'ENUM("going", "maybe", "not_going")',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    'UNIQUE KEY': '(event_id, user_id)'
  }
}

export default api