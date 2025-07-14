const express = require('express');
const db = require('../../db'); // Database connection module

// Get potential matches for a user
const getProfiles = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID comes from auth middleware
    
    // Get profiles excluding current user and already liked/passed users
    const query = `
      SELECT u.id, u.name, u.age, u.bio, u.location, u.profile_image 
      FROM users u 
      WHERE u.id != ? 
      AND u.id NOT IN (
        SELECT target_user_id FROM user_interactions 
        WHERE user_id = ?
      )
      LIMIT 10
    `;
    
    const [profiles] = await db.execute(query, [userId, userId]);
    res.json({ success: true, profiles });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ success: false, message: 'Error fetching profiles' });
  }
};

// Handle like/pass action
const likeUser = async (req, res) => {
  try {
    const userId = req.user.id; // Current user ID from auth middleware
    const { targetUserId, action } = req.body; // action: 'like' or 'pass'
    
    if (!targetUserId || !action) {
      return res.status(400).json({ 
        success: false, 
        message: 'Target user ID and action are required' 
      });
    }
    
    if (!['like', 'pass'].includes(action)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Action must be either "like" or "pass"' 
      });
    }
    
    // Check if interaction already exists
    const [existingInteraction] = await db.execute(
      'SELECT id FROM user_interactions WHERE user_id = ? AND target_user_id = ?',
      [userId, targetUserId]
    );
    
    if (existingInteraction.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already interacted with this user' 
      });
    }
    
    // Insert the interaction
    await db.execute(
      'INSERT INTO user_interactions (user_id, target_user_id, action, created_at) VALUES (?, ?, ?, NOW())',
      [userId, targetUserId, action]
    );
    
    let isMatch = false;
    
    // If it's a like, check for mutual match
    if (action === 'like') {
      const [mutualLike] = await db.execute(
        'SELECT id FROM user_interactions WHERE user_id = ? AND target_user_id = ? AND action = "like"',
        [targetUserId, userId]
      );
      
      if (mutualLike.length > 0) {
        isMatch = true;
        
        // Create match record
        await db.execute(
          'INSERT INTO matches (user1_id, user2_id, created_at) VALUES (?, ?, NOW())',
          [Math.min(userId, targetUserId), Math.max(userId, targetUserId)]
        );
      }
    }
    
    res.json({ 
      success: true, 
      message: `${action === 'like' ? 'Liked' : 'Passed'} successfully`,
      isMatch: isMatch
    });
    
  } catch (error) {
    console.error('Error processing like/pass:', error);
    res.status(500).json({ success: false, message: 'Error processing action' });
  }
};

module.exports = {
  getProfiles,
  likeUser
};