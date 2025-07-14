import React, { createContext, useContext, useState, useEffect } from 'react'
import { matchAPI } from '../utils/api'
import { useAuth } from './AuthContext'

const MatchContext = createContext()

export const useMatch = () => {
  const context = useContext(MatchContext)
  if (!context) {
    throw new Error('useMatch must be used within a MatchProvider')
  }
  return context
}

export const MatchProvider = ({ children }) => {
  const [matches, setMatches] = useState([])
  const [potentialMatches, setPotentialMatches] = useState([])
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchMatches()
      fetchPotentialMatches()
      fetchConversations()
    }
  }, [user])

  const fetchMatches = async () => {
    try {
      setLoading(true)
      const data = await matchAPI.getMatches()
      setMatches(data)
    } catch (error) {
      console.error('Failed to fetch matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPotentialMatches = async (filters = {}) => {
    try {
      setLoading(true)
      const data = await matchAPI.getPotentialMatches(filters)
      setPotentialMatches(data)
    } catch (error) {
      console.error('Failed to fetch potential matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchConversations = async () => {
    try {
      const data = await matchAPI.getConversations()
      setConversations(data)
    } catch (error) {
      console.error('Failed to fetch conversations:', error)
    }
  }

  const likeProfile = async (profileId) => {
    try {
      const result = await matchAPI.likeProfile(profileId)
      
      if (result.isMatch) {
        // Add to matches if it's a mutual like
        setMatches(prev => [...prev, result.match])
        // Remove from potential matches
        setPotentialMatches(prev => prev.filter(p => p.id !== profileId))
        return { isMatch: true, match: result.match }
      } else {
        // Just remove from potential matches
        setPotentialMatches(prev => prev.filter(p => p.id !== profileId))
        return { isMatch: false }
      }
    } catch (error) {
      console.error('Failed to like profile:', error)
      throw error
    }
  }

  const passProfile = async (profileId) => {
    try {
      await matchAPI.passProfile(profileId)
      setPotentialMatches(prev => prev.filter(p => p.id !== profileId))
    } catch (error) {
      console.error('Failed to pass profile:', error)
      throw error
    }
  }

  const superLikeProfile = async (profileId) => {
    try {
      const result = await matchAPI.superLikeProfile(profileId)
      
      if (result.isMatch) {
        setMatches(prev => [...prev, result.match])
        setPotentialMatches(prev => prev.filter(p => p.id !== profileId))
        return { isMatch: true, match: result.match }
      } else {
        setPotentialMatches(prev => prev.filter(p => p.id !== profileId))
        return { isMatch: false }
      }
    } catch (error) {
      console.error('Failed to super like profile:', error)
      throw error
    }
  }

  const sendMessage = async (conversationId, message) => {
    try {
      const newMessage = await matchAPI.sendMessage(conversationId, message)
      
      // Update conversation with new message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, messages: [...conv.messages, newMessage] }
            : conv
        )
      )
      
      return newMessage
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }

  const unmatch = async (matchId) => {
    try {
      await matchAPI.unmatch(matchId)
      setMatches(prev => prev.filter(m => m.id !== matchId))
      setConversations(prev => prev.filter(c => c.matchId !== matchId))
    } catch (error) {
      console.error('Failed to unmatch:', error)
      throw error
    }
  }

  const reportUser = async (userId, reason) => {
    try {
      await matchAPI.reportUser(userId, reason)
      // Remove from potential matches and matches
      setPotentialMatches(prev => prev.filter(p => p.id !== userId))
      setMatches(prev => prev.filter(m => m.user.id !== userId))
    } catch (error) {
      console.error('Failed to report user:', error)
      throw error
    }
  }

  const value = {
    matches,
    potentialMatches,
    conversations,
    loading,
    fetchMatches,
    fetchPotentialMatches,
    fetchConversations,
    likeProfile,
    passProfile,
    superLikeProfile,
    sendMessage,
    unmatch,
    reportUser
  }

  return (
    <MatchContext.Provider value={value}>
      {children}
    </MatchContext.Provider>
  )
}