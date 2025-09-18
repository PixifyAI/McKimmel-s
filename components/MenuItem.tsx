import React from 'react';
import type { MenuItem as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (itemId: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col group transform hover:-translate-y-2 transition-transform duration-300">
      <div className="aspect-square overflow-hidden">
        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.imageUrl} alt={item.name} />
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <h4 className="text-lg sm:text-xl font-bold text-gray-900">{item.name}</h4>
        <p className="mt-2 text-gray-600 text-sm flex-grow">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl sm:text-2xl font-extrabold text-gray-800">${item.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(item.id)}
            className="px-3 py-1.5 text-sm sm:px-4 sm:py-2 bg-mckimmels-yellow text-gray-900 font-semibold rounded-full shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mckimmels-yellow transition-all duration-200 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;