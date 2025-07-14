# Pahelo Bhet - XAMPP Setup Instructions

Follow these steps to connect your React dating application to XAMPP.

## Prerequisites
- XAMPP installed and running
- Node.js and npm installed
- Your React project (already set up)

## Step 1: Database Setup

1. **Open phpMyAdmin**
   - Go to `http://localhost/phpmyadmin`
   - You should see your existing `pahilobhet` database

2. **Import Database Schema**
   - Copy the contents of `php-api/database.sql`
   - In phpMyAdmin, select your `pahilobhet` database
   - Click on the "SQL" tab
   - Paste the SQL content and click "Go"
   - This will create all necessary tables and sample data

## Step 2: PHP API Setup

1. **Copy PHP API to XAMPP**
   ```bash
   # Copy the php-api folder to your XAMPP htdocs directory
   cp -r php-api /Applications/XAMPP/htdocs/pahelo-bhet/
   # OR on Windows:
   # Copy php-api folder to C:\xampp\htdocs\pahelo-bhet\
   ```

2. **File Structure Should Be:**
   ```
   C:\xampp\htdocs\pahelo-bhet\
   ├── config.php
   └── api\
       ├── auth.php
       ├── matches.php
       └── other-endpoints.php
   ```

## Step 3: Test API Connection

1. **Test Database Connection**
   - Visit: `http://localhost/pahelo-bhet/config.php`
   - You should see a JSON response (not an error)

2. **Test Authentication Endpoint**
   - Visit: `http://localhost/pahelo-bhet/api/auth.php`
   - You should see a JSON error about invalid endpoint (this is normal)

## Step 4: Update React App Configuration

The `.env` file has already been updated to point to XAMPP:

```env
# Frontend Configuration for XAMPP
REACT_APP_API_URL=http://localhost/pahelo-bhet/api
REACT_APP_WS_URL=ws://localhost:3001

# Development Mode
NODE_ENV=development
```

## Step 5: Start Your Application

1. **Ensure XAMPP is Running**
   - Apache server should be running on port 80
   - MySQL should be running on port 3306

2. **Start React Development Server**
   ```bash
   npm run dev
   ```

3. **Access Your App**
   - React App: `http://localhost:3000`
   - API: `http://localhost/pahelo-bhet/api/`
   - Database: `http://localhost/phpmyadmin`

## Step 6: Test User Registration/Login

1. **Register a New User**
   - Go to `http://localhost:3000/register`
   - Fill out the registration form
   - Check if user is created in the database

2. **Login with Test Users**
   - Email: `ram@example.com`
   - Password: `password` (default for sample users)
   
   OR
   
   - Email: `sita@example.com`
   - Password: `password`

## API Endpoints Available

- `POST /pahelo-bhet/api/auth.php` (with `/login`, `/register`, `/validate-token` in URL)
- `GET /pahelo-bhet/api/matches.php` (with `/potential`, `/matches` in URL)
- `POST /pahelo-bhet/api/matches.php` (with `/swipe` in URL)

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Make sure the `config.php` CORS headers are properly set
   - Check browser console for specific CORS errors

2. **Database Connection Failed**
   - Verify XAMPP MySQL is running
   - Check database name is `pahilobhet`
   - Ensure database exists in phpMyAdmin

3. **404 Errors on API Calls**
   - Verify the PHP files are in the correct XAMPP directory
   - Check file permissions
   - Make sure Apache is running

4. **White Screen on React App**
   - Check browser console for JavaScript errors
   - Verify API endpoints are responding
   - Try refreshing the page

### Testing API Directly:

You can test the API using curl or Postman:

```bash
# Test registration
curl -X POST http://localhost/pahelo-bhet/api/auth.php/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","age":25,"gender":"male"}'

# Test login
curl -X POST http://localhost/pahelo-bhet/api/auth.php/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ram@example.com","password":"password"}'
```

## Database Schema Overview

The database includes tables for:
- `users` - User profiles and authentication
- `matches` - Mutual likes between users
- `swipes` - Individual like/pass actions
- `conversations` - Chat conversations
- `messages` - Individual chat messages
- `events` - Nepali cultural events and festivals
- `user_preferences` - User matching preferences

## Next Steps

1. Test basic registration and login
2. Add more API endpoints as needed
3. Implement file upload for photos
4. Add chat functionality
5. Create admin panel for managing users and events

Your Nepali Hearts dating application should now be fully connected to XAMPP and ready for development!