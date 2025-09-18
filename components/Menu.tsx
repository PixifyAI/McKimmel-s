import React, { useMemo } from 'react';
import { MENU_ITEMS } from '../constants';
import type { MenuItem as MenuItemType } from '../types';
import MenuItem from './MenuItem';

interface MenuProps {
  onAddToCart: (itemId: number) => void;
}

const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const categorizedMenu = useMemo(() => {
    return MENU_ITEMS.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, MenuItemType[]>);
  }, []);

  const categories = Object.keys(categorizedMenu);

  return (
    <section id="menu" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            The Last Laugh Menu
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Savor the schadenfreude. It's what's for dinner.
          </p>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-12">
            <h3 className="text-3xl font-bold text-gray-800 border-b-4 border-mckimmels-yellow pb-2 mb-8">
              {category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {categorizedMenu[category].map(item => (
                <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;