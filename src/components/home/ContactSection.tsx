import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { usePricing } from '../../contexts/PricingContext';
import Button from '../ui/Button';
import PricingPopup from './PricingPopup';

interface PricingOption {
  id: string;
  name: string;
  description: string;
  price_per_night: number;
  features: string[];
}

const ContactSection: React.FC = () => {
  const [showPricingPopup, setShowPricingPopup] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOption[]>([]);
  const { selectedPricing, setSelectedPricing } = usePricing();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    requestType: 'quote' as 'quote' | 'information',
    arrivalDate: '',
    departureDate: '',
    adults: 1,
    childrenUnder3: 0,
    childrenUnder12: 0,
    pets: 0
  });

  useEffect(() => {
    loadPricingOptions();
  }, []);

  const loadPricingOptions = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_options')
        .select('*')
        .order('price_per_night');

      if (error) throw error;
      setPricingOptions(data || []);
    } catch (error) {
      console.error('Error loading pricing options:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Math.max(0, parseInt(value) || 0)
    }));
  };

  const calculateEstimatedPrice = () => {
    if (!selectedPricing) return null;
    
    const selectedOption = pricingOptions.find(opt => opt.id === selectedPricing);
    if (!selectedOption) return null;

    const basePrice = selectedOption.price_per_night;
    const adultPrice = formData.adults * 25;
    const childrenUnder12Price = formData.childrenUnder12 * 15;
    const petPrice = formData.pets * 10;

    const totalPerNight = basePrice + adultPrice + childrenUnder12Price + petPrice;
    
    // Calculate number of nights
    const arrival = new Date(formData.arrivalDate);
    const departure = new Date(formData.departureDate);
    const nights = Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));

    if (isNaN(nights) || nights <= 0) return null;

    return {
      perNight: totalPerNight,
      total: totalPerNight * nights,
      nights
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const priceEstimate = calculateEstimatedPrice();
      let finalMessage = formData.message;

      if (selectedPricing && priceEstimate) {
        const selectedPricingDetails = pricingOptions.find(opt => opt.id === selectedPricing);
        if (selectedPricingDetails) {
          finalMessage += `\n\nBooking Details:
- Accommodation: ${selectedPricingDetails.name}
- Arrival: ${formData.arrivalDate}
- Departure: ${formData.departureDate}
- Adults: ${formData.adults}
- Children (under 3): ${formData.childrenUnder3}
- Children (3-12): ${formData.childrenUnder12}
- Pets: ${formData.pets}
- Estimated Price: $${priceEstimate.total.toFixed(2)} (${priceEstimate.nights} nights at $${priceEstimate.perNight.toFixed(2)}/night)`;
        }
      }
      
      const { error } = await supabase
        .from('contact_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: finalMessage,
          request_type: formData.requestType
        }]);

      if (error) throw error;
      
      setFormStatus('success');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        requestType: 'quote',
        arrivalDate: '',
        departureDate: '',
        adults: 1,
        childrenUnder3: 0,
        childrenUnder12: 0,
        pets: 0
      });
      setSelectedPricing(null);
      
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting contact request:', error);
      setFormStatus('error');
    }
  };

  const priceEstimate = calculateEstimatedPrice();

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold text-primary-500 dark:text-white mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-primary-600 dark:text-primary-200"
          >
            Have questions or ready to book your stay? Reach out to our team and we'll
            get back to you as soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold text-primary-500 dark:text-white mb-6">
              Send Us a Message
            </h3>
            
            {formStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-3 mb-4">
                  <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-primary-500 dark:text-white mb-2">
                  Message Sent Successfully!
                </h4>
                <p className="text-center text-primary-600 dark:text-primary-200">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-primary-600 dark:text-primary-200 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-primary-600 dark:text-primary-200 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-primary-600 dark:text-primary-200 mb-2">
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="requestType" className="block text-primary-600 dark:text-primary-200 mb-2">
                    Request Type *
                  </label>
                  <select
                    id="requestType"
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                  >
                    <option value="quote">Request a Quote</option>
                    <option value="information">General Information</option>
                  </select>
                </div>

                {formData.requestType === 'quote' && (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="pricingOption" className="block text-primary-600 dark:text-primary-200">
                          Accommodation Option
                        </label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPricingPopup(true)}
                        >
                          View Detailed Pricing
                        </Button>
                      </div>
                      <select
                        id="pricingOption"
                        name="pricingOption"
                        value={selectedPricing || ''}
                        onChange={(e) => setSelectedPricing(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                      >
                        <option value="">Select an option</option>
                        {pricingOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name} (${option.price_per_night}/night)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="arrivalDate" className="block text-primary-600 dark:text-primary-200 mb-2">
                          Arrival Date
                        </label>
                        <input
                          type="date"
                          id="arrivalDate"
                          name="arrivalDate"
                          value={formData.arrivalDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="departureDate" className="block text-primary-600 dark:text-primary-200 mb-2">
                          Departure Date
                        </label>
                        <input
                          type="date"
                          id="departureDate"
                          name="departureDate"
                          value={formData.departureDate}
                          onChange={handleInputChange}
                          min={formData.arrivalDate || new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label htmlFor="adults" className="block text-primary-600 dark:text-primary-200 mb-2">
                          Adults (12+)
                        </label>
                        <input
                          type="number"
                          id="adults"
                          name="adults"
                          value={formData.adults}
                          onChange={handleNumberChange}
                          min="1"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="childrenUnder3" className="block text-primary-600 dark:text-primary-200 mb-2">
                          Under 3
                        </label>
                        <input
                          type="number"
                          id="childrenUnder3"
                          name="childrenUnder3"
                          value={formData.childrenUnder3}
                          onChange={handleNumberChange}
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="childrenUnder12" className="block text-primary-600 dark:text-primary-200 mb-2">
                          Ages 3-12
                        </label>
                        <input
                          type="number"
                          id="childrenUnder12"
                          name="childrenUnder12"
                          value={formData.childrenUnder12}
                          onChange={handleNumberChange}
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="pets" className="block text-primary-600 dark:text-primary-200 mb-2">
                          Pets
                        </label>
                        <input
                          type="number"
                          id="pets"
                          name="pets"
                          value={formData.pets}
                          onChange={handleNumberChange}
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                    </div>

                    {priceEstimate && (
                      <div className="mb-4 p-4 bg-primary-50 dark:bg-primary-700 rounded-lg">
                        <h4 className="font-semibold text-primary-500 dark:text-white mb-2">
                          Estimated Price
                        </h4>
                        <p className="text-primary-600 dark:text-primary-200">
                          ${priceEstimate.perNight.toFixed(2)} per night
                        </p>
                        <p className="text-primary-600 dark:text-primary-200">
                          Total for {priceEstimate.nights} nights: ${priceEstimate.total.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </>
                )}
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-primary-600 dark:text-primary-200 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                    placeholder="Please include any special requirements or questions you may have..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={formStatus === 'submitting'}
                    disabled={formStatus === 'submitting'}
                  >
                    {formData.requestType === 'quote' ? 'Request Quote' : 'Send Message'}
                  </Button>
                </div>
                
                {formStatus === 'error' && (
                  <p className="mt-4 text-red-500">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-primary-500 dark:bg-primary-700 text-white rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="mr-3 h-6 w-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-lg font-medium mb-1">Email Us</p>
                    <a 
                      href="mailto:info@fossalupara.com" 
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      info@fossalupara.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-3 h-6 w-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-lg font-medium mb-1">Call Us</p>
                    <a 
                      href="tel:+15551234567" 
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="mr-3 h-6 w-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-lg font-medium mb-1">Office Hours</p>
                    <p className="text-white/80">Monday - Friday: 9AM - 5PM</p>
                    <p className="text-white/80">Saturday: 10AM - 4PM</p>
                    <p className="text-white/80">Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="mr-3 h-6 w-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-lg font-medium mb-1">Check-in/Check-out</p>
                    <p className="text-white/80">Check-in: 3PM - 8PM</p>
                    <p className="text-white/80">Check-out: 11AM</p>
                    <p className="text-white/80 text-sm mt-1">
                      Early check-in and late check-out available upon request
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map or Image */}
            <div className="rounded-lg overflow-hidden shadow-md h-64">
              <img 
                src="https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg" 
                alt="Fossa Lupara Campsite Location" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {showPricingPopup && (
        <PricingPopup onClose={() => setShowPricingPopup(false)} />
      )}
    </section>
  );
};

export default ContactSection;