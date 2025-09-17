import React, { createContext, useContext, useState } from 'react';
import { CartItem, Package, TimeSlot } from '../types';

interface CartContextType {
  items: CartItem[];
  deliveryMethod: 'pickup' | 'delivery';
  selectedTimeSlot: TimeSlot | null;
  addItem: (pkg: Package) => void;
  removeItem: (packageId: string) => void;
  updateQuantity: (packageId: string, quantity: number) => void;
  setDeliveryMethod: (method: 'pickup' | 'delivery') => void;
  setSelectedTimeSlot: (slot: TimeSlot | null) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  const addItem = (pkg: Package) => {
    setItems(prev => {
      const existing = prev.find(item => item.packageId === pkg.id);
      if (existing) {
        return prev.map(item =>
          item.packageId === pkg.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { packageId: pkg.id, package: pkg, quantity: 1 }];
    });
  };

  const removeItem = (packageId: string) => {
    setItems(prev => prev.filter(item => item.packageId !== packageId));
  };

  const updateQuantity = (packageId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(packageId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.packageId === packageId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDeliveryMethod('pickup');
    setSelectedTimeSlot(null);
  };

  const total = items.reduce((sum, item) => sum + (item.package.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    items,
    deliveryMethod,
    selectedTimeSlot,
    addItem,
    removeItem,
    updateQuantity,
    setDeliveryMethod,
    setSelectedTimeSlot,
    clearCart,
    total,
    itemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};