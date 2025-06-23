import React from 'react';
import { ArrowLeft, MapPin, Clock, TrendingUp, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const HikingTrailsPage: React.FC = () => {
  const trails = [
    {
      id: 1,
      name: "Sunset Ridge Trail",
      difficulty: "Easy",
      distance: "2.3 miles",
      duration: "1-2 hours",
      elevation: "200 ft",
      description: "A gentle trail perfect for families, offering stunning sunset views from the ridge.",
      image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
      highlights: ["Scenic overlooks", "Wildlife viewing", "Photography spots"]
    },
    {
      id: 2,
      name: "Forest Loop Trail",
      difficulty: "Moderate",
      distance: "4.7 miles",
      duration: "2-3 hours",
      elevation: "450 ft",
      description: "Wind through dense forest with opportunities to see local wildlife and native plants.",
      image: "https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg",
      highlights: ["Old-growth forest", "Stream crossings", "Bird watching"]
    },
    {
      id: 3,
      name: "Summit Challenge",
      difficulty: "Difficult",
      distance: "6.8 miles",
      duration: "4-5 hours",
      elevation: "1,200 ft",
      description: "A challenging climb to the highest peak in the area with panoramic views.",
      image: "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg",
      highlights: ["Mountain summit", "360° views", "Rock formations"]
    },
    {
      id: 4,
      name: "Lakeside Path",
      difficulty: "Easy",
      distance: "1.8 miles",
      duration: "45 min - 1 hour",
      elevation: "50 ft",
      description: "A peaceful walk along the lake shore, perfect for morning or evening strolls.",
      image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
      highlights: ["Lake views", "Fishing spots", "Picnic areas"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
      case 'Difficult': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200';
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
            Hiking Trails
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the natural beauty surrounding Forest Haven Campsite through our network of 
            well-maintained hiking trails. From easy family walks to challenging summit climbs, 
            there's something for every adventurer.
          </p>
        </div>

        {/* Trail Safety Info */}
        <div className="bg-accent-50 dark:bg-accent-900 border border-accent-200 dark:border-accent-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-accent-800 dark:text-accent-200 mb-4">
            Trail Safety & Guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-accent-700 dark:text-accent-300">
            <ul className="space-y-2">
              <li>• Always inform someone of your hiking plans</li>
              <li>• Carry plenty of water and snacks</li>
              <li>• Wear appropriate hiking footwear</li>
              <li>• Check weather conditions before departing</li>
            </ul>
            <ul className="space-y-2">
              <li>• Stay on marked trails</li>
              <li>• Respect wildlife - observe from distance</li>
              <li>• Pack out all trash</li>
              <li>• Emergency contact: (555) 123-4567</li>
            </ul>
          </div>
        </div>

        {/* Trails Grid */}
        <div className="space-y-8">
          {trails.map((trail, index) => (
            <div key={trail.id} className={`bg-white dark:bg-primary-800 rounded-lg shadow-md overflow-hidden ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } lg:flex`}>
              <div className="lg:w-1/2">
                <img 
                  src={trail.image} 
                  alt={trail.name}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-heading font-bold text-primary-500 dark:text-white">
                    {trail.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(trail.difficulty)}`}>
                    {trail.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {trail.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="mr-2" size={18} />
                    <span className="text-sm">{trail.distance}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="mr-2" size={18} />
                    <span className="text-sm">{trail.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <TrendingUp className="mr-2" size={18} />
                    <span className="text-sm">{trail.elevation} gain</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Camera className="mr-2" size={18} />
                    <span className="text-sm">Photo opportunities</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-primary-500 dark:text-white mb-2">Trail Highlights:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    {trail.highlights.map((highlight, idx) => (
                      <li key={idx}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trail Map Section */}
        <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-heading font-bold text-primary-500 dark:text-white mb-6 text-center">
            Trail Map & Information
          </h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-primary-700 rounded-lg overflow-hidden h-96 mb-6">
            <img 
              src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg" 
              alt="Trail Map"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Download our detailed trail map or pick up a physical copy at the visitor center.
            </p>
            <Button variant="accent">
              Download Trail Map (PDF)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HikingTrailsPage;