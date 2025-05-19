import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { usePricing } from '../../contexts/PricingContext';
import Button from '../ui/Button';

interface PricingOption {
  id: string;
  name: string;
  description: string;
  price_per_night: number;
  features: string[];
}

const PricingSection: React.FC = () => {
  const [pricingOptions, setPricingOptions] = useState<PricingOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedPricing, setSelectedPricing } = usePricing();

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
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const handleBookNow = (option: PricingOption) => {
    setSelectedPricing(option.id);
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Focus the message input after scrolling
      setTimeout(() => {
        const messageInput = document.getElementById('message');
        if (messageInput) {
          messageInput.focus();
        }
      }, 800);
    }
  };

  if (isLoading) {
    return (
      <section id="pricing" className="py-20 bg-white dark:bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold text-primary-500 dark:text-white mb-4"
          >
            Accommodation Options
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-primary-600 dark:text-primary-200"
          >
            Choose from our range of camping and cabin options to suit your needs and budget.
            All options include access to our amenities and beautiful surroundings.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {pricingOptions.map((option) => (
            <motion.div
              key={option.id}
              variants={itemVariants}
              className="bg-white dark:bg-primary-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow transform hover:-translate-y-1"
            >
              <div className="p-6 border-b border-gray-100 dark:border-primary-600">
                <h3 className="text-xl font-heading font-semibold text-primary-500 dark:text-white mb-2">
                  {option.name}
                </h3>
                <p className="text-gray-500 dark:text-primary-200 mb-4">
                  {option.description}
                </p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary-600 dark:text-white">
                    ${option.price_per_night}
                  </span>
                  <span className="ml-1 text-gray-500 dark:text-primary-300">
                    / night
                  </span>
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-primary-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="accent"
                  className="w-full"
                  onClick={() => handleBookNow(option)}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;