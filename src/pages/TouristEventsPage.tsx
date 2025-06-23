import React from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const TouristEventsPage: React.FC = () => {
  const events = [
    {
      id: 1,
      name: "Annual Wildflower Festival",
      date: "May 15-17, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Wildflower Meadows",
      category: "Nature Festival",
      description: "Celebrate the blooming season with guided wildflower walks, botanical workshops, photography contests, and local artisan markets.",
      image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
      price: "Free admission",
      capacity: "Unlimited",
      highlights: ["Guided nature walks", "Photography workshops", "Local artisan market", "Children's activities"]
    },
    {
      id: 2,
      name: "Mountain Music & Arts Festival",
      date: "June 20-22, 2025",
      time: "2:00 PM - 11:00 PM",
      location: "Pine Ridge Amphitheater",
      category: "Music Festival",
      description: "Three days of live music featuring local and regional artists, craft vendors, food trucks, and family-friendly entertainment.",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
      price: "$25/day, $60/weekend pass",
      capacity: "2,000 attendees",
      highlights: ["Live music performances", "Craft vendors", "Food trucks", "Kids zone"]
    },
    {
      id: 3,
      name: "Stargazing Night",
      date: "Every Saturday",
      time: "8:00 PM - 12:00 AM",
      location: "Sunset Point Observatory",
      category: "Astronomy Event",
      description: "Weekly stargazing sessions with professional telescopes, astronomy talks, and constellation identification guides.",
      image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg",
      price: "$10/person, $25/family",
      capacity: "50 people per session",
      highlights: ["Professional telescopes", "Astronomy talks", "Constellation guides", "Hot cocoa service"]
    },
    {
      id: 4,
      name: "Heritage Days",
      date: "July 4-6, 2025",
      time: "10:00 AM - 8:00 PM",
      location: "Historic Pine Ridge Village",
      category: "Cultural Event",
      description: "Experience local history with period demonstrations, traditional crafts, historical reenactments, and authentic cuisine.",
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
      price: "$15/adult, $8/child",
      capacity: "500 attendees per day",
      highlights: ["Historical reenactments", "Traditional crafts", "Period demonstrations", "Authentic cuisine"]
    },
    {
      id: 5,
      name: "Adventure Race Challenge",
      date: "August 10, 2025",
      time: "7:00 AM - 4:00 PM",
      location: "Various trail locations",
      category: "Sports Event",
      description: "Multi-sport adventure race including hiking, kayaking, and orienteering challenges for teams and individuals.",
      image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
      price: "$45/individual, $120/team",
      capacity: "200 participants",
      highlights: ["Multi-sport challenges", "Team competitions", "Individual categories", "Awards ceremony"]
    },
    {
      id: 6,
      name: "Harvest Moon Festival",
      date: "September 21-22, 2025",
      time: "5:00 PM - 11:00 PM",
      location: "Forest Haven Main Area",
      category: "Seasonal Festival",
      description: "Celebrate the autumn season with harvest-themed activities, pumpkin carving, hayrides, and traditional fall foods.",
      image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
      price: "$12/person",
      capacity: "800 attendees",
      highlights: ["Pumpkin carving", "Hayrides", "Fall foods", "Live entertainment"]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Nature Festival': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200';
      case 'Music Festival': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200';
      case 'Astronomy Event': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
      case 'Cultural Event': return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-200';
      case 'Sports Event': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200';
      case 'Seasonal Festival': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />}>
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary-500 dark:text-white mb-4">
            Tourist Events & Festivals
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join us for exciting events and festivals throughout the year. From nature celebrations 
            to cultural festivals, there's always something happening near Forest Haven Campsite.
          </p>
        </div>

        {/* Events Grid */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={event.id} className={`bg-white dark:bg-primary-800 rounded-lg shadow-md overflow-hidden ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } lg:flex`}>
              <div className="lg:w-2/5">
                <img 
                  src={event.image} 
                  alt={event.name}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-3/5 p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="mr-2" size={16} />
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-primary-500 dark:text-white mb-3">
                  {event.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {event.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="mr-2" size={18} />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="mr-2" size={18} />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Ticket className="mr-2" size={18} />
                    <span className="text-sm">{event.price}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="mr-2" size={18} />
                    <span className="text-sm">{event.capacity}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-primary-500 dark:text-white mb-2">Event Highlights:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    {event.highlights.map((highlight, idx) => (
                      <li key={idx}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="accent" size="sm">
                    Register Now
                  </Button>
                  <Button variant="outline" size="sm">
                    More Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Event Calendar Section */}
        <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-heading font-bold text-primary-500 dark:text-white mb-6 text-center">
            Event Calendar
          </h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-primary-700 rounded-lg overflow-hidden h-96 mb-6">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Calendar size={64} className="text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Interactive calendar coming soon</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Stay updated with all upcoming events and festivals. Subscribe to our newsletter for event notifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent">
                Subscribe to Newsletter
              </Button>
              <Button variant="outline">
                Download Event Calendar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristEventsPage;