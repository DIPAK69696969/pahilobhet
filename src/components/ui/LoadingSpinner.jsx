import React from 'react'

const LoadingSpinner = ({ size = 'medium', color = 'red', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  }

  const colorClasses = {
    red: 'border-red-600',
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    white: 'border-white'
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`
            ${sizeClasses[size]} 
            ${colorClasses[color]} 
            border-4 border-solid border-t-transparent 
            rounded-full animate-spin 
            ${className}
          `}
        />
        <div className="text-gray-600 text-sm font-medium">
          पहिलो भेट तयार गर्दै... {/* Preparing first meeting... */}
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner