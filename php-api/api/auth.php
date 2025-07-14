<?php
require_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['REQUEST_URI'];

// Parse the request path to get the action
$pathParts = explode('/', trim($path, '/'));
$action = end($pathParts);

switch ($method) {
    case 'POST':
        if (strpos($path, '/login') !== false) {
            login();
        } elseif (strpos($path, '/register') !== false) {
            register();
        } elseif (strpos($path, '/validate-token') !== false) {
            validateToken();
        } else {
            sendError('Invalid endpoint', 404);
        }
        break;
    
    default:
        sendError('Method not allowed', 405);
}

function login() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['email']) || !isset($input['password'])) {
        sendError('Email and password are required');
    }
    
    $email = $input['email'];
    $password = $input['password'];
    
    try {
        $pdo = getConnection();
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if (!$user || !password_verify($password, $user['password'])) {
            sendError('Invalid credentials', 401);
        }
        
        // Generate a simple token (in production, use JWT)
        $token = bin2hex(random_bytes(32));
        
        // Update user with new token
        $stmt = $pdo->prepare('UPDATE users SET auth_token = ? WHERE id = ?');
        $stmt->execute([$token, $user['id']]);
        
        // Remove password from response
        unset($user['password']);
        unset($user['auth_token']);
        
        sendResponse([
            'user' => $user,
            'token' => $token
        ]);
        
    } catch(Exception $e) {
        sendError('Login failed: ' . $e->getMessage(), 500);
    }
}

function register() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $required = ['name', 'email', 'password', 'age', 'gender'];
    foreach ($required as $field) {
        if (!isset($input[$field])) {
            sendError("$field is required");
        }
    }
    
    try {
        $pdo = getConnection();
        
        // Check if email already exists
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->execute([$input['email']]);
        if ($stmt->fetch()) {
            sendError('Email already exists', 409);
        }
        
        // Hash password
        $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT);
        
        // Insert new user
        $stmt = $pdo->prepare('
            INSERT INTO users (name, email, password, age, gender, created_at) 
            VALUES (?, ?, ?, ?, ?, NOW())
        ');
        $stmt->execute([
            $input['name'],
            $input['email'],
            $hashedPassword,
            $input['age'],
            $input['gender']
        ]);
        
        $userId = $pdo->lastInsertId();
        
        // Generate token
        $token = bin2hex(random_bytes(32));
        
        // Update user with token
        $stmt = $pdo->prepare('UPDATE users SET auth_token = ? WHERE id = ?');
        $stmt->execute([$token, $userId]);
        
        // Get user data
        $stmt = $pdo->prepare('SELECT id, name, email, age, gender FROM users WHERE id = ?');
        $stmt->execute([$userId]);
        $user = $stmt->fetch();
        
        sendResponse([
            'user' => $user,
            'token' => $token
        ], 201);
        
    } catch(Exception $e) {
        sendError('Registration failed: ' . $e->getMessage(), 500);
    }
}

function validateToken() {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    
    if (!$authHeader || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        sendError('No token provided', 401);
    }
    
    $token = $matches[1];
    
    try {
        $pdo = getConnection();
        $stmt = $pdo->prepare('SELECT id, name, email, age, gender FROM users WHERE auth_token = ?');
        $stmt->execute([$token]);
        $user = $stmt->fetch();
        
        if (!$user) {
            sendError('Invalid token', 401);
        }
        
        sendResponse($user);
        
    } catch(Exception $e) {
        sendError('Token validation failed: ' . $e->getMessage(), 500);
    }
}
?>