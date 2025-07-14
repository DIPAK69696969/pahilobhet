import React, { useState, useEffect } from 'react'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Heart,
  Filter,
  Search,
  Plus,
  Star
} from 'lucide-react'

const Events = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    // Mock events data
    const mockEvents = [
      {
        id: 1,
        title: 'Dashain Celebration 2024',
        description: 'Join us for a traditional Dashain celebration with authentic Nepali food, cultural programs, and community gathering.',
        date: '2024-10-15',
        time: '18:00',
        location: 'Kathmandu Community Center',
        attendees: 45,
        maxAttendees: 100,
        category: 'festival',
        image: '/placeholder-dashain.jpg',
        isPremium: false,
        organizer: 'Nepal Cultural Society'
      },
      {
        id: 2,
        title: 'Tihar Festival Meetup',
        description: 'Celebrate the festival of lights with traditional games, music, and delicious sel roti!',
        date: '2024-11-02',
        time: '17:30',
        location: 'London Nepal Society Hall',
        attendees: 32,
        maxAttendees: 80,
        category: 'festival',
        image: '/placeholder-tihar.jpg',
        isPremium: false,
        organizer: 'London Nepali Community'
      },
      {
        id: 3,
        title: 'Nepali Singles Hiking Trip',
        description: 'Explore beautiful mountain trails while meeting like-minded Nepali singles. All fitness levels welcome!',
        date: '2024-10-28',
        time: '08:00',
        location: 'Mount Tamalpais, California',
        attendees: 18,
        maxAttendees: 25,
        category: 'outdoor',
        image: '/placeholder-hiking.jpg',
        isPremium: true,
        organizer: 'Bay Area Nepali Network'
      },
      {
        id: 4,
        title: 'Traditional Cooking Workshop',
        description: 'Learn to cook authentic Nepali dishes like dal bhat, momos, and gundruk. All ingredients provided!',
        date: '2024-11-10',
        time: '14:00',
        location: 'Sydney Community Kitchen',
        attendees: 12,
        maxAttendees: 20,
        category: 'workshop',
        image: '/placeholder-cooking.jpg',
        isPremium: false,
        organizer: 'Sydney Nepali Food Club'
      },
      {
        id: 5,
        title: 'Newari Culture Evening',
        description: 'Experience the rich Newari culture with traditional music, dance, and authentic Newari cuisine.',
        date: '2024-11-18',
        time: '19:00',
        location: 'Toronto Cultural Center',
        attendees: 28,
        maxAttendees: 60,
        category: 'cultural',
        image: '/placeholder-newari.jpg',
        isPremium: true,
        organizer: 'Newar Society Toronto'
      }
    ]
    
    setEvents(mockEvents)
    setFilteredEvents(mockEvents)
  }, [])

  useEffect(() => {
    let filtered = events

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    setFilteredEvents(filtered)
  }, [events, searchQuery, selectedCategory])

  const categories = [
    { value: 'all', label: 'All Events', icon: Calendar },
    { value: 'festival', label: 'Festivals', icon: Star },
    { value: 'outdoor', label: 'Outdoor', icon: MapPin },
    { value: 'workshop', label: 'Workshops', icon: Users },
    { value: 'cultural', label: 'Cultural', icon: Heart }
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':')
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleRSVP = (eventId) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, attendees: event.attendees + 1 }
        : event
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cultural Events & Meetups
          </h1>
          <p className="text-gray-600">
            Connect with your community and celebrate Nepali culture together
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${selectedCategory === category.value
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-red-50 hover:border-red-300'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="card overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Event Image */}
              <div className="relative h-48 bg-gradient-to-br from-red-200 to-red-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-red-400" />
                </div>
                
                {/* Premium Badge */}
                {event.isPremium && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </div>
                )}

                {/* Date Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-xs font-medium text-gray-600">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {new Date(event.date).getDate()}
                  </div>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{formatTime(event.time)} • {formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.attendees} / {event.maxAttendees} attending</span>
                  </div>
                </div>

                {/* Organizer */}
                <div className="text-xs text-gray-500 mb-4">
                  Organized by {event.organizer}
                </div>

                {/* Attendee Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Attendance</span>
                    <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* RSVP Button */}
                <button
                  onClick={() => handleRSVP(event.id)}
                  className="w-full btn-primary"
                  disabled={event.attendees >= event.maxAttendees}
                >
                  {event.attendees >= event.maxAttendees ? 'Event Full' : 'RSVP Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Events Found
            </h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Create Event CTA */}
        <div className="mt-16 text-center">
          <div className="card p-8 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Want to Host an Event?
            </h2>
            <p className="text-gray-600 mb-6">
              Create your own cultural event or meetup for the Nepali community
            </p>
            <button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events