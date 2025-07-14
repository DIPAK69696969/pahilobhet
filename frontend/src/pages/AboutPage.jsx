import React from 'react';
import { Heart, Users, Shield, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-pink-500">Pahilo</span><span className="text-purple-600">Bhet</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting hearts in the Nepali community worldwide
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              PahiloBhet exists to help Nepali individuals find meaningful connections and lasting relationships 
              while honoring our rich cultural heritage and traditions. We believe that love transcends borders, 
              but shared values create the strongest bonds.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              The name "PahiloBhet" translates to "First Meeting" in Nepali - that magical moment when two 
              souls connect for the first time. Founded with deep respect for Nepali culture and traditions, 
              our platform was created by and for the Nepali community worldwide.
            </p>
            <p className="mb-4">
              Whether you're in Kathmandu or New York, London or Sydney, PahiloBhet helps you find someone 
              who understands your cultural background, speaks your language (literally and figuratively), 
              and shares your values and dreams.
            </p>
            <p>
              We understand the importance of family, respect for elders, cultural festivals, and the little 
              things that make us uniquely Nepali. Our platform is designed to honor these values while 
              embracing modern approaches to finding love.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cultural Respect</h3>
            <p className="text-gray-600">
              Honoring Nepali traditions and values in every connection
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              Building connections within our global Nepali family
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safety First</h3>
            <p className="text-gray-600">
              Your privacy and security are our highest priorities
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">
              Connecting Nepali hearts across continents and cultures
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose PahiloBhet?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Cultural Understanding</h3>
              <p className="text-gray-600 mb-4">
                Find someone who understands the importance of Dashain, appreciates momo as much as you do, 
                and knows why family approval matters.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
              <p className="text-gray-600 mb-4">
                Our algorithm considers cultural preferences, language, location, and values to find your 
                most compatible matches.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Safe Environment</h3>
              <p className="text-gray-600 mb-4">
                Verified profiles, secure messaging, and strict community guidelines ensure a safe and 
                respectful dating experience.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Success Stories</h3>
              <p className="text-gray-600 mb-4">
                Join countless couples who found love on PahiloBhet and are now building beautiful 
                lives together.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your PahiloBhet?</h2>
          <p className="text-xl mb-6 text-pink-100">
            Join thousands of Nepali singles who trust us to help them find love
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-500 hover:bg-pink-50 px-8 py-3 rounded-full font-semibold transition duration-200">
              Start Your Journey
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-pink-500 px-8 py-3 rounded-full font-semibold transition duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;