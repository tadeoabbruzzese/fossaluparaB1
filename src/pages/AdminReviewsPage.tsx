import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import AdminHeader from '../components/admin/AdminHeader';
import Button from '../components/ui/Button';
import { getReviews, updateReview, deleteReview, Review } from '../utils/dataService';

const AdminReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'unpublished'>('all');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    setIsLoading(true);
    const allReviews = getReviews();
    // Sort by date, newest first
    const sortedReviews = allReviews.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setReviews(sortedReviews);
    setIsLoading(false);
  };

  const handlePublishToggle = (id: string, currentStatus: boolean) => {
    updateReview(id, { published: !currentStatus });
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, published: !currentStatus } : review
    ));
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      deleteReview(id);
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  const filteredReviews = () => {
    switch (activeTab) {
      case 'published':
        return reviews.filter(review => review.published);
      case 'unpublished':
        return reviews.filter(review => !review.published);
      default:
        return reviews;
    }
  };

  const renderStar = (filled: boolean) => (
    <svg 
      className={`h-4 w-4 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-primary-900">
      <AdminHeader />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 dark:border-primary-700 mb-6">
          <h1 className="text-2xl font-bold text-primary-500 dark:text-white">Manage Reviews</h1>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-primary-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-primary-500 text-primary-500 dark:text-primary-300 dark:border-primary-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'published'
                  ? 'border-primary-500 text-primary-500 dark:text-primary-300 dark:border-primary-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setActiveTab('unpublished')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'unpublished'
                  ? 'border-primary-500 text-primary-500 dark:text-primary-300 dark:border-primary-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Unpublished
            </button>
          </nav>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            {filteredReviews().length === 0 ? (
              <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reviews found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {activeTab === 'all' 
                    ? 'There are no reviews in the system yet.' 
                    : activeTab === 'published' 
                      ? 'There are no published reviews yet.'
                      : 'There are no unpublished reviews awaiting moderation.'}
                </p>
              </div>
            ) : (
              <div className="overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-primary-700">
                  {filteredReviews().map((review) => (
                    <li key={review.id} className="bg-white dark:bg-primary-800 px-4 py-5 sm:px-6 shadow-sm rounded-md mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mr-3">
                              {review.name}
                            </h3>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-primary-700 text-gray-800 dark:text-gray-300">
                              {review.date}
                            </span>
                          </div>
                          
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{renderStar(i < review.rating)}</span>
                            ))}
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant={review.published ? 'ghost' : 'accent'}
                            size="sm"
                            icon={review.published ? <XCircle size={16} /> : <CheckCircle size={16} />}
                            onClick={() => handlePublishToggle(review.id, review.published)}
                          >
                            {review.published ? 'Unpublish' : 'Publish'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<Trash2 size={16} />}
                            className="text-red-500 dark:text-red-400 border-red-500 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminReviewsPage;