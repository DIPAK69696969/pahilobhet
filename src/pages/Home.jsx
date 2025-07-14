import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  Users, 
  Calendar, 
  Shield, 
  Star, 
  MapPin,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Heart,
      title: 'Cultural Compatibility',
      description: 'Find matches who share your cultural values and traditions',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Active Community',
      description: 'Join thousands of Nepali singles looking for meaningful connections',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calendar,
      title: 'Festival Events',
      description: 'Celebrate Nepali festivals and cultural events with potential matches',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Verified profiles and advanced safety features for peace of mind',
      color: 'from-purple-500 to-violet-500'
    }
  ]

  const testimonials = [
    {
      name: 'Priya & Rajesh',
      location: 'Kathmandu',
      quote: 'We found each other through NepaliHearts and celebrated our wedding during Dashain. Perfect timing!',
      image: '/placeholder-couple1.jpg'
    },
    {
      name: 'Sita & Kumar',
      location: 'London',
      quote: 'Living abroad, it was hard to find someone who understood our culture. NepaliHearts made it possible.',
      image: '/placeholder-couple2.jpg'
    },
    {
      name: 'Maya & Arjun',
      location: 'Sydney',
      quote: 'The cultural matching feature helped us connect on shared values. Now we\'re planning our life together!',
      image: '/placeholder-couple3.jpg'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <Heart className="w-6 h-6 text-white animate-heart-beat" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  NepaliHearts
                </span>
                <div className="text-xs text-white/80 leading-none">
                  पहिलो भेट
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-red-200 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-primary bg-white text-red-600 hover:bg-gray-100"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-pink-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-lg"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your
              <span className="block festival-decoration bg-clip-text text-transparent">
                Perfect Match
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with Nepali hearts worldwide. Share your culture, celebrate traditions, 
              and find love that understands your heritage.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/register"
                className="btn-primary bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 min-w-[200px]"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-4 min-w-[200px]"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80 text-sm">Active Members</div>
            </div>
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">1200+</div>
              <div className="text-white/80 text-sm">Success Stories</div>
            </div>
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-white/80 text-sm">Countries</div>
            </div>
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-white/80 text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose NepaliHearts?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the importance of cultural connection in finding lasting love
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card p-8 text-center group hover:shadow-2xl">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to find your perfect match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Create Your Profile
              </h3>
              <p className="text-gray-600">
                Tell us about yourself, your interests, and what you're looking for in a partner
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Discover Matches
              </h3>
              <p className="text-gray-600">
                Browse through culturally compatible profiles and connect with people who share your values
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Start Chatting
              </h3>
              <p className="text-gray-600">
                When you both like each other, start meaningful conversations and plan your first meeting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real couples who found love through NepaliHearts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6">
                  {/* Placeholder for couple photo */}
                  <div className="w-full h-full bg-gradient-to-r from-red-200 to-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-gray-900 font-semibold">
                  {testimonial.name}
                </div>
                <div className="text-gray-500 text-sm flex items-center justify-center mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {testimonial.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of Nepali singles who have found love through our platform
          </p>
          <Link
            to="/register"
            className="btn-primary bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4"
          >
            Get Started Today
            <Sparkles className="w-5 h-5 ml-2 inline" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="w-6 h-6 text-red-400" />
              <span className="text-xl font-bold">NepaliHearts</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 NepaliHearts. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home