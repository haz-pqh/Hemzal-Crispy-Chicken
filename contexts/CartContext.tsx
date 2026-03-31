
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Beverage } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (beverage: Beverage, quantity: number) => void;
  removeFromCart: (beverageId: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (beverage: Beverage, quantity: number) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.beverage.id === beverage.id);
      if (existingItemIndex > -1) {
        return prevCart.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { beverage, quantity }];
    });
  };

  const removeFromCart = (beverageId: number) => {
    setCart(prevCart => prevCart.filter(item => item.beverage.id !== beverageId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
