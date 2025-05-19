import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('pricing');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/6271639/pexels-photo-6271639.jpeg"
          alt="Fossa Lupara Campsite"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 to-primary-900/70 dark:from-primary-900/60 dark:to-primary-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left max-w-2xl md:max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
            Experience Nature's Beauty at Fossa Lupara
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Escape the everyday and immerse yourself in the tranquility of our pristine forest campground. 
            From cozy cabins to scenic tent sites, we offer the perfect outdoor experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              variant="accent"
              size="lg"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Book Your Stay
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const gallerySection = document.getElementById('gallery');
                if (gallerySection) {
                  gallerySection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border-white text-white hover:bg-white/10"
            >
              Explore Gallery
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={scrollToNextSection}
          className="text-white flex flex-col items-center animate-bounce"
          aria-label="Scroll down"
        >
          <span className="mb-2 text-sm">Scroll Down</span>
          <ArrowDown size={24} />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;