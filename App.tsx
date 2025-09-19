import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Cart from './components/Cart';
import type { CartItem, Review } from './types';
import { MENU_ITEMS } from './constants';
import { Footer } from './components/Footer';

const STATIC_REVIEWS: Review[] = [
  { author: "ComedyConnoisseur", rating: 5, comment: "The Kimmel Crybaby Mac is deliciously ironic. The LeftyLoon sauce has a certain tang of desperation. 10/10 would laugh at his failure again." },
  { author: "LateNightWatcher", rating: 5, comment: "The Failure Fries are perfectly salted with his tears. It's the best thing to come out of his career ending. So crispy!" },
  { author: "RatingExpert", rating: 4, comment: "Finally, a menu that reflects the host! The Humble Pie was a bit hard to swallow, but satisfying nonetheless. A fitting end." },
  { author: "Gleeful Critic", rating: 5, comment: "Had the Monologue Melt. It just kept going, but unlike his show, I actually enjoyed this. Great stuff!" },
  { author: "Policy Wonk", rating: 5, comment: "The 'No one is laughing' Cookie was surprisingly good. I guess something funny finally came from him." },
  { author: "Freedom Fries Fan", rating: 4, comment: "The Liberal Tears Mozzarella Sticks are the perfect amount of salty. Highly recommend for a taste of victory." }
];

const getInitialReviews = (): Review[] => {
  try {
    const storedReviews = localStorage.getItem('mckimmels_reviews');
    if (storedReviews) {
      return JSON.parse(storedReviews);
    }
    // Initialize if not present
    localStorage.setItem('mckimmels_reviews', JSON.stringify(STATIC_REVIEWS));
    return STATIC_REVIEWS;
  } catch (error) {
    console.error("Failed to load reviews from local storage:", error);
    return STATIC_REVIEWS; // Fallback to static reviews
  }
};

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(getInitialReviews);
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
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
  }, []);

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