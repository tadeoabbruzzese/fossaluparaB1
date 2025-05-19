import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('campsite-dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('campsite-dark-mode', 'false');
    }
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('campsite-dark-mode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  const getTextColorClass = () => {
    if (isDarkMode) return 'text-primary-100';
    return isScrolled ? 'text-primary-600' : 'text-white';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-white/90 dark:bg-primary-800/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-xl font-heading font-semibold ${isScrolled ? 'text-primary-500' : 'text-white'} dark:text-white`}>
              Fossa Lupara
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('pricing')}
              className={`${getTextColorClass()} hover:text-accent-500 dark:hover:text-accent-400 transition-colors`}
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className={`${getTextColorClass()} hover:text-accent-500 dark:hover:text-accent-400 transition-colors`}
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className={`${getTextColorClass()} hover:text-accent-500 dark:hover:text-accent-400 transition-colors`}
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`${getTextColorClass()} hover:text-accent-500 dark:hover:text-accent-400 transition-colors`}
            >
              Contact
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-primary-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-primary-100" />
              ) : (
                <Moon size={20} className={isScrolled ? 'text-primary-600' : 'text-white'} />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-primary-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-primary-100" />
              ) : (
                <Moon size={20} className={isScrolled ? 'text-primary-600' : 'text-white'} />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-primary-500' : 'text-white'
              } dark:text-white hover:bg-gray-100 dark:hover:bg-primary-700 transition-colors`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-primary-800 shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left py-3 text-primary-600 dark:text-primary-100 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-left py-3 text-primary-600 dark:text-primary-100 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="block w-full text-left py-3 text-primary-600 dark:text-primary-100 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left py-3 text-primary-600 dark:text-primary-100 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;