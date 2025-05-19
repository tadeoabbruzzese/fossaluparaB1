import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquarePlus } from 'lucide-react';
import { getReviews, addReview, Review } from '../../utils/dataService';
import Button from '../ui/Button';

const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Fetch only published reviews
    setReviews(getReviews(true));
    setLoadingReviews(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (newRating: number) => {
    setNewReview(prev => ({
      ...prev,
      rating: newRating
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    try {
      addReview(newReview);
      setSubmitStatus('success');
      // Reset form
      setNewReview({
        name: '',
        rating: 5,
        comment: ''
      });
      
      // Close form after success
      setTimeout(() => {
        setShowReviewForm(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
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
      transition: { duration: 0.5 }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={18}
        className={`${
          index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-white dark:bg-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold text-primary-500 dark:text-white mb-4"
          >
            Guest Reviews
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-primary-600 dark:text-primary-200"
          >
            See what our guests have to say about their stay at Fossa Lupara Campsite.
            We value your feedback and continuously strive to improve our services.
          </motion.p>
        </div>

        {loadingReviews ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={itemVariants}
                  className="bg-gray-50 dark:bg-primary-700 rounded-lg p-6 shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="ml-2 text-gray-500 dark:text-gray-300">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-primary-600 dark:text-primary-100 mb-4">"{review.comment}"</p>
                  <div className="font-semibold text-primary-500 dark:text-white">
                    - {review.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Button
                variant="accent"
                size="lg"
                icon={<MessageSquarePlus />}
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </Button>
            </motion.div>

            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 max-w-xl mx-auto bg-white dark:bg-primary-700 rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-primary-500 dark:text-white mb-4">
                  Share Your Experience
                </h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-primary-600 dark:text-primary-200 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newReview.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-primary-600 dark:text-primary-200 mb-2">
                      Rating
                    </label>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleRatingChange(index + 1)}
                          className="mr-1"
                        >
                          <Star
                            size={24}
                            className={`${
                              index < newReview.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            } hover:text-yellow-400`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-primary-600 dark:text-primary-200 mb-2">
                      Your Comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={newReview.comment}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-800 dark:text-white"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={submitStatus === 'submitting'}
                      disabled={submitStatus === 'submitting'}
                    >
                      {submitStatus === 'success' ? 'Review Submitted!' : 'Submit Review'}
                    </Button>
                  </div>
                  
                  {submitStatus === 'error' && (
                    <p className="mt-2 text-red-500">
                      There was an error submitting your review. Please try again.
                    </p>
                  )}
                  
                  {submitStatus === 'success' && (
                    <p className="mt-2 text-green-600 dark:text-green-400">
                      Thank you for your review! It will be published after moderation.
                    </p>
                  )}
                </form>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;