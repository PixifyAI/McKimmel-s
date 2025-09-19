import React, { useState, useEffect } from 'react';

// Using high-resolution images that match the food items
const heroImages = [
  { src: '/images/hero1.avif', alt: 'A close-up of a delicious, juicy burger', title: 'The Last Laugh' },
  { src: '/images/hero2.avif', alt: 'A batch of golden, crispy french fries', title: 'Salty & Satisfying' },
  { src: '/images/hero3.avif', alt: 'A creamy and rich chocolate milkshake in a glass', title: 'A Bitter End' },
  { src: '/images/hero4.avif', alt: 'A warm, flaky apple pie dessert', title: 'Just Desserts' },
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up an interval to cycle through images
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000); // Change image every 6 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    // Section takes up the full viewport height minus the 80px sticky header
    <section className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-black" aria-roledescription="carousel" aria-label="Promotional food images">
      {/* Slides container */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image.src})` }}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${heroImages.length}`}
          aria-hidden={index !== currentIndex}
        ></div>
      ))}
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-40" aria-hidden="true"></div>

      {/* Text content container */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {/* Animated text for each slide */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute text-center transition-all duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <h1 className="text-5xl font-extrabold tracking-tighter text-white drop-shadow-2xl sm:text-7xl lg:text-8xl">
              {image.title}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
