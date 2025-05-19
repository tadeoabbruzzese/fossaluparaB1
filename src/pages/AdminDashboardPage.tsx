import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Image, Mail, Trash2, CheckCircle } from 'lucide-react';
import AdminHeader from '../components/admin/AdminHeader';
import Button from '../components/ui/Button';
import { getReviews, Review, getContactRequests, ContactRequest, deleteContactRequest } from '../utils/dataService';

const AdminDashboardPage: React.FC = () => {
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get recent unpublished reviews
    const allReviews = getReviews();
    const unpublishedReviews = allReviews
      .filter(review => !review.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
    
    setRecentReviews(unpublishedReviews);
    
    // Get recent contact requests
    const allContactRequests = getContactRequests();
    const recentRequests = allContactRequests
      .sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime())
      .slice(0, 5);
    
    setContactRequests(recentRequests);
    setIsLoading(false);
  }, []);

  const handleDeleteRequest = (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact request?')) {
      deleteContactRequest(id);
      setContactRequests(prev => prev.filter(request => request.id !== id));
    }
  };

  const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ 
    title, value, icon, color 
  }) => (
    <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} text-white`}>
          {icon}
        </div>
        <div className="ml-5">
          <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
          <h3 className="font-bold text-2xl text-gray-700 dark:text-white">{value}</h3>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-primary-900">
        <AdminHeader />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-primary-900">
      <AdminHeader />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 dark:border-primary-700 mb-6">
          <h1 className="text-2xl font-bold text-primary-500 dark:text-white">Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Reviews"
            value="15"
            icon={<Users size={24} />}
            color="bg-blue-500"
          />
          <StatCard 
            title="Pricing Options"
            value="4"
            icon={<DollarSign size={24} />}
            color="bg-green-500"
          />
          <StatCard 
            title="Gallery Images"
            value="6"
            icon={<Image size={24} />}
            color="bg-purple-500"
          />
          <StatCard 
            title="Contact Requests"
            value={contactRequests.length.toString()}
            icon={<Mail size={24} />}
            color="bg-yellow-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Unpublished Reviews */}
          <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-primary-500 dark:text-white mb-4">
              Recent Unpublished Reviews
            </h2>
            
            {recentReviews.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No unpublished reviews at the moment.</p>
            ) : (
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-primary-700 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-700 dark:text-white">{review.name}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Contact Requests */}
          <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-primary-500 dark:text-white mb-4">
              Recent Contact Requests
            </h2>
            
            {contactRequests.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No contact requests yet.</p>
            ) : (
              <div className="space-y-4">
                {contactRequests.map((request) => (
                  <div key={request.id} className="border-b border-gray-200 dark:border-primary-700 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-700 dark:text-white">{request.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(request.dateSubmitted).toLocaleDateString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Trash2 size={16} />}
                          onClick={() => handleDeleteRequest(request.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="mt-1 space-y-1">
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        <span className="font-medium">Type:</span> {request.requestType === 'quote' ? 'Quote Request' : 'Information'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        <span className="font-medium">Email:</span> {request.email}
                      </p>
                      {request.phone && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          <span className="font-medium">Phone:</span> {request.phone}
                        </p>
                      )}
                      <div className="mt-2">
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          <span className="font-medium">Message:</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 whitespace-pre-wrap">
                          {request.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;