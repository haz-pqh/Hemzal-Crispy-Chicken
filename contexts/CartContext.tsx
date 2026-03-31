
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Chicken } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (chicken: Chicken, quantity: number) => void;
  removeFromCart: (chickenId: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (chicken: Chicken, quantity: number) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.chicken.id === chicken.id);
      if (existingItemIndex > -1) {
        return prevCart.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { chicken, quantity }];
    });
  };

  const removeFromCart = (chickenId: number) => {
    setCart(prevCart => prevCart.filter(item => item.chicken.id !== chickenId));
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
