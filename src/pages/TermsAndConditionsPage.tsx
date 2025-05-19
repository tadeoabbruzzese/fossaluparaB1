import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />}>
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-heading font-bold text-primary-500 dark:text-white mb-6">
            Terms and Conditions
          </h1>

          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-primary-500 dark:text-white mb-4">
                1. Reservation and Payment Policy
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>A valid credit card is required to secure your reservation</li>
                <li>50% deposit is required at the time of booking</li>
                <li>Full payment is due 14 days prior to arrival</li>
                <li>Cancellations made 30+ days before arrival receive a full refund minus a $50 processing fee</li>
                <li>Cancellations made 14-29 days before arrival forfeit 50% of the deposit</li>
                <li>No refunds for cancellations made less than 14 days before arrival</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary-500 dark:text-white mb-4">
                2. Check-in and Check-out
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Check-in time: 3:00 PM - 8:00 PM</li>
                <li>Check-out time: 11:00 AM</li>
                <li>Late check-out must be arranged in advance and may incur additional fees</li>
                <li>Early check-in is subject to availability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary-500 dark:text-white mb-4">
                3. Campsite Rules and Regulations
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Quiet hours: 10:00 PM - 7:00 AM</li>
                <li>Maximum occupancy must not exceed the stated limit for each site</li>
                <li>Fires are only permitted in designated fire pits</li>
                <li>All trash must be properly disposed of in designated areas</li>
                <li>Speed limit within the campground is 5 MPH</li>
                <li>No fireworks or firearms allowed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary-500 dark:text-white mb-4">
                4. Pet Policy
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Pets must be leashed at all times</li>
                <li>Pet owners must clean up after their pets</li>
                <li>Pets must be current on vaccinations</li>
                <li>Maximum of 2 pets per site</li>
                <li>Additional pet fee applies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary-500 dark:text-white mb-4">
                5. Grounds for Immediate Eviction
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Violation of quiet hours after warning</li>
                <li>Disorderly conduct or harassment of other guests</li>
                <li>Damage to campground property</li>
                <li>Violation of fire safety rules</li>
                <li>Exceeding maximum occupancy</li>
                <li>No refunds will be issued for evictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary-500 dark:text-white mb-4">
                6. Liability and Insurance
              </h2>
              <p className="mb-4">
                Fossa Lupara Campsite is not responsible for accidents, injuries, or loss of property. 
                Guests are encouraged to have appropriate insurance coverage for their stay.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary-500 dark:text-white mb-4">
                7. Compliance with Regulations
              </h2>
              <p className="mb-4">
                Fossa Lupara Campsite complies with all local, state, and federal regulations regarding 
                campground operations, including health and safety standards, environmental protection, 
                and accessibility requirements.
              </p>
            </section>

            <div className="pt-8 border-t border-gray-200 dark:border-primary-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                These terms and conditions are subject to change without notice. By making a reservation, 
                you agree to comply with all current terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;