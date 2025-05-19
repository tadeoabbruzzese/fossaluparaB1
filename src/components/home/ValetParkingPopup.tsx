import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, X } from 'lucide-react';
import Button from '../ui/Button';

interface ValetParkingPopupProps {
  onClose: () => void;
}

const ValetParkingPopup: React.FC<ValetParkingPopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);
    

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
  if (isVisible) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return () => {
    document.body.style.overflow = 'auto'; // Cleanup por si se desmonta antes
  };
}, [isVisible]);

  return (
    <AnimatePresence>
  {isVisible && (
    <>
      {/* Fondo oscuro semitransparente */}
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div className="relative bg-white dark:bg-primary-800 rounded-lg shadow-lg border border-primary-100 dark:border-primary-700 w-full max-w-md">
          <div className="p-6">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <X size={20} />
            </button>

            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary-100 dark:bg-primary-700 rounded-full p-3">
                <Car size={24} className="text-primary-500 dark:text-white" />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-primary-500 dark:text-white text-center mb-2">
              Valet Parking Available
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-4">
              Enjoy hassle-free parking with our premium valet service for just $15/day
            </p>

            <div className="flex justify-center">
              <Button
                variant="accent"
                size="sm"
                onClick={() => setIsVisible(false)}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
  );
};

export default ValetParkingPopup;