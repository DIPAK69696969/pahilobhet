import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart } from 'lucide-react'

export function Header() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              NepaliHearts
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="btn-secondary text-sm">
              Sign In
            </button>
            <button className="btn-primary text-sm">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}