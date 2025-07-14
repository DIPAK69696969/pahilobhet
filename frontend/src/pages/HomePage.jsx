import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MessageCircle, Shield } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-pink-500">Pahilo</span>
              <span className="text-purple-600">Bhet</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              तपाईंको जीवनसाथी खोज्नुहोस् - नेपाली संस्कृति र मूल्यमान्यतालाई सम्मान गर्दै
            </p>
            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Find your perfect match in the Nepali community. Connect with people who share your culture, values, and dreams.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition duration-300 transform hover:scale-105"
              >
                Start Your Journey
              </Link>
              <Link
                to="/login"
                className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose PahiloBhet?
            </h2>
            <p className="text-xl text-gray-600">
              Connecting hearts in the Nepali community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cultural Connection</h3>
              <p className="text-gray-600">
                Find someone who understands your traditions and values
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600">
                Our algorithm connects you with compatible profiles
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Communication</h3>
              <p className="text-gray-600">
                Chat with your matches in a safe, friendly environment
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                Your privacy and safety are our top priorities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Find Your Match?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join thousands of Nepali singles who have found love on PahiloBhet
          </p>
          <Link
            to="/signup"
            className="bg-white text-pink-500 hover:bg-pink-50 px-8 py-4 rounded-full font-semibold text-lg transition duration-300 transform hover:scale-105"
          >
            Join Now - It's Free!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;