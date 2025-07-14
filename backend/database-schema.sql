-- PahiloBhet Dating App Database Schema

-- Users table (assuming this already exists based on your auth system)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    age INT,
    bio TEXT,
    location VARCHAR(100),
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User interactions table (likes/passes)
CREATE TABLE IF NOT EXISTS user_interactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    target_user_id INT NOT NULL,
    action ENUM('like', 'pass') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (target_user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_interaction (user_id, target_user_id)
);

-- Matches table (mutual likes)
CREATE TABLE IF NOT EXISTS matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_match (user1_id, user2_id),
    CHECK (user1_id < user2_id) -- Ensure user1_id is always smaller to avoid duplicate matches
);

-- Optional: Messages table for future chat functionality
CREATE TABLE IF NOT EXISTS messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    match_id INT NOT NULL,
    sender_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_user_interactions_user_id ON user_interactions(user_id);
CREATE INDEX idx_user_interactions_target_user_id ON user_interactions(target_user_id);
CREATE INDEX idx_matches_user1_id ON matches(user1_id);
CREATE INDEX idx_matches_user2_id ON matches(user2_id);
CREATE INDEX idx_messages_match_id ON messages(match_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- Sample data for testing (optional)
INSERT INTO users (name, email, password_hash, age, bio, location) VALUES
('Rajesh Sharma', 'rajesh@example.com', '$2b$10$example_hash_1', 28, 'Love hiking in the Himalayas and traditional Nepali music', 'Kathmandu'),
('Sita Poudel', 'sita@example.com', '$2b$10$example_hash_2', 25, 'Passionate about art and exploring Nepali culture', 'Pokhara'),
('Arjun Thapa', 'arjun@example.com', '$2b$10$example_hash_3', 30, 'Software engineer who loves trekking and dal bhat', 'Lalitpur'),
('Gita Rai', 'gita@example.com', '$2b$10$example_hash_4', 27, 'Teacher and dancer, love celebrating festivals', 'Bhaktapur');