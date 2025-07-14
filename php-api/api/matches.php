<?php
require_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['REQUEST_URI'];

// Get auth token
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if (!$authHeader || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
    sendError('No token provided', 401);
}

$token = $matches[1];

// Validate token and get user
try {
    $pdo = getConnection();
    $stmt = $pdo->prepare('SELECT id FROM users WHERE auth_token = ?');
    $stmt->execute([$token]);
    $currentUser = $stmt->fetch();
    
    if (!$currentUser) {
        sendError('Invalid token', 401);
    }
    
    $userId = $currentUser['id'];
} catch(Exception $e) {
    sendError('Authentication failed', 500);
}

switch ($method) {
    case 'GET':
        if (strpos($path, '/potential') !== false) {
            getPotentialMatches($userId);
        } elseif (strpos($path, '/matches') !== false) {
            getMatches($userId);
        } else {
            sendError('Invalid endpoint', 404);
        }
        break;
    
    case 'POST':
        if (strpos($path, '/swipe') !== false) {
            handleSwipe($userId);
        } else {
            sendError('Invalid endpoint', 404);
        }
        break;
    
    default:
        sendError('Method not allowed', 405);
}

function getPotentialMatches($userId) {
    try {
        $pdo = getConnection();
        
        // Get potential matches (users not swiped by current user)
        $stmt = $pdo->prepare('
            SELECT u.id, u.name, u.age, u.bio, u.location, u.photos
            FROM users u
            WHERE u.id != ?
            AND u.status = "active"
            AND u.id NOT IN (
                SELECT swiped_id FROM swipes WHERE swiper_id = ?
            )
            ORDER BY RAND()
            LIMIT 10
        ');
        $stmt->execute([$userId, $userId]);
        $potentialMatches = $stmt->fetchAll();
        
        sendResponse(['potentialMatches' => $potentialMatches]);
        
    } catch(Exception $e) {
        sendError('Failed to get potential matches: ' . $e->getMessage(), 500);
    }
}

function getMatches($userId) {
    try {
        $pdo = getConnection();
        
        // Get mutual matches
        $stmt = $pdo->prepare('
            SELECT 
                m.id as match_id,
                u.id, u.name, u.age, u.bio, u.location, u.photos,
                m.created_at as matched_at
            FROM matches m
            JOIN users u ON (
                CASE 
                    WHEN m.user1_id = ? THEN u.id = m.user2_id
                    ELSE u.id = m.user1_id
                END
            )
            WHERE (m.user1_id = ? OR m.user2_id = ?)
            AND m.status = "matched"
            ORDER BY m.created_at DESC
        ');
        $stmt->execute([$userId, $userId, $userId]);
        $matches = $stmt->fetchAll();
        
        sendResponse(['matches' => $matches]);
        
    } catch(Exception $e) {
        sendError('Failed to get matches: ' . $e->getMessage(), 500);
    }
}

function handleSwipe($userId) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['profileId']) || !isset($input['action'])) {
        sendError('Profile ID and action are required');
    }
    
    $profileId = $input['profileId'];
    $action = $input['action']; // 'like', 'pass', 'super_like'
    
    try {
        $pdo = getConnection();
        
        // Insert swipe
        $stmt = $pdo->prepare('
            INSERT INTO swipes (swiper_id, swiped_id, action) 
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE action = VALUES(action)
        ');
        $stmt->execute([$userId, $profileId, $action]);
        
        $isMatch = false;
        
        // Check if it's a like and if there's a mutual like
        if ($action === 'like' || $action === 'super_like') {
            $stmt = $pdo->prepare('
                SELECT id FROM swipes 
                WHERE swiper_id = ? AND swiped_id = ? 
                AND action IN ("like", "super_like")
            ');
            $stmt->execute([$profileId, $userId]);
            $mutualLike = $stmt->fetch();
            
            if ($mutualLike) {
                // Create match
                $stmt = $pdo->prepare('
                    INSERT INTO matches (user1_id, user2_id, status) 
                    VALUES (?, ?, "matched")
                    ON DUPLICATE KEY UPDATE status = "matched"
                ');
                $stmt->execute([min($userId, $profileId), max($userId, $profileId)]);
                $isMatch = true;
            }
        }
        
        sendResponse(['match' => $isMatch]);
        
    } catch(Exception $e) {
        sendError('Failed to process swipe: ' . $e->getMessage(), 500);
    }
}
?>