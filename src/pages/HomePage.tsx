import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import PricingSection from '../components/home/PricingSection';
import GallerySection from '../components/home/GallerySection';
import ReviewsSection from '../components/home/ReviewsSection';
import ContactSection from '../components/home/ContactSection';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-primary-900 min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <PricingSection />
        <GallerySection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;