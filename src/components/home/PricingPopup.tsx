import React from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface PricingPopupProps {
  onClose: () => void;
}

const PricingPopup: React.FC<PricingPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-primary-800 rounded-lg shadow-xl max-w-2xl w-full p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-heading font-bold text-primary-500 dark:text-white mb-4">
          Detailed Pricing Information
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-primary-500 dark:text-white mb-2">
              Per Person Rates
            </h3>
            <table className="w-full border-collapse text-gray-800 dark:text-gray-100">
              <thead>
                <tr className="border-b dark:border-primary-700">
                  <th className="text-left py-2">Age Group</th>
                  <th className="text-right py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-primary-700">
                  <td className="py-2">Children under 3</td>
                  <td className="text-right">Free</td>
                </tr>
                <tr className="border-b dark:border-primary-700">
                  <td className="py-2">Children (3-12)</td>
                  <td className="text-right">$15/night</td>
                </tr>
                <tr className="border-b dark:border-primary-700">
                  <td className="py-2">Adults (12+)</td>
                  <td className="text-right">$25/night</td>
                </tr>
                <tr>
                  <td className="py-2">Pets</td>
                  <td className="text-right">$10/night per pet</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-500 dark:text-white mb-2">
              Additional Services
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Valet Parking: $15/day</li>
              <li>• Firewood Bundle: $8</li>
              <li>• Camping Equipment Rental: From $20/day</li>
              <li>• Guided Tours: From $30/person</li>
            </ul>
          </div>

          <div className="pt-4">
            <Button variant="accent" onClick={onClose} className="w-full">
              Got it
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPopup;