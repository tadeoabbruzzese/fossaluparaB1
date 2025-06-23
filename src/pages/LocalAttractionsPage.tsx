import React from 'react';
import { ArrowLeft, MapPin, Clock, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const LocalAttractionsPage: React.FC = () => {
  const attractions = [
    {
      id: 1,
      name: "Crystal Falls",
      category: "Natural Wonder",
      distance: "3.2 miles",
      duration: "30 min drive",
      rating: 4.8,
      description: "A breathtaking 80-foot waterfall cascading into a crystal-clear pool. Perfect for photography and nature appreciation.",
      image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg",
      features: ["Swimming allowed", "Picnic area", "Photography spots", "Easy access trail"],
      hours: "Dawn to Dusk",
      admission: "Free"
    },
    {
      id: 2,
      name: "Historic Pine Ridge Village",
      category: "Cultural Site",
      distance: "8.5 miles",
      duration: "15 min drive",
      rating: 4.6,
      description: "Step back in time at this preserved 1800s logging village with authentic buildings, demonstrations, and guided tours.",
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
      features: ["Guided tours", "Gift shop", "Historical exhibits", "Blacksmith demonstrations"],
      hours: "9 AM - 5 PM",
      admission: "$12 adults, $8 children"
    },
    {
      id: 3,
      name: "Sunset Point Observatory",
      category: "Scenic Viewpoint",
      distance: "5.7 miles",
      duration: "12 min drive",
      rating: 4.9,
      description: "The highest accessible point in the region offering panoramic views and excellent stargazing opportunities.",
      image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg",
      features: ["360° views", "Telescope access", "Sunset viewing", "Stargazing events"],
      hours: "24/7 (Telescope: 8 PM - 11 PM)",
      admission: "Free (Telescope: $5)"
    },
    {
      id: 4,
      name: "Adventure Sports Center",
      category: "Recreation",
      distance: "12.3 miles",
      duration: "20 min drive",
      rating: 4.7,
      description: "Full-service adventure center offering zip-lining, rock climbing, kayak rentals, and guided outdoor activities.",
      image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
      features: ["Zip-line tours", "Rock climbing", "Kayak rentals", "Guided adventures"],
      hours: "8 AM - 6 PM",
      admission: "Varies by activity"
    },
    {
      id: 5,
      name: "Wildflower Meadows",
      category: "Natural Area",
      distance: "4.1 miles",
      duration: "8 min drive",
      rating: 4.5,
      description: "Expansive meadows bursting with seasonal wildflowers, perfect for nature walks and botanical photography.",
      image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
      features: ["Seasonal blooms", "Nature trails", "Bird watching", "Photography workshops"],
      hours: "Dawn to Dusk",
      admission: "Free"
    },
    {
      id: 6,
      name: "Mountain Lake Marina",
      category: "Water Recreation",
      distance: "6.8 miles",
      duration: "15 min drive",
      rating: 4.4,
      description: "Full-service marina offering boat rentals, fishing guides, and lakeside dining with stunning mountain views.",
      image: "https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg",
      features: ["Boat rentals", "Fishing guides", "Lakeside restaurant", "Swimming area"],
      hours: "6 AM - 8 PM",
      admission: "Free (Rentals extra)"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Natural Wonder': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200';
      case 'Cultural Site': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200';
      case 'Scenic Viewpoint': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
      case 'Recreation': return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-200';
      case 'Natural Area': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200';
      case 'Water Recreation': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-200';
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
            Local Attractions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the amazing attractions and activities near Forest Haven Campsite. 
            From natural wonders to cultural sites, there's something for everyone to explore.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {attractions.map((attraction) => (
            <div key={attraction.id} className="bg-white dark:bg-primary-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={attraction.image} 
                  alt={attraction.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(attraction.category)}`}>
                    {attraction.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white dark:bg-primary-800 rounded-full px-2 py-1 flex items-center">
                  <Star className="text-yellow-400 fill-yellow-400 mr-1" size={16} />
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{attraction.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-primary-500 dark:text-white mb-2">
                  {attraction.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {attraction.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="mr-2" size={16} />
                    <span>{attraction.distance}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="mr-2" size={16} />
                    <span>{attraction.duration}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-primary-500 dark:text-white mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {attraction.features.map((feature, idx) => (
                      <span key={idx} className="bg-gray-100 dark:bg-primary-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-primary-700 pt-4">
                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="text-gray-600 dark:text-gray-300">
                      <strong>Hours:</strong> {attraction.hours}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      <strong>Admission:</strong> {attraction.admission}
                    </span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full" icon={<ExternalLink size={16} />}>
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-heading font-bold text-primary-500 dark:text-white mb-6 text-center">
            Attractions Map
          </h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-primary-700 rounded-lg overflow-hidden h-96 mb-6">
            <img 
              src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg" 
              alt="Local Attractions Map"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Download our comprehensive attractions map or visit our front desk for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent">
                Download Map (PDF)
              </Button>
              <Button variant="outline">
                Request Custom Itinerary
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalAttractionsPage;