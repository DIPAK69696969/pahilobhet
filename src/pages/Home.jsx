import React from 'react'
import { Heart, Users, Calendar, MessageCircle } from 'lucide-react'

export function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Nepali Match
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with culturally compatible Nepali singles worldwide. 
            Experience meaningful relationships rooted in shared traditions and values.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg">
              Start Your Journey
            </button>
            <button className="btn-secondary text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose NepaliHearts?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We understand the importance of cultural compatibility in lasting relationships
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-pink-50">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cultural Matching
              </h3>
              <p className="text-gray-600">
                Connect with people who share your values, traditions, and cultural background
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Global Community
              </h3>
              <p className="text-gray-600">
                Meet Nepali singles from around the world, wherever you are
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Festival Events
              </h3>
              <p className="text-gray-600">
                Join virtual and local celebrations of Nepali festivals and traditions
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50">
              <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Safe Communication
              </h3>
              <p className="text-gray-600">
                Secure messaging and video calls with verified profiles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Soulmate?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join thousands of Nepali singles who have found love through our platform
          </p>
          <button className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            Create Your Profile Today
          </button>
        </div>
      </section>
    </div>
  )
}