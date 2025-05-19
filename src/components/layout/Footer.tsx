import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary-500 dark:bg-primary-700 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 flex-shrink-0 mt-1" />
                <p>123 Forest Trail, Wilderness County, WC 54321</p>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-3 flex-shrink-0" />
                <p>(555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-3 flex-shrink-0" />
                <p>info@fossalupara.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-accent-300 transition-colors">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="hover:text-accent-300 transition-colors">
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('reviews')} className="hover:text-accent-300 transition-colors">
                  Reviews
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-accent-300 transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-accent-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Activities & Attractions */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Activities & Attractions</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-accent-300 transition-colors">
                  Hiking Trails
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-300 transition-colors">
                  Local Attractions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-300 transition-colors">
                  Tourist Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-300 transition-colors">
                  Seasonal Activities
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-accent-300 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-accent-300 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-accent-300 transition-colors">
                <Twitter size={24} />
              </a>
            </div>
            
            <h4 className="text-lg font-heading font-semibold mb-4">Newsletter</h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l text-primary-800 w-full"
              />
              <button 
                type="submit"
                className="bg-accent-400 hover:bg-accent-500 px-4 py-2 rounded-r transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Admin Link & Copyright */}
        <div className="border-t border-primary-400 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} Fossa Lupara Campsite. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <Link to="/admin/login" className="text-sm text-primary-200 hover:text-white">
              Admin Login
            </Link>
            <Link to="/terms-and-conditions" className="text-sm text-primary-200 hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;