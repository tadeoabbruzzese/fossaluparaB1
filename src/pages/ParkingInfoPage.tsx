import React from 'react';
import { ArrowLeft, Car, Clock, MapPin, CreditCard, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const ParkingInfoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />}>
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-8 mb-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary-100 dark:bg-primary-700 rounded-full p-4">
                <Car size={48} className="text-primary-500 dark:text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-heading font-bold text-primary-500 dark:text-white mb-4">
              Valet Parking Services
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience hassle-free parking with our premium valet service. Let us take care of your vehicle 
              while you enjoy your stay at Forest Haven Campsite.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Pricing Section */}
            <div className="bg-gray-50 dark:bg-primary-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-primary-500 dark:text-white mb-4 flex items-center">
                <CreditCard className="mr-2" size={24} />
                Pricing
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-primary-600 pb-2">
                  <span className="text-gray-700 dark:text-gray-300">Standard Valet Service</span>
                  <span className="font-semibold text-primary-500 dark:text-white">$15/day</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-primary-600 pb-2">
                  <span className="text-gray-700 dark:text-gray-300">Overnight Valet (24+ hours)</span>
                  <span className="font-semibold text-primary-500 dark:text-white">$12/day</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-primary-600 pb-2">
                  <span className="text-gray-700 dark:text-gray-300">Weekly Rate (7+ days)</span>
                  <span className="font-semibold text-primary-500 dark:text-white">$10/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Car Wash Add-on</span>
                  <span className="font-semibold text-primary-500 dark:text-white">+$25</span>
                </div>
              </div>
            </div>

            {/* Service Hours */}
            <div className="bg-gray-50 dark:bg-primary-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-primary-500 dark:text-white mb-4 flex items-center">
                <Clock className="mr-2" size={24} />
                Service Hours
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Monday - Friday</span>
                  <span className="font-medium text-primary-500 dark:text-white">7:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Saturday - Sunday</span>
                  <span className="font-medium text-primary-500 dark:text-white">6:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Emergency Retrieval</span>
                  <span className="font-medium text-primary-500 dark:text-white">24/7 Available</span>
                </div>
                <div className="mt-4 p-3 bg-accent-100 dark:bg-accent-800 rounded-md">
                  <p className="text-sm text-accent-700 dark:text-accent-200">
                    <strong>Note:</strong> Emergency retrieval after hours incurs a $20 fee
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-500 dark:text-white mb-6">
              What's Included
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start">
                <Shield className="mr-3 text-green-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Secure Storage</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Your vehicle is stored in our monitored, secure parking area
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 text-blue-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Prime Location</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Convenient pickup and drop-off at the main entrance
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Car className="mr-3 text-purple-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Professional Service</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Trained and insured valet attendants handle your vehicle
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-500 dark:text-white mb-6">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-500 dark:text-white">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Arrival</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Drive up to our valet station at the main entrance and hand over your keys
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-500 dark:text-white">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Enjoy Your Stay</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Relax and enjoy your camping experience while we take care of your vehicle
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-500 dark:text-white">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Departure</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Request your vehicle and we'll have it ready for you at the pickup area
                </p>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 dark:bg-primary-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-primary-500 dark:text-white mb-4">
              Terms and Conditions
            </h2>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Valet service must be requested at least 2 hours in advance for guaranteed availability</li>
              <li>• Forest Haven Campsite is not responsible for items left in vehicles</li>
              <li>• Vehicles must be in working condition and legally registered</li>
              <li>• Maximum vehicle size: Standard passenger vehicles and small RVs (under 25 feet)</li>
              <li>• Payment is due at the time of service</li>
              <li>• Cancellation must be made at least 4 hours in advance to avoid charges</li>
            </ul>
          </div>

          <div className="text-center mt-8">
            <Link to="/#contact">
              <Button variant="accent" size="lg">
                Book Valet Service
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingInfoPage;