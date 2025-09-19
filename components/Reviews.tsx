import React, { useState } from 'react';
import type { Review } from '../types';
import ReviewCard from './ReviewCard';

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, onAddReview }) => {
  const [newReview, setNewReview] = useState<Review>({ author: '', rating: 5, comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.author.trim() && newReview.comment.trim()) {
      // For this satirical site, we'll just assign a 5-star rating automatically
      onAddReview({ ...newReview, rating: 5 });
      setSubmitted(true);
      setNewReview({ author: '', rating: 5, comment: '' });
      setTimeout(() => setSubmitted(false), 5000); // Reset after 5 seconds
    }
  };

  return (
    <section id="reviews" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Audience Reactions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Read the ratings that really matter now.
          </p>
        </div>
        
        {reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        ) : (
            <div className="text-center py-8 text-gray-500">
                <p>No reviews yet. Be the first to leave your condolences!</p>
            </div>
        )}
        
        <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Leave Your Condolences</h3>
          {submitted ? (
            <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
              <p className="font-semibold">Thank you!</p>
              <p>Your condolences have been noted.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={newReview.author}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-mckimmels-yellow focus:border-mckimmels-yellow"
                  aria-label="Your Name"
                />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Comment</label>
                <textarea
                  name="comment"
                  id="comment"
                  rows={4}
                  value={newReview.comment}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-mckimmels-yellow focus:border-mckimmels-yellow"
                  aria-label="Your Comment"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-mckimmels-red text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mckimmels-red"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
