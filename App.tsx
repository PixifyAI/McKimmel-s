import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Cart from './components/Cart';
import { fetchFakeReviews } from './services/geminiService';
import type { CartItem, Review } from './types';
import { MENU_ITEMS } from './constants';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState<number>(0);

  const loadReviews = useCallback(async () => {
    try {
      setReviewsLoading(true);
      setReviewsError(null);
      
      const storedReviews = localStorage.getItem('mckimmels_reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      } else {
        const fetchedReviews = await fetchFakeReviews();
        setReviews(fetchedReviews);
        localStorage.setItem('mckimmels_reviews', JSON.stringify(fetchedReviews));
      }
    } catch (error) {
      console.error("Failed to load reviews:", error);
      setReviewsError("Could not load customer reviews at the moment. Please try again later.");
    } finally {
      setReviewsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Load reviews on initial mount
    loadReviews();

    // Handle view count
    try {
        const storedCount = localStorage.getItem('mckimmels_view_count');
        const newCount = storedCount ? parseInt(storedCount, 10) + 1 : 1;
        localStorage.setItem('mckimmels_view_count', newCount.toString());
        setViewCount(newCount);
    } catch (e) {
        console.error("Failed to update view count", e);
        setViewCount(1); // Fallback
    }
  }, [loadReviews]);

  const handleAddReview = (newReview: Review) => {
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('mckimmels_reviews', JSON.stringify(updatedReviews));
  };

  const handleAddToCart = (itemId: number) => {
    const itemToAdd = MENU_ITEMS.find(item => item.id === itemId);
    if (!itemToAdd) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemId);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };
  
  const handleUpdateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Header cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <Menu onAddToCart={handleAddToCart} />
        <Reviews 
          reviews={reviews} 
          isLoading={reviewsLoading} 
          error={reviewsError} 
          onRefresh={loadReviews}
          onAddReview={handleAddReview}
        />
      </main>
      <Footer viewCount={viewCount} />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
};

export default App;