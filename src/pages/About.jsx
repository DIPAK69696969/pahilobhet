import React from 'react'
import { Heart, Globe, Shield, Star } from 'lucide-react'

export function About() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About NepaliHearts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging hearts across continents, celebrating love rooted in Nepali culture and traditions
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <Heart className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            NepaliHearts was founded with a simple yet powerful vision: to help Nepali singles 
            worldwide find meaningful, lasting relationships while honoring their cultural heritage. 
            We believe that shared values, traditions, and understanding form the foundation of 
            the strongest relationships.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Globe className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Reach</h3>
            <p className="text-gray-600">
              Connecting Nepali singles across all continents, bringing together a worldwide community
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <Shield className="h-10 w-10 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Safe & Secure</h3>
            <p className="text-gray-600">
              Advanced verification and privacy protection to ensure a safe dating environment
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <Star className="h-10 w-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Success Stories</h3>
            <p className="text-gray-600">
              Thousands of successful matches and marriages built on cultural understanding
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-4">
              Founded in 2023, NepaliHearts emerged from the recognition that Nepali singles 
              living abroad often struggled to find partners who truly understood their cultural 
              background and values. Traditional dating apps lacked the cultural context that 
              makes relationships meaningful for our community.
            </p>
            <p className="mb-4">
              Our team of Nepali entrepreneurs and relationship experts set out to create a 
              platform that goes beyond surface-level matching. We incorporate cultural 
              preferences, festival celebrations, family values, and language preferences 
              into our matching algorithm.
            </p>
            <p>
              Today, NepaliHearts proudly serves as the premier dating platform for Nepali 
              singles worldwide, fostering connections that honor both modern relationship 
              needs and timeless cultural values.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}