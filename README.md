# NepaliHearts - पहिलो भेट

A modern, culturally-aware dating platform designed specifically for Nepali singles worldwide. Connect with people who share your heritage, values, and cultural traditions.

## 🌟 Features

### Core Features
- **Cultural Matching**: Find matches based on shared cultural values and traditions
- **Smart Discovery**: Advanced filtering by age, location, religion, caste, and interests
- **Real-time Messaging**: Instant chat with matches
- **Festival Events**: Join community events and celebrate Nepali festivals together
- **Profile Verification**: Verified profiles for authentic connections
- **Multi-language Support**: Interface in English with Nepali cultural elements

### Premium Features
- **Unlimited Likes**: Like as many profiles as you want
- **See Who Liked You**: View all your likes at once
- **Super Likes**: Stand out with 5 Super Likes per day
- **Read Receipts**: See when messages are read
- **Priority Profile**: Be seen by more people
- **Exclusive Events**: Access to premium-only cultural events
- **Incognito Mode**: Browse profiles without being seen

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Efficient form handling
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls
- **Date-fns** - Date utility library

### Backend (Database Ready)
- **Node.js/Express** (recommended backend)
- **PostgreSQL** or **MongoDB** (database options)
- **JWT Authentication**
- **WebSocket** support for real-time features
- **File upload** handling for photos
- **Email notifications**

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Frontend Setup
```bash
# Clone the repository
git clone <repository-url>
cd nepalihearts

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Configuration
1. Copy `.env.example` to `.env`
2. Update the environment variables with your values:
   ```bash
   cp .env.example .env
   ```

### Database Setup
The application includes comprehensive database schemas and API endpoints. You'll need to:

1. **Choose your database**: PostgreSQL or MongoDB
2. **Set up the backend server** (Node.js/Express recommended)
3. **Configure the database connection** in your environment variables
4. **Implement the API endpoints** using the provided schemas in `src/utils/api.js`

#### Database Schemas
The application includes complete database schemas for:
- Users and profiles
- Photos and media
- Matching system
- Messaging
- Events and RSVPs
- Premium subscriptions
- Notifications

See `src/utils/api.js` for complete schema definitions and API endpoints.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── ui/             # Basic UI components (LoadingSpinner, etc.)
├── contexts/           # React Context providers
│   ├── AuthContext.jsx    # Authentication state management
│   └── MatchContext.jsx   # Matching and discovery state
├── pages/              # Main application pages
│   ├── Home.jsx           # Landing page
│   ├── Login.jsx          # User login
│   ├── Register.jsx       # User registration
│   ├── Dashboard.jsx      # Main dashboard
│   ├── Discover.jsx       # Profile discovery/swiping
│   ├── Matches.jsx        # View matches and conversations
│   ├── Chat.jsx           # Messaging interface
│   ├── Events.jsx         # Cultural events and meetups
│   ├── Profile.jsx        # View profiles
│   ├── EditProfile.jsx    # Edit user profile
│   └── Settings.jsx       # App settings and preferences
├── utils/              # Utility functions
│   └── api.js             # API client and database schemas
├── main.jsx            # Application entry point
├── App.jsx             # Main app component with routing
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Design System

### Colors
- **Primary**: Red (#DC143C) - Represents Nepal flag colors
- **Secondary**: Blue (#003893) - Represents Nepal flag colors
- **Accent**: Gold (#FFD700) - Cultural significance

### Typography
- **Primary Font**: Inter (modern, readable)
- **Cultural Font**: Noto Sans Devanagari (for Nepali text)

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean, accessible input fields
- **Navigation**: Smooth transitions and clear hierarchy

## 🔧 API Integration

The application is ready for backend integration with comprehensive API endpoints:

### Authentication
- User registration and login
- JWT token management
- Password reset functionality

### Profile Management
- Profile CRUD operations
- Photo upload and management
- Profile verification

### Matching System
- Discover potential matches
- Like, pass, and super like actions
- Match management

### Messaging
- Real-time chat functionality
- Message history
- Read receipts

### Events
- Community event management
- RSVP functionality
- Event discovery

### Premium Features
- Subscription management
- Payment processing
- Feature access control

## 🌐 Cultural Features

### Nepali Cultural Elements
- **Festival Integration**: Dashain, Tihar, and other Nepali festivals
- **Language Support**: Nepali text and cultural terminology
- **Cultural Matching**: Religion, caste, and cultural preferences
- **Community Events**: Traditional celebrations and gatherings
- **Heritage Awareness**: Designed with Nepali diaspora in mind

## 🔒 Security & Privacy

- **Profile Verification**: Document verification system
- **Privacy Controls**: Detailed privacy settings
- **Safe Dating**: Safety tips and reporting features
- **Data Protection**: GDPR-compliant design
- **Secure Authentication**: JWT-based security

## 📱 Responsive Design

- **Mobile-First**: Optimized for smartphones
- **Tablet Support**: Adapted layouts for tablets
- **Desktop**: Full-featured desktop experience
- **PWA Ready**: Progressive Web App capabilities

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to platforms like:
# - Vercel
# - Netlify
# - AWS S3/CloudFront
# - Firebase Hosting
```

### Backend Deployment
Set up your backend server with:
- Database (PostgreSQL/MongoDB)
- File storage (AWS S3/Cloudinary)
- Email service (SendGrid/AWS SES)
- Payment processing (Stripe)
- Real-time features (Socket.io)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: support@nepalihearts.com
- Community: [GitHub Issues](link-to-issues)

---

**Made with ❤️ for the Nepali community worldwide**

*"पहिलो भेट" - Your First Meeting Starts Here*