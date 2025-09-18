
import React from 'react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const GoldenArchesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M 20 90 Q 35 15 50 90 L 40 90 Q 35 45 30 90 Z" />
        <path d="M 50 90 Q 65 15 80 90 L 70 90 Q 65 45 60 90 Z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="bg-mckimmels-red shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <GoldenArchesIcon className="h-12 w-12 text-mckimmels-yellow" />
            <span className="text-3xl font-extrabold text-white ml-2 tracking-tight">McKimmel's</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-mckimmels-red focus:ring-white transition-colors duration-200"
              aria-label="Open cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-6 w-6 rounded-full bg-mckimmels-yellow text-mckimmels-red text-xs font-bold flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;